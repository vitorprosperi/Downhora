import { ButtonP } from '@/components/ButtonP';
import { MyDropdown } from '@/components/MyDropdown';
import { MyInput } from '@/components/MyInput';
import { useUsuario } from '@/context/context';
import DateTimePicker from '@react-native-community/datetimepicker';
import NetInfo from "@react-native-community/netinfo";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Platform, Pressable, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDB } from "../database";
import { supabase } from '../supabaseserver';
import styles from "./styleForms";

export default function ExameCad() {
  const router = useRouter();
  const { userId } = useUsuario();

  const [dataDisplay, setDataDisplay] = useState('');
  const [dataISO, setDataISO] = useState('');
  const [exame, setExame] = useState('');
  const [medico, setMedico] = useState('');
  const [obs, setObs] = useState('');
  const [outroExame, setOutroExame] = useState('');
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const tiposExames = [
    { label: 'Cariótipo', value: 'Cariótipo' },
    { label: 'Pezinho', value: 'Pezinho' },
    { label: 'Outro', value: 'Outro' },
  ];

  // Função para formatar para exibição BR
  const formatarParaBR = (date) => {
    const d = new Date(date);
    const dia = d.getDate().toString().padStart(2, '0');
    const mes = (d.getMonth() + 1).toString().padStart(2, '0');
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  // Função para formatar para ISO 
  const formatarParaISO = (date) => {
    const d = new Date(date);
    const dia = d.getDate().toString().padStart(2, '0');
    const mes = (d.getMonth() + 1).toString().padStart(2, '0');
    const ano = d.getFullYear();
    return `${ano}-${mes}-${dia}`;
  };

  // Abrir calendário
  const abrirCalendario = () => setShowDatePicker(true);

  // Quando o usuário escolhe uma data
  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS !== 'ios') setShowDatePicker(false);
    if (selectedDate) {
      const display = formatarParaBR(selectedDate);
      const iso = formatarParaISO(selectedDate);
      setDataDisplay(display);
      setDataISO(iso);
    }
  };

  // Selecionar imagem
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

      if (result.canceled || !result.assets?.length) return;

      setImagemSelecionada(result.assets[0]);
      Alert.alert("Imagem selecionada", "A imagem foi selecionada com sucesso!");
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error.message);
      Alert.alert("Erro", "Não foi possível selecionar a imagem.");
    }
  };

  // Salvar exame
  const salvarExame = async () => {
    if (!userId) {
      Alert.alert("Erro", "ID do paciente não encontrado.");
      return;
    }

    if (!dataISO) {
      Alert.alert("Atenção", "Selecione a data do exame.");
      return;
    }

    const tipoSelecionado = exame === 'Outro' ? outroExame : exame;
    let imagemUrlFinal = null;

    try {
      setUploading(true);
      const db = await getDB();
      const { isConnected } = await NetInfo.fetch();

      // Upload da imagem apenas se online
      if (imagemSelecionada && imagemSelecionada.base64 && isConnected) {
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
        data_exame: dataISO,
        medico_responsavel: medico,
        obs,
        imagem_url: imagemUrlFinal,
      };

      if (isConnected) {
        // ONLINE
        const { error } = await supabase.from('exames').insert([novoExame]);
        if (error) console.error("Erro Supabase:", error);

        await db.withTransactionAsync(async () => {
          await db.runAsync(
            `INSERT INTO exames (usuario_id, tipo_exame, data_exame, medico_responsavel, obs)
             VALUES (?, ?, ?, ?, ?)`,
            [userId, tipoSelecionado, dataISO, medico, obs]
          );
        });

        Alert.alert("Sucesso", "Exame salvo com sucesso!");
      } else {
        // OFFLINE
        await db.withTransactionAsync(async () => {
          await db.runAsync(
            `INSERT INTO exames (usuario_id, tipo_exame, data_exame, medico_responsavel, obs)
             VALUES (?, ?, ?, ?, ?)`,
            [userId, tipoSelecionado, dataISO, medico, obs]
          );

          await db.runAsync(
            `INSERT INTO fila_sinc (acao, nome_tabela, payload)
             VALUES (?, ?, ?)`,
            ["insert", "exames", JSON.stringify(novoExame)]
          );
        });

        Alert.alert("Offline", "Exame salvo localmente e será sincronizado depois.");
      }

      router.dismiss(1);
      router.replace('/exames');

    } catch (err) {
      console.error("Erro inesperado ao salvar exame:", err);
      Alert.alert("Erro", "Não foi possível salvar o exame.");
    } finally {
      setUploading(false);
    }
  };

    dayjs.extend(updateLocale)
    dayjs.updateLocale('pt-br', {
      formats: {
        ll: 'DD [de] MMM[.] YYYY'
      }
    })
  
    dayjs.extend(localizedFormat);
    dayjs.locale('pt-br');

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
      <Stack.Screen
        options={{
          title: 'Cadastro de exames',
          headerShadowVisible: true,
        }}
      />
      <View style={styles.container}>
        <View style={styles.containerForm}>
          <Text style={styles.subTitulo}>Informações do exame</Text>
          <Text style={styles.textoPequeno}>Campos com * são obrigatórios</Text>

<View>
          <Text style={styles.textForm}>Tipo de exame*</Text>
          <MyDropdown
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
              <MyInput
                style={styles.input}
                placeholder='Digite o nome do exame'
                placeholderTextColor='grey'
                value={outroExame}
                onChangeText={setOutroExame}
              />
            </View>
          )}

          {(exame === 'Cariótipo' || exame === 'Pezinho') && (
            <Pressable
              style={[styles.botaoUpload, { backgroundColor: '#3478f6', borderRadius: 10, padding: 10 }]}
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

          <View>
            <Text style={styles.textForm}>Data do exame*</Text>
            <Pressable onPress={abrirCalendario}>
              <View>
                <MyInput editable={false} style={[styles.input, { color: dataDisplay ? '#231F20' : 'grey' }]}>
                  {dataDisplay || 'Selecione a data'}
                </MyInput>
              </View>
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={dataISO ? new Date(dataISO) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'default' : 'calendar'}
                onChange={onChangeDate}
              />
            )}
          </View>

          <View>
            <Text style={styles.textForm}>Profissional responsável</Text>
            <MyInput
              style={styles.input}
              placeholder='Ex: Dra. Cátia.'
              placeholderTextColor='grey'
              value={medico}
              onChangeText={setMedico}
            />
          </View>

          <View>
            <Text style={styles.textForm}>Observações</Text>
            <MyInput
              style={styles.input}
              placeholder='Ex: Informações adicionais, resultados.'
              placeholderTextColor='grey'
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