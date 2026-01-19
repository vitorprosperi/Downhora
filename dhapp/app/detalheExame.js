import { ButtonP } from '@/components/ButtonP';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ImageViewing from "react-native-image-viewing";


export default function DetalheExame() {
  const { exame } = useLocalSearchParams();
  const dados = JSON.parse(exame);
  const imagemUrl = dados.imagem_url;
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  dayjs.extend(updateLocale)
  dayjs.updateLocale('pt-br', {
    formats: {
      ll: 'DD [de] MMM[.] YYYY'
    }
  })

  dayjs.extend(localizedFormat);
  dayjs.locale('pt-br');

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Stack.Screen
        options={{
          title: 'Tela de exame',
          headerShadowVisible: true,
        }}
      />
      <View style={estilos.dadosView}>
        <View>
          <Text>Exame</Text>
          <Text style={estilos.titulo}>{dados.tipo_exame}</Text>
        </View>
        <View>
          <Text>Profissional responsável</Text>
          <Text style={estilos.titulo}>{dados.medico_responsavel}</Text>
        </View>
        <View>
          <Text>Data do exame</Text>
          <Text style={estilos.titulo}>{dayjs(dados.data_exame).format('ll')}</Text>
        </View>
        <View>
          <Text>Observações</Text>
          <Text style={estilos.titulo}>{dados.obs}</Text>
        </View>
      </View>

      <View style={estilos.imageContainer}>
        {imagemUrl ? (
          <>
            <Pressable onPress={() => setIsVisible(true)}>
              <Image
                source={{ uri: imagemUrl }}
                style={estilos.imagem}
                resizeMode="contain"
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
      </View>
      <View style={{ padding: 20 }}>
        <ButtonP
          label="Editar exame"
          onPress={() =>
            router.push({
              pathname: "/editarExame",
              params: { exame: JSON.stringify(dados) },
            })
          }
        />
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FAFAFF",
  },
  titulo: {
    fontSize: 20,
    fontFamily: 'Roboto',
    marginBottom: 5,
    marginTop: -2,
  },
  subtitulo: {
    fontSize: 18,
    lineHeight: 27,
    color: "#555",
    marginBottom: 10,
  },
  data: {
    fontSize: 16,
    lineHeight: 24,
    color: "#777",
    marginBottom: 20,
  },
  dadosView: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  obs: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },
  imageContainer: {
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: "#FFF",
  },
  imagem: {
    width: '100%',
    height: 450,
    backgroundColor: "#FFF",
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