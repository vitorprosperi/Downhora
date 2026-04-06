import { ButtonP } from "@/components/ButtonP";
import { MyDropdown } from "@/components/MyDropdown";
import { MyInput } from "@/components/MyInput";
import { useUsuario } from "@/context/context";
import DateTimePicker from "@react-native-community/datetimepicker";
import NetInfo from "@react-native-community/netinfo";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import "react-native-get-random-values";
import { SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";
import { getDB } from "../database";
import { supabase } from "../supabaseserver";
import styles from "./styleForms";

export default function ExameCad() {
  const router = useRouter();
  const { userId } = useUsuario();

  const [dataDisplay, setDataDisplay] = useState("");
  const [dataISO, setDataISO] = useState("");
  const [exame, setExame] = useState("");
  const [medico, setMedico] = useState("");
  const [obs, setObs] = useState("");
  const [outroExame, setOutroExame] = useState("");
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const tiposExames = [
    { label: "Cariótipo", value: "Cariótipo" },
    { label: "Pezinho", value: "Pezinho" },
    { label: "Outro", value: "Outro" },
  ];

  const formatarParaBR = (date) => {
    const d = new Date(date);
    const dia = d.getDate().toString().padStart(2, "0");
    const mes = (d.getMonth() + 1).toString().padStart(2, "0");
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const formatarParaISO = (date) => {
    const d = new Date(date);
    const dia = d.getDate().toString().padStart(2, "0");
    const mes = (d.getMonth() + 1).toString().padStart(2, "0");
    const ano = d.getFullYear();
    return `${ano}-${mes}-${dia}`;
  };

  // Abrir calendário
  const abrirCalendario = () => {
    setTempDate(dataISO ? new Date(dataISO) : new Date()); // Definir data inicial
    setShowDatePicker(true);
  };

  const confirmarDataIOS = () => {
    const display = formatarParaBR(tempDate);
    const iso = formatarParaISO(tempDate);

    setDataDisplay(display);
    setDataISO(iso);
    setShowDatePicker(false);
  };

  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS !== "ios") setShowDatePicker(false);
    if (selectedDate) {
      setDataDisplay(formatarParaBR(selectedDate));
      setDataISO(formatarParaISO(selectedDate));
    }
  };

  const escolherImagem = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Conceda acesso à galeria para continuar.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.8,
        base64: true,
      });

      if (result.canceled || !result.assets?.length) return;

      setImagemSelecionada(result.assets[0]);
      Alert.alert(
        "Imagem selecionada",
        "A imagem foi selecionada com sucesso!",
      );
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error?.message ?? error);
      Alert.alert("Erro", "Não foi possível selecionar a imagem.");
    }
  };

  const salvarExame = async () => {
    if (!userId) {
      Alert.alert("Erro", "ID do paciente não encontrado.");
      return;
    }

    if (!dataISO) {
      Alert.alert("Atenção", "Selecione a data do exame.");
      return;
    }

    const tipoSelecionado = exame === "Outro" ? outroExame : exame;
    if (!tipoSelecionado || tipoSelecionado.trim().length === 0) {
      Alert.alert("Atenção", "Selecione o tipo de exame.");
      return;
    }

    // ID gerado no clique (um por exame)
    const id = uuidv4();

    let imagemUrlFinal = null;

    try {
      setUploading(true);

      const db = await getDB();
      const { isConnected } = await NetInfo.fetch();

      // Upload de imagem só online (como você já fazia)
      if (imagemSelecionada?.base64 && isConnected) {
        const base64Image = imagemSelecionada.base64;
        const fileExt = imagemSelecionada.uri?.split(".").pop() || "jpg";
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `exames/${fileName}`;

        // OBS: se atob der erro no seu RN/Expo, me avisa que te passo um helper
        const imageBuffer = Uint8Array.from(atob(base64Image), (c) =>
          c.charCodeAt(0),
        );

        const { error: uploadError } = await supabase.storage
          .from("imagens")
          .upload(filePath, imageBuffer, { contentType: "image/jpeg" });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("imagens")
          .getPublicUrl(filePath);
        imagemUrlFinal = data.publicUrl;
      }

      const novoExame = {
        id,
        usuario_id: userId,
        tipo_exame: tipoSelecionado,
        data_exame: dataISO,
        medico_responsavel: medico || null,
        obs: obs || null,
        imagem_url: imagemUrlFinal,
      };

      // 1) Sempre salva no SQLite (offline-first)
      await db.withTransactionAsync(async () => {
        await db.runAsync(
          `INSERT OR REPLACE INTO exames
           (id, usuario_id, tipo_exame, data_exame, medico_responsavel, obs, imagem_url)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            novoExame.id,
            novoExame.usuario_id,
            novoExame.tipo_exame,
            novoExame.data_exame,
            novoExame.medico_responsavel,
            novoExame.obs,
            novoExame.imagem_url,
          ],
        );

        // 2) Se offline, coloca na fila
        if (!isConnected) {
          await db.runAsync(
            `INSERT INTO fila_sinc (acao, nome_tabela, payload)
             VALUES (?, ?, ?)`,
            ["upsert", "exames", JSON.stringify(novoExame)],
          );
        }
      });

      // 3) Se online, salva no Supabase (mesmo id)
      if (isConnected) {
        const { error } = await supabase
          .from("exames")
          .upsert(novoExame, { onConflict: "id" });

        if (error) {
          console.error("Erro Supabase:", error.message);
          Alert.alert(
            "Atenção",
            "Salvou no celular, mas falhou ao salvar online. Vamos sincronizar depois.",
          );

          // Opcional: se falhou online, coloca na fila também
          const db2 = await getDB();
          await db2.runAsync(
            `INSERT INTO fila_sinc (acao, nome_tabela, payload)
             VALUES (?, ?, ?)`,
            ["upsert", "exames", JSON.stringify(novoExame)],
          );
        } else {
          Alert.alert("Sucesso", "Exame salvo com sucesso!");
        }
      }

      router.dismiss(1);
      router.replace("/exames");
    } catch (err) {
      console.error("Erro inesperado ao salvar exame:", err?.message ?? err);
      Alert.alert("Erro", "Não foi possível salvar o exame.");
    } finally {
      onCreateTriggerNotification();
      setUploading(false);
    }
  };

  function onCreateTriggerNotification() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    const date = new Date(dataISO);

    Notifications.scheduleNotificationAsync({
      content: {
        title: exame,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date,
      },
    });
  }

  dayjs.extend(updateLocale);
  dayjs.updateLocale("pt-br", {
    formats: {
      ll: "DD [de] MMM[.] YYYY",
    },
  });
  dayjs.extend(localizedFormat);
  dayjs.locale("pt-br");

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.corEscura}>
      <Stack.Screen
        options={{
          title: "Cadastro de exames",
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
              placeholderStyle={{ color: "grey" }}
              value={exame}
              onChange={(item) => setExame(item.value)}
            />
          </View>

          {exame === "Outro" && (
            <View>
              <Text style={styles.textForm}>Informe o exame</Text>
              <MyInput
                style={styles.input}
                placeholder="Digite o nome do exame"
                placeholderTextColor="grey"
                value={outroExame}
                onChangeText={setOutroExame}
              />
            </View>
          )}

          {(exame === "Cariótipo" || exame === "Pezinho") && (
            <Pressable
              style={[
                styles.botaoUpload,
                { backgroundColor: "#3478f6", borderRadius: 10, padding: 10 },
              ]}
              onPress={escolherImagem}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text
                  style={{ color: "#fff", textAlign: "center", fontSize: 16 }}
                >
                  {imagemSelecionada
                    ? "Imagem selecionada ✅"
                    : "Selecionar imagem do exame"}
                </Text>
              )}
            </Pressable>
          )}

          <View>
            <Text style={styles.textForm}>Data do exame*</Text>
            <Pressable onPress={abrirCalendario}>
              <View pointerEvents="none">
                <MyInput
                  editable={false}
                  style={[
                    styles.input,
                    { color: dataDisplay ? "#231F20" : "grey" },
                  ]}
                  value={dataDisplay || "Selecione a data"}
                />
              </View>
            </Pressable>

            {/* ANDROID */}
            {showDatePicker && Platform.OS === "android" && (
              <DateTimePicker
                value={dataISO ? new Date(dataISO) : new Date()}
                mode="date"
                display="calendar"
                onChange={onChangeDate}
              />
            )}

            {/* iOS */}
            {Platform.OS === "ios" && showDatePicker && (
              <Modal transparent animationType="slide" visible={showDatePicker}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    backgroundColor: "rgba(0,0,0,0.4)",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                      height: 350,
                    }}
                  >
                    <ScrollView
                      contentContainerStyle={{
                        padding: 20,
                      }}
                    >
                      <DateTimePicker
                        value={tempDate}
                        mode="date"
                        display="spinner"
                        locale="pt-BR"
                        themeVariant="light"
                        style={{ backgroundColor: "#fff" }}
                        onChange={(event, date) => {
                          if (date) setTempDate(date);
                        }}
                      />

                      <View style={{ marginTop: 20 }}>
                        <ButtonP label="Confirmar" onPress={confirmarDataIOS} />
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            )}
          </View>

          <View>
            <Text style={styles.textForm}>Profissional responsável</Text>
            <MyInput
              style={styles.input}
              placeholder="Ex: Dra. Cátia."
              placeholderTextColor="grey"
              value={medico}
              onChangeText={setMedico}
            />
          </View>

          <View>
            <Text style={styles.textForm}>Observações</Text>
            <MyInput
              style={styles.input}
              placeholder="Ex: Informações adicionais, resultados."
              placeholderTextColor="grey"
              value={obs}
              onChangeText={setObs}
            />
          </View>
        </View>

        <View style={{ marginBottom: 20, width: 200 }}>
          <ButtonP
            label={uploading ? "Salvando..." : "Finalizar"}
            onPress={salvarExame}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
