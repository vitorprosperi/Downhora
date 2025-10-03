import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../supabaseserver";
import styles from "./styleForms";

export default function Vacina() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [msg, setMsg] = useState("");
  const [imagemUri, setImagemUri] = useState(null);

  // Função para escolher imagem
  async function escolherImagem() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Permita o acesso à galeria para enviar a imagem.");
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }

    return null;
  }

  // Função para converter imagem em base64 e enviar ao Supabase Storage
  async function uploadImagem(uri) {
    try {
      const nomeArquivo = `usuario_${Date.now()}.jpg`;
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      const buffer = Buffer.from(base64, "base64");

      const { data, error } = await supabase.storage
        .from("imagens")
        .upload(nomeArquivo, buffer, {
          contentType: "image/jpeg",
          upsert: false,
        });

      if (error) throw error;

      // Obter URL pública
      const { data: publicUrl } = supabase.storage.from("imagens").getPublicUrl(nomeArquivo);

      return publicUrl.publicUrl;
    } catch (err) {
      console.error("Erro no upload:", err.message);
      Alert.alert("Erro", "Não foi possível enviar a imagem.");
      return null;
    }
  }

  // Função principal: envia nome, cpf e imagem
  async function enviarDados() {
    // Escolher imagem antes do envio
    const uri = await escolherImagem();
    if (!uri) return;

    setImagemUri(uri);

    const imageUrl = await uploadImagem(uri);
    if (!imageUrl) return;

    // Inserir no Supabase
    const { data, error } = await supabase
      .from("usuarios")
      .insert([{ nome, cpf, imagem_url: imageUrl }]); // adiciona a coluna imagem_url

    if (error) {
      console.error("Erro ao enviar:", error.message);
      setMsg("Erro ao enviar dados");
    } else {
      console.log("Dados enviados:", data);
      setMsg("Dados enviados com sucesso!");
      setNome("");
      setCpf("");
      setImagemUri(null);
    }
  }

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.corEscura}>
      <View style={styles.telaInicio}>
        <TextInput
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          style={{ backgroundColor: "#fff", marginBottom: 10, padding: 8 }}
        />
        <TextInput
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          style={{ backgroundColor: "#fff", marginBottom: 10, padding: 8 }}
          keyboardType="numeric"
        />

        <Text style={{ color: "white", marginBottom: 20 }}>{msg}</Text>

        <FAB
          icon="upload"
          color="#FAFAFF"
          style={styles.fab}
          customSize={76}
          onPress={enviarDados}
          mode="flat"
        />
      </View>
    </SafeAreaView>
  );
}