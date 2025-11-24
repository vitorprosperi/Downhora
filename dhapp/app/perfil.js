import { View, Text, Button, Alert } from "react-native";
import { supabase } from "../supabaseserver";
import { useEffect, useState } from "react";
import { useUsuario } from '@/context/context';
import NetInfo from "@react-native-community/netinfo";
import { getDB } from "../database";
import { editarPerfil } from "../routes/rotas";

export default function Perfil() {
  const { userId } = useUsuario();
  const [usuario, setUsuario] = useState(null);

  const CarregarDados = async () => {
    try {
      const netInfo = await NetInfo.fetch();
      const isOnline = netInfo.isConnected;

      const db = await getDB().catch(err => {
        console.error("Erro ao abrir SQLite:", err);
        return null;
      });

      if (!db) {
        Alert.alert("Erro", "Banco de dados local indisponível.");
        return;
      }

      //Busca online no Supabase
      if (isOnline) {
        const { data, error } = await supabase
          .from('usuarios')
          .select("*")
          .eq("id", userId)
          .single();

        if (!error && data) {
          setUsuario(data);

          // Atualiza o SQLite também
          await db.withTransactionAsync(async () => {
            await db.runAsync(
              `INSERT OR REPLACE INTO usuarios 
                (id, nome, data_nascimento, genero, cpf, nome_mae, nome_responsavel, telefone_responsavel, email_responsavel)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                data.id,
                data.nome,
                data.data_nascimento,
                data.genero,
                data.cpf,
                data.nome_mae,
                data.nome_responsavel,
                data.telefone_responsavel,
                data.email_responsavel
              ]
            );
          });

          console.log("Perfil carregado do Supabase");
          return;
        }

        console.warn("Falha no Supabase, tentando SQLite...");
      }

      //Busca offline no SQLite

      const usuarioLocal = await db.getFirstAsync(
        "SELECT * FROM usuarios WHERE id = ?",
        [userId]
      );

      if (usuarioLocal) {
        setUsuario(usuarioLocal);
        console.log("Perfil carregado do SQLite (offline)");
      } else {
        Alert.alert(
          "Sem dados offline",
          "Não encontramos informações salvas. Conecte-se à internet pelo menos uma vez."
        );
      }

    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
    }
  };

  useEffect(() => {
    CarregarDados();
  }, []);

  return (
    <View>
      <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 20 }}>
        <Text>Perfil</Text>
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
