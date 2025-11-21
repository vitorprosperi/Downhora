import { View, Text, Button, TextInput, Alert } from "react-native";
import { supabase } from "../supabaseserver";
import { useEffect, useState } from "react";
import { useUsuario } from '@/context/context';
import { getDB } from "../database";

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
        } catch (err) {
            console.error("Erro inesperado ao salvar perfil:", err);
        }
    };

    useEffect(() => {
        if (userId) CarregarDados();
    }, [userId]);

    return (
        <View style={{ padding: 16 }}>
            <View style={{alignItems: 'center', marginBottom: 20, marginTop: 20}}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>Edição de perfil</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ width: 120 }}>Nome: </Text>
                <TextInput
                    style={{ padding: 5, borderColor: 'gray', borderWidth: 1, flex: 1 }}
                    value={nome}
                    onChangeText={setNome}
                />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ width: 120 }}>Email: </Text>
                <TextInput
                    style={{ padding: 5, borderColor: 'gray', borderWidth: 1, flex: 1 }}
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ width: 120 }}>Data de Nasc.: </Text>
                <TextInput
                    style={{ padding: 5, borderColor: 'gray', borderWidth: 1, flex: 1 }}
                    value={dataNascimento}
                    onChangeText={setDataNascimento}
                />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ width: 120 }}>Telefone: </Text>
                <TextInput
                    style={{ padding: 5, borderColor: 'gray', borderWidth: 1, flex: 1 }}
                    value={telefone}
                    onChangeText={setTelefone}
                />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ width: 120 }}>Gênero: </Text>
                <TextInput
                    style={{ padding: 5, borderColor: 'gray', borderWidth: 1, flex: 1 }}
                    value={genero}
                    onChangeText={setGenero}
                />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ width: 120 }}>Nome da mãe: </Text>
                <TextInput
                    style={{ padding: 5, borderColor: 'gray', borderWidth: 1, flex: 1 }}
                    value={nomeMae}
                    onChangeText={setNomeMae}
                />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ width: 120 }}>Nome do responsável: </Text>
                <TextInput
                    style={{ padding: 5, borderColor: 'gray', borderWidth: 1, flex: 1 }}
                    value={nomeResponsavel}
                    onChangeText={setNomeResponsavel}
                />
            </View>

            <View style={{ marginTop: 20 }}>
                <Button title="Salvar" onPress={EditarDados} />
            </View>
        </View>
    );
}