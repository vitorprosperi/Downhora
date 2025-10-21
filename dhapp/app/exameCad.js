import ButtonP from '@/components/ButtonP';
import { useUsuario } from '@/context/context';
import NetInfo from "@react-native-community/netinfo";
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

  const dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  const [data, setData] = useState('');
  const [exame, setExame] = useState('');
  const [medico, setMedico] = useState('');
  const [obs, setObs] = useState('');
  const [outroExame, setOutroExame] = useState('');
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [uploading, setUploading] = useState(false);

  const tiposExames = [
    { label: 'Cariótipo', value: 'Cariótipo' },
    { label: 'Pezinho', value: 'Pezinho' },
    { label: 'Outro', value: 'Outro' },
  ];

  // 📸 Selecionar imagem da galeria
  const escolherImagem = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão necessária", "Conceda acesso à galeria para continuar.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        base64: true,
      });

      if (result.canceled || !result.assets?.length) {
        Alert.alert("Aviso", "Seleção de imagem cancelada.");
        return;
      }

      setImagemSelecionada(result.assets[0]);
      Alert.alert("Imagem selecionada", "A imagem foi selecionada com sucesso!");
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error.message);
      Alert.alert("Erro", "Não foi possível selecionar a imagem.");
    }
  };

  // 💾 Salvar exame (com suporte offline)
  const salvarExame = async () => {
    if (!userId) {
      Alert.alert("Erro", "ID do paciente não encontrado.");
      return;
    }

    const tipoSelecionado = exame === 'Outro' ? outroExame : exame;
    let imagemUrlFinal = null;

    try {
      setUploading(true);

      // 🔗 Verifica conexão
      const netInfo = await NetInfo.fetch();
      const isOnline = netInfo.isConnected;

      // Faz upload se houver imagem
      if (imagemSelecionada && imagemSelecionada.base64 && isOnline) {
        const base64Image = imagemSelecionada.base64;
        const fileExt = imagemSelecionada.uri.split(".").pop() || "jpg";
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `exames/${fileName}`;
        const imageBuffer = Uint8Array.from(atob(base64Image), c => c.charCodeAt(0));

        const { error: uploadError } = await supabase.storage
          .from("imagens")
          .upload(filePath, imageBuffer, { contentType: "image/jpeg" });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("imagens").getPublicUrl(filePath);
        imagemUrlFinal = data.publicUrl;
      }

      const novoExame = {
        usuario_id: userId,
        tipo_exame: tipoSelecionado,
        data_exame: data,
        medico_responsavel: medico,
        obs,
        imagem_url: imagemUrlFinal,
      };

      if (isOnline) {
        // 🔹 ONLINE: salva Supabase + SQLite
        const { data: supaData, error } = await supabase.from('exames').insert([novoExame]);
        if (error) console.error("Erro Supabase:", error);
        else console.log("Exame salvo online:", supaData);

        await db.runAsync(
          `INSERT INTO exames (usuario_id, tipo_exame, data_exame, medico_responsavel, obs)
           VALUES (?, ?, ?, ?, ?)`,
          [userId, tipoSelecionado, data, medico, obs]
        );
        Alert.alert("Sucesso", "Exame salvo com sucesso!");
      } else {
        // 🔸 OFFLINE: salva na fila de sincronização
        await db.runAsync(
          `INSERT INTO fila_sinc (acao, nome_tabela, payload)
           VALUES (?, ?, ?)`,
          ["insert", "exames", JSON.stringify(novoExame)]
        );
        Alert.alert("Offline", "Exame salvo localmente e será sincronizado depois.");
      }

      router.dismiss(1);
      router.replace('/exames');

    } catch (err) {
      console.error("Erro inesperado:", err);
      Alert.alert("Erro", "Não foi possível salvar o exame.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
      <View style={styles.container}>
        <View style={styles.containerForm}>

          <Text style={styles.titulo}>Cadastro de exames</Text>
          <Text style={styles.subTitulo}>Informações do exame</Text>
          <Text style={styles.textoPequeno}>Campos com * são obrigatórios</Text>

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
              onPress={escolherImagem}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
                  {imagemSelecionada ? "Imagem selecionada ✅" : "Selecionar imagem do exame"}
                </Text>
              )}
            </Pressable>
          )}

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

          <Text style={styles.textForm}>Médico Responsável</Text>
          <TextInput
            style={styles.input}
            placeholder='ex: Rene Vitor França de Melo'
            placeholderTextColor={'grey'}
            value={medico}
            onChangeText={setMedico}
          />

          <Text style={styles.textForm}>Observações</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite aqui...'
            placeholderTextColor={'grey'}
            value={obs}
            onChangeText={setObs}
          />
        </View>

        <View style={{ marginBottom: 20, width: 200 }}>
          <ButtonP label="Finalizar" onPress={salvarExame} />
        </View>
      </View>
    </SafeAreaView>
  );
}