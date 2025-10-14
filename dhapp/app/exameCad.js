import ButtonP from '@/components/ButtonP';
import { useUsuario } from '@/context/context';
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import MaskInput from 'react-native-mask-input';
import { TextInput } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from "../supabaseserver";
import styles from "./styleForms";

export default function ExameCad() {

  const router = useRouter();
  const { userId } = useUsuario();
  const db = useSQLiteContext();
  const [imagemUrl, setImagemUrl] = useState('');

  const dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  const [data, setData] = useState('');
  const [exame, setExame] = useState('');
  const [medico, setMedico] = useState('');
  const [obs, setObs] = useState('');
  const [outroExame, setOutroExame] = useState('');
  const [uploading, setUploading] = useState(false);

  const tiposExames = [
    { label: 'Cariótipo', value: 'Cariótipo' },
    { label: 'Pezinho', value: 'Pezinho' },
    { label: 'Outro', value: 'Outro' },
  ];

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

      const fileExt = file.uri.split(".").pop() || "jpg";
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `exames/${fileName}`;

      const imageBuffer = Uint8Array.from(atob(base64Image), c => c.charCodeAt(0));

      const { error: uploadError } = await supabase.storage
        .from("imagens")
        .upload(filePath, imageBuffer, {
          contentType: "image/jpeg",
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("imagens").getPublicUrl(filePath);
      const imageUrl = data.publicUrl;

      setImagemUrl(imageUrl);
      Alert.alert("Sucesso", "Imagem adicionada ao exame!");

    } catch (error) {
      console.error("Erro ao enviar imagem:", error.message);
      Alert.alert("Erro", "Não foi possível enviar a imagem.");
    } finally {
      setUploading(false);
    }
  };

  const salvarExame = async () => {
    try {
      const tipoSelecionado = exame === 'Outro' ? outroExame : exame;

      const { data: supaData, error } = await supabase
        .from('exames')
        .insert([
          { 
            usuario_id: userId,
            tipo_exame: tipoSelecionado,
            data_exame: data,
            medico_responsavel: medico,
            obs: obs,
            imagem_url: imagemUrl
          }
        ]);

      if (error) {
        console.error("Erro ao salvar exame no Supabase:", error);
      } else {
        console.log("Exame salvo no Supabase:", supaData);
      }

      await db.runAsync(
        `INSERT INTO exames (usuario_id, tipo_exame, data_exame, medico_responsavel, obs)
         VALUES (?, ?, ?, ?, ?)`,
        [userId, tipoSelecionado, data, medico, obs]
      );

      console.log("Exame salvo no SQLite local");
      router.replace({ pathname: "/exames" });

    } catch (err) {
      console.error("Erro inesperado:", err);
    }
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
      <View style={styles.container}>
        <View style={styles.containerForm}>

          <View>
            <Text style={styles.titulo}>Cadastro de exames</Text>
            <Text style={styles.subTitulo}>Informações do exame</Text>
          </View>

          <Text style={styles.textoPequeno}>Campos com * são obrigatórios</Text>

          <View>
            <Text style={styles.textForm}>Tipo de exame*</Text>
            <Dropdown
              style={[styles.input, { paddingHorizontal: 10 }]}
              data={tiposExames}
              labelField="label"
              valueField="value"
              placeholder="Selecione o tipo de exame"
              placeholderStyle={{ color: 'grey' }}
              value={exame}
              onChange={item => setExame(item.value)}
            />
          </View>

          {exame === 'Outro' && (
            <View>
              <Text style={styles.textForm}>Informe o exame</Text>
              <TextInput
                style={styles.input}
                placeholder='Digite o nome do exame'
                placeholderTextColor={'grey'}
                value={outroExame}
                onChangeText={setOutroExame}
              />
            </View>
          )}

          {(exame === 'Cariótipo' || exame === 'Pezinho') && (
            <Pressable
              style={[styles.botaoUpload, { backgroundColor: '#3478f6', marginTop: 10, borderRadius: 10, padding: 10 }]}
              onPress={escolherEEnviarImagem}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
                  {imagemUrl ? "Imagem adicionada ✅" : "Adicionar imagem do exame"}
                </Text>
              )}
            </Pressable>
          )}

          <View>
            <Text style={styles.textForm}>Data do exame*</Text>
            <MaskInput
              style={styles.input}
              keyboardType="numeric"
              mask={dateMask}
              value={data}
              onChangeText={(masked) => setData(masked)}
              maxLength={10}
              placeholder='ex: 14/10/2001'
              placeholderTextColor={'grey'}
            />
          </View>

          <View>
            <Text style={styles.textForm}>Médico Responsável</Text>
            <TextInput
              style={styles.input}
              placeholder='ex: Rene Vitor França de Melo'
              placeholderTextColor={'grey'}
              value={medico}
              onChangeText={setMedico}
            />
          </View>

          <View>
            <Text style={styles.textForm}>Observações</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite aqui...'
              placeholderTextColor={'grey'}
              value={obs}
              onChangeText={setObs}
            />
          </View>

        </View>

        <View style={{ marginBottom: 20, width: 200 }}>
          <ButtonP label="Finalizar" onPress={salvarExame} />
        </View>
      </View>
    </SafeAreaView>
  );
}