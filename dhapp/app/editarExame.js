import { ButtonP } from '@/components/ButtonP';
import { MyDropdown } from '@/components/MyDropdown';
import { MyInput } from '@/components/MyInput';
import { useUsuario } from '@/context/context';
import NetInfo from "@react-native-community/netinfo";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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
    const [imagemAtual, setImagemAtual] = useState(dados.imagem_url || null);
    const [imagemNova, setImagemNova] = useState(null);
    const [uploading, setUploading] = useState(false);

    const tiposExames = [
        { label: 'Cariótipo', value: 'Cariótipo' },
        { label: 'Pezinho', value: 'Pezinho' },
        { label: 'Outro', value: 'Outro' },
    ];

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
                    .upload(filePath, byteArray, {
                        contentType: "image/jpeg",
                    });

                if (error) throw error;

                const { data } = supabase.storage
                    .from("imagens")
                    .getPublicUrl(filePath);

                imagemUrlFinal = data.publicUrl;
            }

            const tipoFinal = exame === 'Outro' ? outroExame : exame;

            const exameAtualizado = {
                tipo_exame: tipoFinal,
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
         SET tipo_exame = ?, medico_responsavel = ?, obs = ?
         WHERE id = ?`,
                [tipoFinal, medico, obs, imagemUrlFinal, dados.id]
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
        <ScrollView contentContainerStyle={estilos.container}>
            <Stack.Screen options={{ title: 'Editar exame' }} />
            <View style={estilos.dadosView}>
                <Text>Tipo de exame</Text>
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

                <Text>Profissional responsável</Text>
                <MyInput value={medico} onChangeText={setMedico} />

                <Text>Observações</Text>
                <MyInput
                    value={obs}
                    onChangeText={setObs}
                    multiline
                    style={{ height: 80 }}
                />
            </View>

            <View style={estilos.imageContainer}>
                <Pressable onPress={escolherImagem}>
                    <Image
                        source={{
                            uri: imagemNova?.uri || imagemAtual || 'https://via.placeholder.com/400'
                        }}
                        style={estilos.imagem}
                        resizeMode="contain"
                    />
                    <Text style={estilos.toqueTexto}>
                        📸 Toque para alterar a imagem
                    </Text>
                </Pressable>
            </View>

            <View style={{ padding: 20 }}>
                <ButtonP
                    label={uploading ? "Salvando..." : "Salvar alterações"}
                    onPress={salvarEdicao}
                    disabled={uploading}
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
    dadosView: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingTop: 10,
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
});