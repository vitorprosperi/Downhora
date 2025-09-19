import React, { useState, useEffect } from "react"
import { View, Text, FlatList } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styleForms';
import { useSQLiteContext } from 'expo-sqlite';

export default function Prontuario(){

  const db = useSQLiteContext();
  const [pacientes, setPacientes] = useState([]);

  // Buscar pacientes salvos no SQLite
  const carregarPacientes = async () => {
    try {
      const result = await db.getAllAsync("SELECT * FROM PessoaSindromeDeDown");
      setPacientes(result);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  };

  useEffect(() => {
    carregarPacientes();
  }, []);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}> 
      <View style={styles.telaInicio}>    
        <FlatList
          data={pacientes}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10, padding: 10, backgroundColor: '#eee', borderRadius: 8 }}>
              <Text style={{ color: 'black' }}>Nome: {item.nome_completo}</Text>
              <Text style={{ color: 'black' }}>CPF: {item.cpf}</Text>
              <Text style={{ color: 'black' }}>Nascimento: {item.data_nascimento}</Text>
              <Text style={{ color: 'black' }}>Gênero: {item.genero}</Text>
              <Text style={{ color: 'black' }}>CNS: {item.cns}</Text>
              <Text style={{ color: 'black' }}>Nome mãe: {item.nome_mae}</Text>
              <Text style={{ color: 'black' }}>Nome responsável: {item.nome_responsavel}</Text>
              <Text style={{ color: 'black' }}>Telefone responsável: {item.telefone_responsavel}</Text>
              <Text style={{ color: 'black' }}>Email responsável: {item.email_responsavel}</Text>
              <Text style={{ color: 'black' }}>Número Prontuario: {item.numero_prontuario}</Text>
              <Text style={{ color: 'black' }}>Unidade: {item.unidade_saude}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
