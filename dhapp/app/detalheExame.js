import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text } from "react-native";

export default function DetalheExame() {
  const { exame } = useLocalSearchParams();
  const dados = JSON.parse(exame);

  const imagemUrl = dados.imagem_url; 

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.titulo}>{dados.tipo_exame}</Text>
      <Text style={estilos.subtitulo}>Dr. {dados.medico_responsavel}</Text>
      <Text style={estilos.data}>Data: {dados.data_exame}</Text>
      <Text style={estilos.obs}>{dados.obs}</Text>

      {imagemUrl ? (
        <Image
          source={{ uri: imagemUrl }}
          style={estilos.imagem}
          resizeMode="contain"
        />
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
  imagem: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  semImagem: {
    color: "#999",
    fontStyle: "italic",
  },
});