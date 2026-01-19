import { ButtonP } from '@/components/ButtonP';
import { MyDropdown } from '@/components/MyDropdown';
import { MyInput } from '@/components/MyInput';
import { useUsuario } from '@/context/context';
import DateTimePicker from '@react-native-community/datetimepicker';
import NetInfo from "@react-native-community/netinfo";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Modal, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDB } from "../database";
import { supabase } from '../supabaseserver';
import styles from "./styleForms";

export default function EditarExame() {
    const { exame: exameParam } = useLocalSearchParams();
    const dados = JSON.parse(exameParam);

    const router = useRouter();
    const { userId } = useUsuario();

    const [exame, setExame] = useState(
        dados.tipo_exame === 'Cariótipo' || dados.tipo_exame === 'Pezinho'
            ? dados.tipo_exame
            : 'Outro'
    );

    const [outroExame, setOutroExame] = useState(
        dados.tipo_exame !== 'Cariótipo' && dados.tipo_exame !== 'Pezinho'
            ? dados.tipo_exame
            : ''
    );

    const [dataDisplay, setDataDisplay] = useState(
        dayjs(dados.data_exame).format("DD/MM/YYYY")
    );
    const [dataISO, setDataISO] = useState(dados.data_exame);
    const [medico, setMedico] = useState(dados.medico_responsavel || "");
    const [obs, setObs] = useState(dados.obs || "");

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [tempDate, setTempDate] = useState(new Date(dados.data_exame));

    const tiposExames = [
        { label: 'Cariótipo', value: 'Cariótipo' },
        { label: 'Pezinho', value: 'Pezinho' },
        { label: 'Outro', value: 'Outro' },
    ];

    const formatarParaBR = (date) => {
        const d = new Date(date);
        const dia = d.getDate().toString().padStart(2, '0');
        const mes = (d.getMonth() + 1).toString().padStart(2, '0');
        const ano = d.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const formatarParaISO = (date) => {
        const d = new Date(date);
        const dia = d.getDate().toString().padStart(2, '0');
        const mes = (d.getMonth() + 1).toString().padStart(2, '0');
        const ano = d.getFullYear();
        return `${ano}-${mes}-${dia}`;
    };

    const abrirCalendario = () => {
        setTempDate(dataISO ? new Date(dataISO) : new Date());
        setShowDatePicker(true);
    };

    const confirmarDataIOS = () => {
        setDataDisplay(formatarParaBR(tempDate));
        setDataISO(formatarParaISO(tempDate));
        setShowDatePicker(false);
    };

    const onChangeDate = (_, selectedDate) => {
        if (Platform.OS !== 'ios') setShowDatePicker(false);
        if (selectedDate) {
            setDataDisplay(formatarParaBR(selectedDate));
            setDataISO(formatarParaISO(selectedDate));
        }
    };

    const salvarEdicao = async () => {
        try {
            const db = await getDB();
            const { isConnected } = await NetInfo.fetch();

            const tipoFinal = exame === 'Outro' ? outroExame : exame;

            const exameAtualizado = {
                tipo_exame: tipoFinal,
                data_exame: dataISO,
                medico_responsavel: medico,
                obs,
            };

            if (isConnected) {
                const { error } = await supabase
                    .from("exames")
                    .update(exameAtualizado)
                    .eq("id", dados.id);

                if (error) throw error;
            } else {
                await db.runAsync(
                    `INSERT INTO fila_sinc (acao, nome_tabela, payload)
           VALUES (?, ?, ?)`,
                    ["update", "exames", JSON.stringify({ id: dados.id, ...exameAtualizado })]
                );
            }

            await db.runAsync(
                `UPDATE exames
         SET tipo_exame = ?, data_exame = ?, medico_responsavel = ?, obs = ?
         WHERE id = ?`,
                [tipoFinal, dataISO, medico, obs, dados.id]
            );

            Alert.alert("Sucesso", "Exame atualizado com sucesso!");

            router.replace({
                pathname: "/detalheExame",
                params: {
                    exame: JSON.stringify({
                        ...dados,
                        ...exameAtualizado,
                    }),
                },
            });

        } catch (error) {
            console.error("Erro ao editar exame:", error);
            Alert.alert("Erro", "Não foi possível salvar as alterações.");
        }
    };

    dayjs.extend(updateLocale);
    dayjs.extend(localizedFormat);
    dayjs.locale('pt-br');

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
            <Stack.Screen options={{ title: 'Editar exame' }} />

            <View style={styles.container}>
                <View style={styles.containerForm}>
                    <Text style={styles.subTitulo}>Editar informações do exame</Text>

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

                    {exame === 'Outro' && (
                        <>
                            <Text style={styles.textForm}>Informe o exame</Text>
                            <MyInput
                                placeholder="Digite o nome do exame"
                                placeholderTextColor="grey"
                                value={outroExame}
                                onChangeText={setOutroExame}
                            />
                        </>
                    )}

                    <Text style={styles.textForm}>Data do exame*</Text>
                    <Pressable onPress={abrirCalendario}>
                        <View pointerEvents="none">
                            <MyInput
                                editable={false}
                                value={dataDisplay || 'Selecione a data'}
                            />
                        </View>
                    </Pressable>

                    {showDatePicker && Platform.OS === 'android' && (
                        <DateTimePicker
                            value={new Date(dataISO)}
                            mode="date"
                            display="calendar"
                            onChange={onChangeDate}
                        />
                    )}

                    {Platform.OS === 'ios' && showDatePicker && (
                        <Modal transparent animationType="slide">
                            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                                <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                                    <ScrollView style={{ padding: 20 }}>
                                        <DateTimePicker
                                            value={tempDate}
                                            mode="date"
                                            display="spinner"
                                            onChange={(_, d) => d && setTempDate(d)}
                                        />
                                        <ButtonP label="Confirmar" onPress={confirmarDataIOS} />
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    )}

                    <Text style={styles.textForm}>Profissional responsável</Text>
                    <MyInput value={medico} onChangeText={setMedico} />

                    <Text style={styles.textForm}>Observações</Text>
                    <MyInput value={obs} onChangeText={setObs} />
                </View>

                <View style={{ marginBottom: 20, width: 200 }}>
                    <ButtonP label="Salvar alterações" onPress={salvarEdicao} />
                </View>
            </View>
        </SafeAreaView>
    );
}