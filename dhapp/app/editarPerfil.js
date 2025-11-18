import { View, Text, Button, TextInput, Alert } from "react-native";
import { supabase } from "../supabaseserver";
import { useEffect, useState } from "react";
import { useUsuario } from '@/context/context';

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
            setUsuario(data);
            setNome(data.nome);
            setEmail(data.email_responsavel);
            setDataNascimento(data.data_nascimento);
            setTelefone(data.telefone_responsavel);
            setGenero(data.genero);
            setNomeMae(data.nome_mae);
            setNomeResponsavel(data.nome_responsavel);
            console.log("Usuários:", data);
        } catch (err) {
            console.error("Erro ao carregar dados do usuário:", err);
        }
    };

    const EditarDados = async () => {
        try {
            const { error } = await supabase
            .from('usuarios')
            .update({
                nome: nome,
                email_responsavel: email,
                data_nascimento: dataNascimento,
                telefone_responsavel: telefone,
                genero: genero,
                nome_mae: nomeMae,
                nome_responsavel: nomeResponsavel
            })
            .eq("id", userId);
            if (error) {
                console.error("Erro ao atualizar dados do usuário:", error);
                return;
            } else{
                Alert.alert("Sucesso", "Dados atualizados com sucesso!");
                console.log("Dados atualizados com sucesso!");
            }
        } catch (err) {
            console.error("Erro ao atualizar dados do usuário:", err);
        }
    };



    useEffect(() => {
    CarregarDados();
    }, []);

    return(
        <View>
           <View style={{alignItems: 'center', marginBottom: 20, marginTop: 20}}>
            <Text>Edição de perfil</Text>
           </View>

           <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text>Nome: </Text>
            <TextInput
            style={{ padding: 5, borderColor: 'gray', borderWidth: 1, flex: 1 }}
            value={nome}
            onChangeText={setNome}
             />
             </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text>Email: </Text>
            <TextInput
            style={{ padding: 5, borderColor: 'gray', borderWidth: 1, flex: 1 }}
            value={email}
            onChangeText={setEmail}
             />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text>Data de Nascimento: </Text>
            <TextInput
            style={{ padding: 5, borderColor: 'gray', borderWidth: 1, flex: 1 }}
            value={dataNascimento}
            onChangeText={setDataNascimento}
             />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text>Telefone: </Text>
            <TextInput
            style={{ padding: 5, borderColor: 'gray', borderWidth: 1, flex: 1 }}
            value={telefone}
            onChangeText={setTelefone}
             />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text>Gênero: </Text>
            <TextInput
            style={{ padding: 5, borderColor: 'gray', borderWidth: 1, flex: 1 }}
            value={genero}
            onChangeText={setGenero}
             />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text>Nome da mãe: </Text>
            <TextInput
            style={{ padding: 5, borderColor: 'gray', borderWidth: 1, flex: 1 }}
            value={nomeMae}
            onChangeText={setNomeMae}
             />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text>Nome da responsável: </Text>
            <TextInput
            style={{ padding: 5, borderColor: 'gray', borderWidth: 1, flex: 1 }}
            value={nomeResponsavel}
            onChangeText={setNomeResponsavel}
             />
            </View>

            <Button title="Salvar" onPress={EditarDados} />
        </View>
    );
}