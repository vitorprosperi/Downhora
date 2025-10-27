import { useUsuario } from "@/context/context";
import NetInfo from "@react-native-community/netinfo";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { FAB, Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDB } from "../database"; // usa o helper seguro
import { exameCad } from "../routes/rotas";
import { supabase } from "../supabaseserver";
import styles from "./styleForms";

export default function Exames() {
  const [exames, setExames] = useState([]);
  const { userId } = useUsuario();
  const router = useRouter();

  // flag para evitar concorrência de sincronização
  let sincronizacaoEmAndamento = false;

  // 🔹 Carrega exames do Supabase e sincroniza com SQLite
  const carregarSupabase = async (db) => {
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

      // Usa transação para garantir consistência
      await db.withTransactionAsync(async () => {
        await db.runAsync("DELETE FROM exames WHERE usuario_id = ?", [userId]);

        for (const ex of examesData) {
          await db.runAsync(
            `INSERT OR REPLACE INTO exames 
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

  //  Carrega exames do SQLite (modo offline)
  const carregarSQLite = async (db) => {
    try {
      const result = await db.getAllAsync("SELECT * FROM exames WHERE usuario_id = ?", [userId]);
      setExames(result || []);
      console.log("Exames carregados do SQLite:", result);
    } catch (error) {
      console.error("Erro ao carregar exames do SQLite:", error);
    }
  };

  //  Decide entre Supabase e SQLite dependendo da conexão
  const carregarExames = async () => {
    try {
      const db = await getDB(); // ✅ banco único e estável
      const state = await NetInfo.fetch();
      const isOnline = state.isConnected;

      if (isOnline) {
        console.log("Modo online detectado. Carregando do Supabase...");
        await carregarSupabase(db);
      } else {
        console.log("Modo offline detectado. Carregando do SQLite...");
        await carregarSQLite(db);
      }
    } catch (err) {
      console.error("Erro ao inicializar banco ou carregar exames:", err);
    }
  };

  useEffect(() => {
    carregarExames();
  }, [userId]);

  const abrirDetalhes = (exame) => {
    router.push({
      pathname: "/detalheExame",
      params: { exame: JSON.stringify(exame) },
    });
  };

  //  Excluir exame (online + offline)
  const deletarExame = async (id) => {
    try {
      Alert.alert("Excluir exame", "Tem certeza que deseja excluir este exame?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const db = await getDB();
            const state = await NetInfo.fetch();

            if (state.isConnected) {
              // tenta remover imagem no Supabase Storage
              const { data: exameData, error: fetchError } = await supabase
                .from("exames")
                .select("imagem_url")
                .eq("id", id)
                .single();

              if (!fetchError && exameData?.imagem_url) {
                try {
                  const url = exameData.imagem_url;
                  const path = url.split("/imagens/")[1]; // ex: "exames/123.jpg"

                  if (path) {
                    const { error: deleteImgError } = await supabase.storage
                      .from("imagens")
                      .remove([path]);

                    if (deleteImgError)
                      console.error("Erro ao excluir imagem no Storage:", deleteImgError);
                    else console.log("Imagem excluída do Storage:", path);
                  }
                } catch (err) {
                  console.error("Erro ao processar URL da imagem:", err);
                }
              }

              // exclui o exame no Supabase
              const { error: deleteError } = await supabase
                .from("exames")
                .delete()
                .eq("id", id);

              if (deleteError) throw deleteError;
              console.log("Exame deletado no Supabase:", id);
            } else {
              console.log("Sem conexão — exclusão apenas local:", id);
            }

            // Exclui localmente no SQLite
            await db.withTransactionAsync(async () => {
              await db.runAsync("DELETE FROM exames WHERE id = ?", [id]);
            });

            setExames((prev) => prev.filter((ex) => ex.id !== id));

            Alert.alert("Sucesso", "Exame excluído com sucesso!");
          },
        },
      ]);
    } catch (error) {
      console.error("Erro ao excluir exame:", error);
      Alert.alert("Erro", "Não foi possível excluir o exame.");
    }
  };


  dayjs.extend(updateLocale)
  dayjs.updateLocale('pt-br', {
  formats: {
    ll: 'DD [de] MMM[.] YYYY'
  }
})

  dayjs.extend(localizedFormat);
  dayjs.locale('pt-br');
  // Formatador de data
  var customParseFormat = require("dayjs/plugin/customParseFormat");
  dayjs.extend(customParseFormat)


  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={[styles.corEscura]}
    >
      <Stack.Screen
        options={{
          title: 'Exames',
          headerShadowVisible: true,
        }}
      />
      <View style={cstyle.tela}>
        <View style={cstyle.container}>
          <FlatList
            data={exames}
            contentContainerStyle={cstyle.lista}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            renderItem={({ item }) => {

              const data = `${item.data_exame}`
              const dataFormatada = dayjs(data, 'DDMMYYYY').format('YYYY-MM-DD');
              
              return (

              <Pressable 
              style={({ pressed }) => (pressed ? cstyle.cardHighlight : cstyle.card)}
              onPress={() => abrirDetalhes(item)}
              >
                <View>
                  <View style={cstyle.rowTop}>
                    <Text style={cstyle.textoSecundario}>
                      Dr. {item.medico_responsavel}
                    </Text>
                    <Pressable onPress={() => deletarExame(item.id)}>
                    <Icon source={"close-circle-outline"} ></Icon>
                    </Pressable>
                  </View>
                  <View style={cstyle.midBar}>
                    <Text style={cstyle.textoPrincipal}>{item.tipo_exame}</Text>
                    <Text style={[cstyle.textoSecundario, { fontSize: 20 }]}>
                      {dayjs(dataFormatada).format("ll")}
                    </Text>
                  </View>
                  <View style={cstyle.rowBottom}>
                    {item.obs ? (
                      <Icon source="text-box-outline" size={20}/>
                    ) : (
                      null
                    )
                    }
                    {item.imagem_url ? (
                      <Icon source="image-outline" size={20}/>
                    ) : (
                      null
                    )}
                  </View>
                </View>
              </Pressable> );
            }}
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
    marginBottom: 10,
    width: 350,
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 2px 2.1px -1.9px hsla(240, 25%, 60% / 0.38)',
    // 0px 0.8px 0.9px -0.9px hsl(var(--shadow-color) / 0.36),
    //0px 2px 2.1px -1.9px hsl(var(--shadow-color) / 0.33),
    //0px 4.9px 5.3px -2.8px hsl(var(--shadow-color) / 0.31)',
  },
  cardHighlight: {
    marginBottom: 10,
    width: 350,
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#FBFBFC',
    boxShadow: '0px 2px 2.1px -1.9px hsla(240, 25%, 60% / 0.38)',
  },
  container: {
    width: "100%",
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
  tela: {
    flex: 1,
  },
  lista: {
    alignItems: 'center',
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowBottom: {
    flexDirection: 'row',
    paddingTop: 5,
  }
});
