import { ListItemUsuario } from "@/components/ListItemUsuario";
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { Alert, FlatList, View } from "react-native";
import { Searchbar } from 'react-native-paper';
import { supabase } from "../supabaseserver";

export default function Administrador() {
    const [usuarios, setUsuarios] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [resultados, setResultados] = useState(usuarios)

    useEffect(() => {
        if (searchQuery === '') {
            setResultados(usuarios);
        } else {
            setResultados(usuarios.filter(
                (usuario) => 
                    usuario.nome.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
                )
            )
        }
    }, [searchQuery]);

    const carregarSupabase = async () => {
        try {
            const [
                { data: usuariosData, error: usuariosError }
            ] = await Promise.all([
                supabase.from("usuarios").select("*")
            ]);

            if (usuariosError) throw usuariosError;

            setUsuarios(usuariosData || [])
            //trans etc
        } catch (error) {
            console.error("Erro ao buscar dados no supa:", error.message);
        } 
    };

    const carregarExames = async () => {
        try {
            const state = await NetInfo.fetch();
            const isOnline = state.isConnected;

            if (isOnline) {
               // console.log("Modo online. Carregando do Supabase");
                await carregarSupabase()
            } else {
                console.log("Modo offline.")
                Alert.alert("Por favor se conecte à internet para poder utilizar a busca de usuário.")
            }
        } catch (err) {
            console.error("Erro no banco: ", err)
        }
    }

    carregarExames();

    return (
        <View style={{backgroundColor: '#FAFAFF', flex: 1}}>
            <Searchbar
            placeholder="Pesquisar usuário"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{marginVertical: 10}}
            />

            <FlatList
            data={resultados}
            renderItem={({item}) => 
            <ListItemUsuario data={item}/>}
            />

        </View>
    )
}
