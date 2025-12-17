import { ButtonP } from '@/components/ButtonP';
import { useUsuario } from '@/context/context';
import NetInfo from "@react-native-community/netinfo";
import { Stack } from 'expo-router';
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { MaskedText } from 'react-native-mask-text';
import { getDB } from "../database";
import { editarPerfil } from "../routes/rotas";
import { supabase } from "../supabaseserver";

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

  const dataFormatada = new Date(usuario?.data_nascimento).toLocaleDateString('pt-BR', {timeZone: 'UTC'});



  return (
    <View style={styles.viewParent}>
      <Stack.Screen
        options={{
          title: 'Perfil',
          headerShadowVisible: true,
        }}
      />
      <View style={styles.viewInfo}>
      <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
        <Text style={styles.title}>Informações do perfil</Text>
      </View>
      
        <View style={styles.infoDiv}>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.informacao}>{usuario?.nome}</Text>
        </View>
        <View style={styles.infoDiv}>
          <Text style={styles.label}>CPF</Text>
          <MaskedText mask="999.999.999-99" style={styles.informacao}>{usuario?.cpf}</MaskedText>
        </View>
        <View style={styles.infoDiv}>
          <Text style={styles.label}>Data de nascimento</Text>
          <Text style={styles.informacao}>{dataFormatada}</Text>
        </View>
        <View style={styles.infoDiv}>
          <Text style={styles.label}>Gênero</Text>
          <Text style={styles.informacao}>{usuario?.genero}</Text>
        </View>
        <View style={styles.infoDiv}>
          <Text style={styles.label}>Nome da mãe</Text>
          <Text style={styles.informacao}>{usuario?.nome_mae}</Text>
        </View>
        <View style={styles.infoDiv}>
          <Text style={styles.label}>Nome do responsável</Text>
          <Text style={styles.informacao}>{usuario?.nome_responsavel}</Text>
        </View>
        <View style={styles.infoDiv}>
          <Text style={styles.label}>Email do responsável</Text>
          <Text style={styles.informacao}>{usuario?.email_responsavel}</Text>
        </View>
        <View style={styles.infoDiv}>
          <Text style={styles.label}>Telefone do responsável</Text>
          <MaskedText mask='(99) 99999-9999' style={styles.informacao}>{usuario?.telefone_responsavel}</MaskedText>
        </View>
        <View style={styles.botao}>
      <ButtonP label="Editar informações" onPress={editarPerfil} />
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
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Roboto',
    marginTop: -2,
    color: "#231F20",
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
