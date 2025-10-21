import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import ImageViewing from "react-native-image-viewing";

export default function DetalheExame() {
  const { exame } = useLocalSearchParams();
  const dados = JSON.parse(exame);
  const imagemUrl = dados.imagem_url;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.titulo}>{dados.tipo_exame}</Text>
      <Text style={estilos.subtitulo}>Dr. {dados.medico_responsavel}</Text>
      <Text style={estilos.data}>Data: {dados.data_exame}</Text>
      <Text style={estilos.obs}>{dados.obs}</Text>

      {imagemUrl ? (
        <>
          <Pressable onPress={() => setIsVisible(true)} style={estilos.imageContainer}>
            <Image
              source={{ uri: imagemUrl }}
              style={estilos.imagem}
              resizeMode="cover"
              onError={(e) =>
                console.log("Erro ao carregar imagem:", e.nativeEvent.error)
              }
            />
            <Text style={estilos.toqueTexto}>🔍 Toque para ampliar o exame</Text>
          </Pressable>

          <ImageViewing
            images={[{ uri: imagemUrl }]}
            imageIndex={0}
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
          />
        </>
      ) : (
        <Text style={estilos.semImagem}>Nenhuma imagem disponível</Text>
      )}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FAFAFA",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 18,
    color: "#555",
    marginBottom: 10,
  },
  data: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  obs: {
    fontSize: 16,
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  imagem: {
    width: 300, 
    height: 300,
    backgroundColor: "#eee",
  },
  toqueTexto: {
    textAlign: "center",
    color: "#3478f6",
    marginTop: 8,
    fontSize: 14,
  },
  semImagem: {
    color: "#999",
    fontStyle: "italic",
  },
});