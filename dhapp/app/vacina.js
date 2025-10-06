import { decode } from "base64-arraybuffer";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Text } from "react-native";
import { FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../supabaseserver";
import styles from "./styleForms";

export default function Vacina() {
  const [msg, setMsg] = useState("");

  async function enviarDados() {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permissão negada", "Precisamos de acesso à galeria para enviar a imagem.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        base64: true,
      });

      if (result.canceled) {
        Alert.alert("Envio cancelado", "Nenhuma imagem foi selecionada.");
        return;
      }

      const image = result.assets[0];

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("imagens") 
        .upload(image, decode(image.base64), {
          contentType: "image/jpeg",
        });

      if (uploadError) {
        console.error("Erro upload:", uploadError.message);
        Alert.alert("Erro", "Erro ao fazer upload da imagem.");
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("imagens")
        .getPublicUrl(imageName);

      const imageUrl = publicUrlData.publicUrl;

    } catch (e) {
      console.error("Erro geral:", e);
      Alert.alert("Erro inesperado", e.message);
    }
  }

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.corEscura}>
      

        <Text style={{ color: "white", marginBottom: 20 }}>{msg}</Text>

        <FAB
          icon="upload"
          color="#FAFAFF"
          style={styles.fab}
          customSize={76}
          onPress={enviarDados}
          mode="flat"
        />
    </SafeAreaView>
  );
}