import { ButtonP } from '@/components/ButtonP';
import { MyDropdownUnstyled } from '@/components/MyDropdownUnstyled';
import { MyInput } from '@/components/MyInput';
import { MyMaskInput } from '@/components/MyMaskInput';
import { useUsuario } from '@/context/context';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from "react";
import { Alert, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Masks } from 'react-native-mask-input';
import { getDB } from "../database";
import { supabase } from "../supabaseserver";

export default function EditarPerfil() {
    const { userId } = useUsuario();
    const [usuario, setUsuario] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [genero, setGenero] = useState('');
    const [nomeMae, setNomeMae] = useState('');
    const [nomeResponsavel, setNomeResponsavel] = useState('');

    const [showNascimentoPicker, setShowNascimentoPicker] = useState(false);

      const itensGenero = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Outro', value: 'Outro' },
  ];

    dayjs.extend(utc)

    const formatarParaISO = (date) => {
        console.log(date)
        return dayjs(date).utc().format('YYYY-MM-DD');
      };
    
      // Ao selecionar a data
      const handleDataNascimentoChange = (event, selectedDate) => {
        if (Platform.OS !== 'ios') setShowNascimentoPicker(false);
        if (selectedDate) {
            selectedDate = dayjs(selectedDate)
            console.log(selectedDate)
          const formattedISO = formatarParaISO(selectedDate);
          console.log(formattedISO)
    
          setDataNascimento(formattedISO);
        }
      };

    const CarregarDados = async () => {
        try {
            const { data, error } = await supabase
                .from('usuarios')
                .select("*")
                .eq("id", userId)
                .single();

            if (error) {
                console.error("Erro ao buscar dados do usuário:", error);
                return;
            }

            setUsuario(data || null);
            setNome(data?.nome || '');
            setEmail(data?.email_responsavel || '');
            setDataNascimento(data?.data_nascimento || '');
            setTelefone(data?.telefone_responsavel || '');
            setGenero(data?.genero || '');
            setNomeMae(data?.nome_mae || '');
            setNomeResponsavel(data?.nome_responsavel || '');
            console.log("Usuário carregado:", data);
        } catch (err) {
            console.error("Erro ao carregar dados do usuário:", err);
        }
    };

    const EditarDados = async () => {
        try {
            // Atualiza no Supabase
            const { data, error } = await supabase
                .from('usuarios')
                .update({
                    nome,
                    email_responsavel: email,
                    data_nascimento: dataNascimento,
                    telefone_responsavel: telefone,
                    genero,
                    nome_mae: nomeMae,
                    nome_responsavel: nomeResponsavel
                })
                .eq("id", userId)
                .select()
                .single();

            if (error) {
                console.error("Erro ao atualizar dados do usuário (Supabase):", error);
                Alert.alert("Erro", "Não foi possível atualizar os dados no servidor.");
                return;
            }

            // Atualiza no SQLite
            try {
                const db = await getDB();
                await db.withTransactionAsync(async () => {
                    await db.runAsync(
                        `UPDATE usuarios 
                         SET nome = ?, 
                             email_responsavel = ?, 
                             data_nascimento = ?, 
                             telefone_responsavel = ?,
                             genero = ?, 
                             nome_mae = ?, 
                             nome_responsavel = ?
                         WHERE id = ?`,
                        [
                            nome,
                            email,
                            dataNascimento,
                            telefone,
                            genero,
                            nomeMae,
                            nomeResponsavel,
                            userId
                        ]
                    );
                });
            } catch (localErr) {
                console.error("Erro ao atualizar dados no SQLite:", localErr);
            }

            setUsuario(data);
            Alert.alert("Sucesso", "Perfil atualizado.");
            console.log("Usuário atualizado:", data);
            router.dismiss(1);
            router.replace('/perfil');
        } catch (err) {
            console.error("Erro inesperado ao salvar perfil:", err);
        }
    };

    useEffect(() => {
        if (userId) CarregarDados();
    }, [userId]);

    return (
        <View style={styles.viewParent}>
            <Stack.Screen
                options={{
                    title: 'Edição de perfil',
                    headerShadowVisible: true,
                }}
            />
            <View style={styles.viewInfo}>
                <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
                    <Text style={styles.title}>Editar informações</Text>
                </View>

                <View style={styles.infoDiv}>
                    <Text style={styles.label}>Nome: </Text>
                    <MyInput
                        style={styles.informacao}
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>

                <View style={styles.infoDiv}>
                    <Text style={styles.label}>Email: </Text>
                    <MyInput
                    keyboardType='email-address'
                        style={styles.informacao}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.infoDiv}>
                    <Text style={styles.label}>Data de Nasc.: </Text>
                    <Pressable onPress={() => setShowNascimentoPicker(true)}>
                    <MyInput
                    editable={false}
                        style={styles.informacao}
                        value={new Date(dataNascimento).toLocaleDateString('pt-br', {timeZone: 'UTC'})}
                    />
                    </Pressable>

                    {showNascimentoPicker && (
                <DateTimePicker
                  value={new Date(dataNascimento)}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'compact' : 'default'}
                  design='material'
                  onChange={handleDataNascimentoChange}
                />
              )}
                </View>

                <View style={styles.infoDiv}>
                    <Text style={styles.label}>Telefone: </Text>
                    <MyMaskInput
                        style={styles.informacao}
                        mask={Masks.BRL_PHONE}
                        keyboardType='phone-pad'
                        value={telefone}
                        onChangeText={(masked, unmasked) => {
                  setTelefone(unmasked);
                        }}
                    />
                </View>

                <View style={styles.infoDiv}>
                    <Text style={styles.label}>Gênero: </Text>
                    <MyDropdownUnstyled
                data={itensGenero}
                labelField="label"
                valueField="value"
                placeholder={genero}
                value={genero}
                style={styles.informacao}
                onChange={item => {
                  setGenero(item.value);
                }}
              />
                </View>

                <View style={styles.infoDiv}>
                    <Text style={styles.label}>Nome da mãe: </Text>
                    <MyInput
                        style={styles.informacao}
                        value={nomeMae}
                        onChangeText={setNomeMae}
                    />
                </View>

                <View style={styles.infoDiv}>
                    <Text style={styles.label}>Nome do responsável: </Text>
                    <MyInput
                        style={styles.informacao}
                        value={nomeResponsavel}
                        onChangeText={setNomeResponsavel}
                    />
                </View>
                <View style={styles.botao}>
                      <ButtonP label="Salvar informações" onPress={EditarDados} />
                      </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    botao: {
        width: 200,
        alignSelf: 'center'
    },
    infoDiv: {
        marginBottom: 10,
    },
    informacao: {
        backgroundColor: 'hsl(60, 10%, 97%)',
        color: '#231F20',
        paddingVertical: 0,
        paddingHorizontal: 3,
        borderWidth: 1,
        borderColor: '#231F20',
        borderRadius: 2,
        width: '100%',
        fontSize: 16,
        height: 32,
        lineHeight: 24,
        fontFamily: 'Roboto',
    },
    label: {
        fontFamily: 'Roboto',
        color: 'hsl(20, 0%, 25%)',
    },
    viewParent: {
        backgroundColor: '#FAFAFF',
        flex: 1,
    },
    viewInfo: {
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    title: {
        fontFamily: 'Roboto-500',
        fontSize: 20,
        color: "#231F20"
    },
});