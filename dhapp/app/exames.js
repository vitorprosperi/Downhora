import { useUsuario } from "@/context/context";
import NetInfo from "@react-native-community/netinfo";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { exameCad } from "../routes/rotas";
import { supabase } from "../supabaseserver";
import styles from "./styleForms";

export default function Exames() {
  const [exames, setExames] = useState([]);
  const { userId } = useUsuario();
  const router = useRouter();
  const db = useSQLiteContext();

  // Flag para evitar concorrência de sincronização
  let sincronizacaoEmAndamento = false;

  // Carrega exames do Supabase (modo online)
  const carregarSupabase = async () => {
    if (sincronizacaoEmAndamento) {
      console.log("Sincronização já em andamento, ignorando chamada duplicada.");
      return;
    }

    sincronizacaoEmAndamento = true;

    try {
      const { data: examesData, error } = await supabase
        .from("exames")
        .select("*")
        .eq("usuario_id", userId);

      if (error) throw error;

      setExames(examesData || []);
      console.log("Exames carregados do Supabase:", examesData);

      // Usa transação única para evitar erro prepareAsync
      await db.withTransactionAsync(async () => {
        await db.runAsync("DELETE FROM exames WHERE usuario_id = ?", [userId]);

        for (const ex of examesData) {
          await db.runAsync(
            `INSERT INTO exames 
              (id, usuario_id, tipo_exame, data_exame, medico_responsavel, obs)
              VALUES (?, ?, ?, ?, ?, ?)`,
            [
              ex.id,
              ex.usuario_id,
              ex.tipo_exame,
              ex.data_exame,
              ex.medico_responsavel,
              ex.obs,
            ]
          );
        }
      });

      console.log("Exames sincronizados com SQLite.");
    } catch (error) {
      console.error("Erro ao buscar dados no Supabase:", error.message);
    } finally {
      sincronizacaoEmAndamento = false;
    }
  };

  // Carrega exames do SQLite (modo offline)
  const carregarSQLite = async () => {
    try {
      const result = await db.getAllAsync("SELECT * FROM exames WHERE usuario_id = ?", [userId]);
      setExames(result || []);
      console.log("Exames carregados do SQLite:", result);
    } catch (error) {
      console.error("Erro ao carregar exames do SQLite:", error);
    }
  };

  // Detecta se há conexão com a internet e decide de onde carregar
  const carregarExames = async () => {
    const state = await NetInfo.fetch();
    const isOnline = state.isConnected;
    if (isOnline) {
      console.log("Modo online detectado. Carregando do Supabase...");
      await carregarSupabase();
    } else {
      console.log("Modo offline detectado. Carregando do SQLite...");
      await carregarSQLite();
    }
  };

  useEffect(() => {
    carregarExames();
  }, []);

  const abrirDetalhes = (exame) => {
    router.push({
      pathname: "/detalheExame",
      params: { exame: JSON.stringify(exame) },
    });
  };

  // Função para excluir exame e também imagem do Storage
  const deletarExame = async (id) => {
    try {
      Alert.alert(
        "Excluir exame",
        "Tem certeza que deseja excluir este exame?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Excluir",
            style: "destructive",
            onPress: async () => {
              const state = await NetInfo.fetch();

              if (state.isConnected) {
                // Busca o exame no Supabase para obter a URL da imagem
                const { data: exameData, error: fetchError } = await supabase
                  .from("exames")
                  .select("imagem_url")
                  .eq("id", id)
                  .single();

                if (fetchError) {
                  console.error("Erro ao buscar exame:", fetchError);
                } else if (exameData?.imagem_url) {
                  try {
                    // Extrai o caminho do arquivo do Supabase Storage
                    const url = exameData.imagem_url;
                    const path = url.split("/imagens/")[1]; // pega "exames/123.jpg"

                    if (path) {
                      const { error: deleteImgError } = await supabase.storage
                        .from("imagens")
                        .remove([path]);

                      if (deleteImgError) {
                        console.error("Erro ao excluir imagem no Storage:", deleteImgError);
                      } else {
                        console.log("Imagem excluída do Storage:", path);
                      }
                    }
                  } catch (err) {
                    console.error("Erro ao processar URL da imagem:", err);
                  }
                }

                // Depois exclui o registro no banco Supabase
                const { error: deleteError } = await supabase
                  .from("exames")
                  .delete()
                  .eq("id", id);

                if (deleteError) throw deleteError;
                console.log("Exame deletado no Supabase:", id);
              } else {
                console.log("Sem conexão, exclusão apenas local:", id);
              }

              // Exclui localmente no SQLite
              await db.withTransactionAsync(async () => {
                await db.runAsync("DELETE FROM exames WHERE id = ?", [id]);
              });

              setExames((prev) => prev.filter((ex) => ex.id !== id));

              Alert.alert("Sucesso", "Exame excluído com sucesso!");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Erro ao excluir exame:", error);
      Alert.alert("Erro", "Não foi possível excluir o exame.");
    }
  };

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={[styles.corEscura, { alignItems: "center" }]}
    >
      <View style={styles.telaExames}>
        <Text style={styles.titulo}>Exames Cadastrados</Text>

        <View style={cstyle.container}>
          <FlatList
            data={exames}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable onPress={() => abrirDetalhes(item)}>
                <View style={cstyle.card}>
                  <Text style={cstyle.textoSecundario}>
                    Dr. {item.medico_responsavel}
                  </Text>
                  <View style={cstyle.midBar}>
                    <Text style={cstyle.textoPrincipal}>{item.tipo_exame}</Text>
                    <Text style={[cstyle.textoSecundario, { fontSize: 20 }]}>
                      {item.data_exame}
                    </Text>
                  </View>
                  <Text>{item.obs}</Text>

                  <Pressable
                    onPress={() => deletarExame(item.id)}
                    style={cstyle.botaoExcluir}
                  >
                    <Text style={cstyle.textoExcluir}>Excluir</Text>
                  </Pressable>
                </View>
              </Pressable>
            )}
          />
        </View>

        <FAB
          icon="plus"
          color="#FAFAFF"
          style={styles.fab}
          customSize={76}
          onPress={exameCad}
          mode="flat"
        />
      </View>
    </SafeAreaView>
  );
}

const cstyle = StyleSheet.create({
  card: {
    backgroundColor: "hsla(216, 70%, 45%, 0.2)",
    borderRadius: 1,
    minWidth: "99%",
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 5,
  },
  container: {
    width: "100%",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  midBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textoPrincipal: {
    fontSize: 21,
    fontWeight: "500",
    color: "#231F20",
  },
  textoSecundario: {
    color: "hsla(345, 6%, 33%, 1)",
    fontSize: 17,
  },
  botaoExcluir: {
    backgroundColor: "#d9534f",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  textoExcluir: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
