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
  const router = useRouter();
  const db = useSQLiteContext();

  const carregarSupabase = async () => {
    try {
      const { data: examesData, error } = await supabase
        .from("exames")
        .select("*");

      if (error) throw error;
      setExames(examesData || []);
    } catch (error) {
      console.error("Erro ao buscar dados no Supabase:", error.message);
    }
  };

  useEffect(() => {
    carregarSupabase();
  }, []);

  const abrirDetalhes = (exame) => {
    router.push({
      pathname: "/detalheExame",
      params: { exame: JSON.stringify(exame) },
    });
  };

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
              const { error: deleteError } = await supabase
                .from("exames")
                .delete()
                .eq("id", id);

              if (deleteError) throw deleteError;

              await db.runAsync("DELETE FROM exames WHERE id = ?", [id]);

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

