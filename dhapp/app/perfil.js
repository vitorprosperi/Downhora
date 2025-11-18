import { View, Text, Button } from "react-native";
import { supabase } from "../supabaseserver";
import { useEffect, useState } from "react";
import { useUsuario } from '@/context/context';
import { editarPerfil } from "../routes/rotas";

export default function Perfil() {
    const { userId } = useUsuario();
    const [usuario, setUsuario] = useState(null);

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
            console.log("Usuários:", data);
        } catch (err) {
            console.error("Erro ao carregar dados do usuário:", err);
        }
    };

    useEffect(() => {
    CarregarDados();
    }, []);

    return(
        <View>
           <View style={{alignItems: 'center', marginBottom: 20, marginTop: 20}}>
            <Text style>Perfil</Text>
           </View>

            <Text>Nome: {usuario?.nome}</Text>
            <Text>Email: {usuario?.email_responsavel}</Text>
            <Text>Data de Nascimento: {usuario?.data_nascimento}</Text>
            <Text>Telefone: {usuario?.telefone_responsavel}</Text>
            <Text>Gênero: {usuario?.genero}</Text>
            <Text>CPF: {usuario?.cpf}</Text>
            <Text>Nome da mãe: {usuario?.nome_mae}</Text>
            <Text>Nome da responsável: {usuario?.nome_responsavel}</Text>

            <Button title="Editar informações" onPress={editarPerfil} />
        </View>
    );
}