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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getDB } from "../database"; // usa o helper seguro
import { exameCad } from "../routes/rotas";
import { supabase } from "../supabaseserver";
import styles from "./styleForms";

export default function Exames() {
  const [exames, setExames] = useState([]);
  const { userId } = useUsuario();
  const router = useRouter();

  const insets = useSafeAreaInsets();

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
      <View style={cstyle.tela}>
        <Stack.Screen
        options={{
          title: 'Exames',
          headerShadowVisible: true,
        }}
      />
        <View style={[cstyle.container, {paddingBottom: insets.bottom}]}>
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
                <View style={cstyle.rowGroup}>
                  <View style={cstyle.rowTop}>
                    {item.medico_responsavel ? (
                      <Text style={cstyle.textoSecundario}>
                        Dr. {item.medico_responsavel}
                      </Text>
                    ) : (
                      <Text style={cstyle.textoSecundario}>
                        Médico não informado
                      </Text>
                    )}
                    <Pressable style={{marginRight: "-14"}} onPress={() => deletarExame(item.id)}>
                      <Icon source={"close-circle-outline"} size={19}></Icon>
                    </Pressable>
                  </View>
                  <View style={cstyle.midBar}>
                    <Text style={[cstyle.textoPrincipal]}>{item.tipo_exame}</Text>
                  </View>
                </View>
                <View style={[cstyle.rowBottom]}>
                  <View style={cstyle.iconsView}>
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
                  <View style={cstyle.iconsView}>
                    <Icon source={"calendar-range"} size={20}/>
                      <Text style={cstyle.textoSecundario}>
                        {dayjs(dataFormatada).format("ll")}
                      </Text>
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
  );
}

const cstyle = StyleSheet.create({
  card: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 2,
    marginBottom: 10,
    width: 350,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 1px 1px 1px hsla(240, 25%, 60% / 0.38)',
  },
  cardHighlight: {
    marginBottom: 10,
    width: 350,
    padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 2,
    borderRadius: 5,
    backgroundColor: '#FBFBFC',
    boxShadow: '0px 1px 1px 1.5px hsla(240, 25%, 60% / 0.38)',
  },
  container: {
    width: "100%",
    gap: 10,
    flex: 1,
  },
  midBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  textoPrincipal: {
    fontSize: 20,
    fontWeight: "500",
    color: "#231F20",
    fontFamily: 'Roboto-600'
  },
  textoSecundario: {
    color: "hsla(345, 6%, 33%, 1)",
    fontSize: 18,
    fontFamily: 'Roboto-500',
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
    backgroundColor: '#FAFAFF'
  },
  lista: {
    paddingTop: 10,
    alignItems: 'center',
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconsView: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
