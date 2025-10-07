import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
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

const escolherEEnviarImagem = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Conceda acesso à galeria para continuar.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (result.canceled || !result.assets?.length) {
      Alert.alert("Aviso", "Seleção de imagem cancelada.");
      return;
    }

    const file = result.assets[0];
    const base64Image = file.base64;

    if (!base64Image) {
      Alert.alert("Erro", "Não foi possível ler o conteúdo da imagem.");
      return;
    }

    setUploading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    const userId = user.id; // ✅ UUID válido

    const fileExt = file.uri.split(".").pop() || "jpg";
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `imagens/${fileName}`;

    const imageBuffer = Uint8Array.from(atob(base64Image), c => c.charCodeAt(0));

    const { error: uploadError } = await supabase.storage
      .from("imagens")
      .upload(filePath, imageBuffer, {
        contentType: "image/jpeg",
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("imagens").getPublicUrl(filePath);
    const imageUrl = data.publicUrl;

    const { error: updateError } = await supabase
      .from("usuarios")
      .update({ imagem_url: imageUrl })
      .eq("id", userId);

    if (updateError) throw updateError;

    Alert.alert("Sucesso", "Imagem enviada e salva com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar imagem:", error.message);
    Alert.alert("Erro", "Não foi possível enviar a imagem.");
  } finally {
    setUploading(false);
  }
};

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
          icon="upload"
          color="#FAFAFF"
          style={[styles.fab, { bottom: 120 }]} 
          customSize={76}
          onPress={escolherEEnviarImagem}
          loading={uploading}
          mode="flat"
        />

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

