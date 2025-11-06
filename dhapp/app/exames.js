import { useUsuario } from "@/context/context";
import NetInfo from "@react-native-community/netinfo";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon, IconButton } from "react-native-paper";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FilterDropdown } from "../components/FilterDropdown";
import { getDB } from "../database"; // usa o helper seguro
import { exameCad } from "../routes/rotas";
import { supabase } from "../supabaseserver";

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
      //console.log("Exames carregados do Supabase:", examesData);

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
      // console.log("Exames carregados do SQLite:", result);
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

  const [filter, setFilter] = useState("padrao")
  const [sortOrder, setSortOrder] = useState("asc")

  const dataFiltered = (dados) => {
    dados.sort((a, b) => (
      new Date(dayjs(b.data_exame, 'DDMMYYYY').format('YYYY-MM-DD')) - new Date(dayjs(a.data_exame, 'DDMMYYYY').format('YYYY-MM-DD'))
    ))

    if (filter == 'padrao') {
      return dados
    } else if (filter == 'datasPassadas') {
      return dados.filter((d) => (
        new Date(dayjs(d.data_exame, 'DDMMYYYY').format('YYYY-MM-DD')) < dayjs()
      ))
    } else if (filter == 'datasFuturas') {
      return dados.filter((d) => (
        new Date(dayjs(d.data_exame, 'DDMMYYYY').format('YYYY-MM-DD')) > dayjs()
      ))
    }
  }

  const toggleOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder)
  }

  const sortIcon = sortOrder === 'asc' ? 'arrow-up' : 'arrow-down';

  const dataSorted = (dados) => {
    const dadosFiltrados = dataFiltered(dados)

    if (sortOrder === 'asc') {
      return dadosFiltrados.sort((a, b) => (
      new Date(dayjs(b.data_exame, 'DDMMYYYY').format('YYYY-MM-DD')) - new Date(dayjs(a.data_exame, 'DDMMYYYY').format('YYYY-MM-DD'))
    ));
    } else if (sortOrder === 'desc'){
      return dadosFiltrados.sort((a, b) => (
      new Date(dayjs(a.data_exame, 'DDMMYYYY').format('YYYY-MM-DD')) - new Date(dayjs(b.data_exame, 'DDMMYYYY').format('YYYY-MM-DD'))
    ));
  }}

  return (
    <View style={cstyle.tela}>
      <Stack.Screen
        options={{
          title: 'Exames',
          headerShadowVisible: true,
        }}
      />
      <View style={[cstyle.container, { paddingBottom: insets.bottom }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 5, paddingBottom: 5 }}>
              <View style={{flexDirection: "row", alignItems:'center'}}>
              <IconButton
                icon={sortIcon}
                iconColor="#2261C1"
                size={30}
                onPress={() => toggleOrder()}
              />
              <FilterDropdown
                onChange={item => {
                  setFilter(item.value);
                }}
              />
              </View>
              <IconButton 
              icon={"plus"} 
              mode="flat" 
              iconColor="#2261C1"
              size={30} 
              onPress={exameCad} 
              />
            </View>
          
        <FlatList
          data={dataSorted(exames)}
          contentContainerStyle={cstyle.lista}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => {

            return (
              <Pressable
                style={({ pressed }) => (pressed ? cstyle.cardHighlight : cstyle.card)}
                onPress={() => abrirDetalhes(item)}
              >
                <View style={cstyle.rowGroup}>
                  <View style={cstyle.rowTop}>
                    {item.medico_responsavel ? (
                      <Text style={cstyle.textoSecundario}>
                        {item.medico_responsavel}
                      </Text>
                    ) : (
                      <Text style={cstyle.textoSecundario}>
                        Profissional não informado
                      </Text>
                    )}
                    <Pressable style={{ marginRight: "-10" }} onPress={() => deletarExame(item.id)}>
                      <Icon source={"close-circle-outline"} size={20}></Icon>
                    </Pressable>
                  </View>
                  <View style={cstyle.midBar}>
                    <Text style={[cstyle.textoPrincipal]}>{item.tipo_exame}</Text>
                  </View>
                </View>
                <View style={[cstyle.rowBottom]}>
                  <View style={cstyle.iconsView}>
                    {item.obs ? (
                      <Icon color="#2261C1" source="text-box-outline" size={20} />
                    ) : (
                      null
                    )
                    }
                    {item.imagem_url ? (
                      <Icon color="#2261C1" source="image-outline" size={20} />
                    ) : (
                      null
                    )}
                  </View>
                  <View style={cstyle.iconsView}>
                    <Icon source={"calendar-range"} size={20} />
                    <Text style={cstyle.textoSecundario}>
                      {dayjs(item.data_exame).format("ll")}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
}

const cstyle = StyleSheet.create({
  card: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 4,
    width: '100%',
    borderRadius: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2261c1',
    backgroundColor: '#FFFFFF',
  },
  cardHighlight: {
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 4,
    backgroundColor: '#FBFBFC',
    borderBottomWidth: 0.5,
    borderBottomColor: '#2261c1',
  },
  container: {
    width: "100%",
    flex: 1,
  },
  midBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  textoPrincipal: {
    fontSize: 20,
    color: "#231F20",
    fontFamily: 'Roboto-600'
  },
  textoSecundario: {
    color: "hsla(345, 6%, 33%, 1)",
    fontSize: 18,
    fontFamily: 'Roboto-500',
  },
  textoEscolha: {
    color: "#231F20",
    fontSize: 18,
    fontFamily: 'Roboto'
  },
  textoEscolhaPressed: {
    color: "#231F20",
    fontSize: 18,
    fontFamily: 'Roboto'
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
   borderTopColor: '#2261c1',
   borderTopWidth: 0.5,
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
  },
  modalPress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
