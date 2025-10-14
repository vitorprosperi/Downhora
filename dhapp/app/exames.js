import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { exameCad } from "../routes/rotas";
import { supabase } from "../supabaseserver";
import styles from "./styleForms";

export default function Exames() {
  const [exames, setExames] = useState([]);
  const [uploading, setUploading] = useState(false);

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


  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={[styles.corEscura, { alignItems: "center" }]}
    >
      <View style={styles.telaExames}>
        <View>
          <Text style={styles.titulo}>Exames Cadastrados</Text>
        </View>

        <View style={cstyle.container}>
          <FlatList
            data={exames}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={cstyle.card}>
                <Pressable>
                  <View>
                    <Text style={cstyle.textoSecundario}>
                      Dr. {item.medico_responsavel}
                    </Text>
                  </View>
                  <View style={cstyle.midBar}>
                    <Text style={cstyle.textoPrincipal}>{item.tipo_exame}</Text>
                    <Text style={[cstyle.textoSecundario, { fontSize: 20 }]}>
                      {item.data_exame}
                    </Text>
                  </View>
                  <View>
                    <Text>{item.obs}</Text>
                  </View>
                </Pressable>
              </View>
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
});

