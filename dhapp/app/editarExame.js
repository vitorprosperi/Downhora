import { ButtonP } from '@/components/ButtonP';
import { MyDropdown } from '@/components/MyDropdown';
import { MyInput } from '@/components/MyInput';
import { useUsuario } from '@/context/context';
import DateTimePicker from '@react-native-community/datetimepicker';
import NetInfo from "@react-native-community/netinfo";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDB } from "../database";
import { supabase } from '../supabaseserver';

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

    const [medico, setMedico] = useState(dados.medico_responsavel || "");
    const [obs, setObs] = useState(dados.obs || "");

    const [dataISO, setDataISO] = useState(dados.data_exame || '');
    const [dataDisplay, setDataDisplay] = useState(
        dados.data_exame ? dayjs(dados.data_exame).format('DD/MM/YYYY') : ''
    );
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [tempDate, setTempDate] = useState(
        dados.data_exame ? new Date(dados.data_exame) : new Date()
    );

    const [imagemAtual, setImagemAtual] = useState(dados.imagem_url || null);
    const [imagemNova, setImagemNova] = useState(null);
    const [uploading, setUploading] = useState(false);

    const tiposExames = [
        { label: 'Cariótipo', value: 'Cariótipo' },
        { label: 'Pezinho', value: 'Pezinho' },
        { label: 'Outro', value: 'Outro' },
    ];

    const formatarParaBR = (date) => {
        const d = new Date(date);
        return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    };

    const formatarParaISO = (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
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

    const onChangeDate = (event, selectedDate) => {
        if (Platform.OS !== 'ios') setShowDatePicker(false);
        if (selectedDate) {
            setDataDisplay(formatarParaBR(selectedDate));
            setDataISO(formatarParaISO(selectedDate));
        }
    };

    const escolherImagem = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permissão necessária", "Permita acesso à galeria.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            base64: true,
        });

        if (!result.canceled) {
            setImagemNova(result.assets[0]);
        }
    };

    const salvarEdicao = async () => {
        try {
            const db = await getDB();
            const { isConnected } = await NetInfo.fetch();

            let imagemUrlFinal = imagemAtual;

            if (imagemNova && isConnected) {
                setUploading(true);

                const fileExt = imagemNova.uri.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `exames/${fileName}`;

                const byteArray = Uint8Array.from(
                    atob(imagemNova.base64),
                    c => c.charCodeAt(0)
                );

                const { error } = await supabase.storage
                    .from("imagens")
                    .upload(filePath, byteArray, { contentType: "image/jpeg" });

                if (error) throw error;

                const { data } = supabase.storage
                    .from("imagens")
                    .getPublicUrl(filePath);

                imagemUrlFinal = data.publicUrl;
            }

            const tipoFinal = exame === 'Outro' ? outroExame : exame;

            const exameAtualizado = {
                tipo_exame: tipoFinal,
                data_exame: dataISO,
                medico_responsavel: medico,
                obs,
                imagem_url: imagemUrlFinal,
            };

            if (isConnected) {
                await supabase
                    .from("exames")
                    .update(exameAtualizado)
                    .eq("id", dados.id);
            }

            await db.runAsync(
                `UPDATE exames
         SET tipo_exame = ?, data_exame = ?, medico_responsavel = ?, obs = ?
         WHERE id = ?`,
                [tipoFinal, dataISO, medico, obs, imagemUrlFinal, dados.id]
            );

            Alert.alert("Sucesso", "Exame atualizado com sucesso!");

            router.replace({
                pathname: "/detalheExame",
                params: { exame: JSON.stringify({ ...dados, ...exameAtualizado }) },
            });

        } catch (e) {
            console.error(e);
            Alert.alert("Erro", "Não foi possível salvar.");
        } finally {
            setUploading(false);
        }
    };

    dayjs.extend(updateLocale);
    dayjs.extend(localizedFormat);
    dayjs.locale('pt-br');

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1 }}>
            <Stack.Screen options={{ title: 'Editar exame' }} />

            <ScrollView contentContainerStyle={estilos.container}>
                <View style={estilos.card}>
                    <Text style={estilos.label}>Tipo de exame</Text>
                    <MyDropdown
                        data={tiposExames}
                        labelField="label"
                        valueField="value"
                        value={exame}
                        onChange={item => setExame(item.value)}
                    />

                    {exame === 'Outro' && (
                        <MyInput
                            placeholder="Digite o nome do exame"
                            value={outroExame}
                            onChangeText={setOutroExame}
                        />
                    )}

                    <Text style={estilos.label}>Data do exame</Text>
                    <Pressable onPress={abrirCalendario}>
                        <View pointerEvents="none">
                            <MyInput
                                editable={false}
                                value={dataDisplay || 'Selecione a data'}
                                style={{ color: dataDisplay ? '#231F20' : 'grey' }}
                            />
                        </View>
                    </Pressable>

                    {showDatePicker && Platform.OS === 'android' && (
                        <DateTimePicker
                            value={dataISO ? new Date(dataISO) : new Date()}
                            mode="date"
                            display="calendar"
                            onChange={onChangeDate}
                        />
                    )}

                    {Platform.OS === 'ios' && showDatePicker && (
                        <Modal transparent animationType="slide">
                            <View style={estilos.modalOverlay}>
                                <View style={estilos.modal}>
                                    <DateTimePicker
                                        value={tempDate}
                                        mode="date"
                                        display="spinner"
                                        locale="pt-BR"
                                        onChange={(e, d) => d && setTempDate(d)}
                                    />
                                    <ButtonP label="Confirmar" onPress={confirmarDataIOS} />
                                </View>
                            </View>
                        </Modal>
                    )}

                    <Text style={estilos.label}>Profissional responsável</Text>
                    <MyInput value={medico} onChangeText={setMedico} />

                    <Text style={estilos.label}>Observações</Text>
                    <MyInput value={obs} onChangeText={setObs} multiline />
                </View>

                <Pressable onPress={escolherImagem} style={estilos.imageContainer}>
                    <Image
                        source={{ uri: imagemNova?.uri || imagemAtual || 'https://via.placeholder.com/400' }}
                        style={estilos.imagem}
                    />
                    <Text style={estilos.toqueTexto}>📸 Toque para alterar a imagem</Text>
                </Pressable>

                <ButtonP
                    label={uploading ? "Salvando..." : "Salvar alterações"}
                    onPress={salvarEdicao}
                    disabled={uploading}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        gap: 10,
    },
    label: {
        fontWeight: '600',
        marginTop: 8,
    },
    imageContainer: {
        marginVertical: 20,
        width: '100%',
        alignItems: 'center',
    },
    imagem: {
        width: '100%',
        height: 250,
        borderRadius: 12,
    },
    toqueTexto: {
        marginTop: 8,
        color: '#3478f6',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modal: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
});