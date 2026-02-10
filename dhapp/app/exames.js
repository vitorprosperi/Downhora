import { useUsuario } from "@/context/context";
import NetInfo from "@react-native-community/netinfo";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
import { Stack, useRouter } from "expo-router";
import { useEffect, useState, useRef, useCallback } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon, IconButton } from "react-native-paper";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FilterDropdown } from "../components/FilterDropdown";
import { getDB } from "../database";
import { exameCad } from "../routes/rotas";
import { supabase } from "../supabaseserver";

export default function Exames() {
  const [exames, setExames] = useState([]);
  const { userId } = useUsuario();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // flag para evitar concorrência de sincronização
  const sincronizacaoEmAndamento = useRef(false);

  // Carrega exames do SQLite (modo offline / fonte local)
  const carregarSQLite = async (db) => {
    try {
      const result = await db.getAllAsync(
        "SELECT * FROM exames WHERE usuario_id = ?",
        [userId]
      );
      setExames(result || []);
    } catch (error) {
      console.error("Erro ao carregar exames do SQLite:", error);
    }
  };

  // Carrega exames do Supabase e faz MERGE no SQLite
  const carregarSupabase = async (db) => {
    if (sincronizacaoEmAndamento.current) {
      console.log("Sincronização já em andamento, ignorando chamada duplicada.");
      return;
    }

    sincronizacaoEmAndamento.current = true;

    try {
      const { data: examesData, error: examesError } = await supabase
        .from("exames")
        .select("id,usuario_id,tipo_exame,data_exame,medico_responsavel,obs,imagem_url")
        .eq("usuario_id", userId);

      if (examesError) throw examesError;

      await db.withTransactionAsync(async () => {
        // não apaga mais o SQLite
        for (const ex of (examesData || [])) {
          await db.runAsync(
            `INSERT OR REPLACE INTO exames
             (id, usuario_id, tipo_exame, data_exame, medico_responsavel, obs, imagem_url)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              ex.id,
              ex.usuario_id,
              ex.tipo_exame,
              ex.data_exame,
              ex.medico_responsavel ?? null,
              ex.obs ?? null,
              ex.imagem_url ?? null,
            ]
          );
        }
      });

      await carregarSQLite(db);
      console.log("Exames sincronizados com SQLite");
    } catch (error) {
      console.error("Erro ao buscar dados no Supabase:", error?.message ?? error);
    } finally {
      sincronizacaoEmAndamento.current = false;
    }
  };

  // Decide entre Supabase e SQLite dependendo da conexão
  const carregarExames = async () => {
    try {
      if (!userId) return;

      const db = await getDB();
      await carregarSQLite(db); // Mostra rápido o local primeiro

      const state = await NetInfo.fetch();
      const isOnline = state.isConnected;

      if (isOnline) {
        console.log("Modo online detectado. Atualizando com Supabase");
        await carregarSupabase(db);
      } else {
        console.log("Modo offline detectado. Mostrando exames do SQLite.");
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

  // Excluir exame (online + offline)
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

            // Primeiro, exclui o exame no SQLite
            await db.withTransactionAsync(async () => {
              await db.runAsync("DELETE FROM exames WHERE id = ?", [id]);
            });

            setExames((prev) => prev.filter((ex) => ex.id !== id));

            // Verifica se está online para sincronizar com o Supabase
            if (state.isConnected) {
              try {
                // Tenta remover o exame no Supabase
                const { error: deleteError } = await supabase
                  .from("exames")
                  .delete()
                  .eq("id", id);

                if (deleteError) {
                  console.error("Erro ao deletar no Supabase:", deleteError);
                } else {
                  console.log("Exame deletado no Supabase:", id);
                }
              } catch (err) {
                console.error("Erro ao tentar deletar no Supabase:", err);
              }
            } else {
              // Se offline, adiciona à fila de sincronização a exclusão do exame
              await db.runAsync(
                `INSERT INTO fila_sinc (acao, nome_tabela, payload)
                 VALUES (?, ?, ?)`,
                ["delete", "exames", JSON.stringify({ id })]
              );
              console.log("Exame adicionado à fila para exclusão no próximo sync.");
            }
          },
        },
      ]);
    } catch (error) {
      console.error("Erro ao excluir exame:", error);
      Alert.alert("Erro", "Não foi possível excluir o exame.");
    }
  };

  // Dayjs
  dayjs.extend(updateLocale);
  dayjs.updateLocale('pt-br', {
    formats: { ll: 'DD [de] MMM[.] YYYY' }
  });
  dayjs.extend(localizedFormat);
  dayjs.locale('pt-br');

  const [filter, setFilter] = useState("padrao");
  const [sortOrder, setSortOrder] = useState("asc");

  const dataFiltered = (dados) => {
    const copia = [...(dados || [])];

    // ordena por padrão (data)
    copia.sort((a, b) => new Date(b.data_exame) - new Date(a.data_exame));

    if (filter === 'padrao') return copia;

    if (filter === 'datasPassadas') {
      return copia.filter((d) => new Date(d.data_exame) < dayjs());
    }

    if (filter === 'datasFuturas') {
      return copia.filter((d) => new Date(d.data_exame) > dayjs());
    }

    return copia;
  };

  const toggleOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const sortIcon = sortOrder === 'asc' ? 'arrow-up' : 'arrow-down';

  const dataSorted = (dados) => {
    const dadosFiltrados = dataFiltered(dados);

    if (sortOrder === 'asc') {
      return [...dadosFiltrados].sort((a, b) => new Date(b.data_exame) - new Date(a.data_exame));
    }

    return [...dadosFiltrados].sort((a, b) => new Date(a.data_exame) - new Date(b.data_exame));
  };

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
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <IconButton
              icon={sortIcon}
              iconColor="#2261C1"
              size={30}
              onPress={toggleOrder}
            />
            <FilterDropdown
              onChange={item => setFilter(item.value)}
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
          keyExtractor={(item) => item.id} // id obrigatório
          renderItem={({ item }) => (
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
                  {item.obs ? <Icon color="#2261C1" source="text-box-outline" size={20} /> : null}
                  {item.imagem_url ? <Icon color="#2261C1" source="image-outline" size={20} /> : null}
                </View>

                <View style={cstyle.iconsView}>
                  <Icon source={"calendar-range"} size={20} />
                  <Text style={cstyle.textoSecundario}>
                    {dayjs(item.data_exame).format("ll")}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
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
    lineHeight: 27,
    fontFamily: 'Roboto-500',
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
});
