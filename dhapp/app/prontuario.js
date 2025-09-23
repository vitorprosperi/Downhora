import React, { useState, useEffect } from "react"
import { View, Text, FlatList } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styleForms';
import { useSQLiteContext } from 'expo-sqlite';

export default function Prontuario(){

  const db = useSQLiteContext();
  const [pacientes, setPacientes] = useState([]);
  const [enderecos, setEnderecos] = useState([]);

  // Buscar pacientes salvos no SQLite
  const carregarPacientes = async () => {
    try {
      const result = await db.getAllAsync("SELECT * FROM PessoaSindromeDeDown");
      setPacientes(result);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  };
// Buscar Endereços salvos no SQLite
  const carregarEnderecos = async () => {
    try {
      const result = await db.getAllAsync("SELECT * FROM Endereco");
      setEnderecos(result);
    } catch (error) {
      console.error("Erro ao buscar endereços:", error);
    }
  };

  useEffect(() => {
    carregarPacientes();
    carregarEnderecos();
  }, []);

  // Função para buscar endereço pelo id do paciente
  function EnderecoPorPacienteId(pacienteId) {
    return enderecos.find(e => e.pessoa_id === pacienteId);
  }

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}> 
      <View style={styles.telaInicio}>    
        <FlatList
          data={pacientes}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => {
            const endereco = EnderecoPorPacienteId(item.id);
            return (
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

                {/* Parágrafo entre Unidade e CEP */}
                <Text style={{ color: 'black', marginVertical: 8 }}>
                  Dados de endereço do paciente:
                </Text>

                {/* Dados do endereço, se existir */}
                {endereco ? (
                  <>
                    <Text style={{ color: 'black' }}>CEP: {endereco.cep}</Text>
                    <Text style={{ color: 'black' }}>Rua: {endereco.rua}</Text>
                    <Text style={{ color: 'black' }}>Estado: {endereco.estado}</Text>
                    <Text style={{ color: 'black' }}>Cidade: {endereco.cidade}</Text>
                    <Text style={{ color: 'black' }}>Bairro: {endereco.bairro}</Text>
                    <Text style={{ color: 'black' }}>Número: {endereco.numero}</Text>
                    <Text style={{ color: 'black' }}>Complemento: {endereco.complemento}</Text>
                  </>
                ) : (
                  <Text style={{ color: 'black' }}>Endereço não cadastrado.</Text>
                )}
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
