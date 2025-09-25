import React, { useState, useEffect } from "react"
import { View, Text, FlatList } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styleForms';
import { useSQLiteContext } from 'expo-sqlite';

export default function Prontuario(){

  const db = useSQLiteContext();
  const [pacientes, setPacientes] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [historicos, setHistoricos] = useState([]);
  const [complementares, setComplementares] = useState([]);

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
  // Buscar histórico médico salvos no SQLite
  const carregarHistorico = async () => {
    try {
      const result = await db.getAllAsync("SELECT * FROM HistoricoMedico");
      setHistoricos(result);
    } catch (error) {
      console.error("Erro ao buscar histórico médico:", error);
    }
  };
  // Buscar informações complementares salvos no SQLite
  const carregarComplementares = async () => {
    try {
      const result = await db.getAllAsync("SELECT * FROM InformacoesComplementares");
      setComplementares(result);
    } catch (error) {
      console.error("Erro ao buscar informações complementares:", error);
    }
  };

  useEffect(() => {
    carregarPacientes();
    carregarEnderecos();
    carregarHistorico();
    carregarComplementares();
  }, []);

  // Função para buscar endereço pelo id do paciente
  function EnderecoPorPacienteId(pacienteId) {
    return enderecos.find(e => e.pessoa_id === pacienteId);
  }

  // Função para buscar histórico médico pelo id do paciente
  function HistoricoPorPacienteId(pacienteId) {
    return historicos.find(h => h.pessoa_id === pacienteId);
  }

  // Função para buscar informações complementares pelo id do paciente
  function InformacaoPorPacienteId(pacienteId) {
    return complementares.find(h => h.pessoa_id === pacienteId);
  }

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}> 
      <View style={styles.telaInicio}>    
        <FlatList
          data={pacientes}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => {
            const endereco = EnderecoPorPacienteId(item.id);
            const historico = HistoricoPorPacienteId(item.id);
            const infoComp = InformacaoPorPacienteId(item.id);
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
                    <Text style={{ color: 'black' }}>Unidade de Saúde: {endereco.unidade_saude}</Text>
                  </>
                ) : (
                  <Text style={{ color: 'black' }}>Endereço não cadastrado.</Text>
                )}

                {/* Parágrafo para histórico médico */}
                <Text style={{ color: 'black', marginVertical: 8 }}>
                  Histórico médico do paciente:
                </Text>

                {/* Dados do histórico médico, se existir */}
                {historico ? (
                  <>
                    <Text style={{ color: 'black' }}>
                      Exame cariótipo: {historico.exame_cariotipo} {historico.data_cariotipo ? `(Data: ${historico.data_cariotipo})` : ''}
                    </Text>
                    <Text style={{ color: 'black' }}>
                      Triagem auditiva: {historico.triagem_auditiva} {historico.data_triagem ? `(Data: ${historico.data_triagem})` : ''}
                    </Text>
                    <Text style={{ color: 'black' }}>
                      Consulta cardiologista: {historico.consulta_cardiologista} {historico.data_cardiologista ? `(Data: ${historico.data_cardiologista})` : ''}
                    </Text>
                    <Text style={{ color: 'black' }}>
                      Teste do pezinho: {historico.teste_pezinho} {historico.data_pezinho ? `(Data: ${historico.data_pezinho})` : ''}
                    </Text>
                    <Text style={{ color: 'black' }}>
                      Consulta oftalmologista: {historico.consulta_oftalmologista} {historico.data_oftalmo ? `(Data: ${historico.data_oftalmo})` : ''}
                    </Text>
                    <Text style={{ color: 'black' }}>
                      Consulta fonoaudiologia: {historico.consulta_fonoaudiologia} {historico.data_fono ? `(Data: ${historico.data_fono})` : ''}
                    </Text>
                    <Text style={{ color: 'black' }}>
                      Consulta odontologia: {historico.consulta_odontologia} {historico.data_odonto ? `(Data: ${historico.data_odonto})` : ''}
                    </Text>
                    <Text style={{ color: 'black' }}>
                      Consulta endocrinologia: {historico.consulta_endocrinologia} {historico.data_endocrinologia ? `(Data: ${historico.data_endocrinologia})` : ''}
                    </Text>
                    <Text style={{ color: 'black' }}>Comorbidades: {historico.comorbidades}</Text>
                    <Text style={{ color: 'black' }}>Medicamento em uso: {historico.medicamento_em_uso}</Text>
                    <Text style={{ color: 'black' }}>Alergias: {historico.alergias}</Text>
                    <Text style={{ color: 'black' }}>Tipo sanguíneo: {historico.tipo_sanguineo}</Text>
                  </>
                ) : (
                  <Text style={{ color: 'black' }}>Histórico médico não cadastrado.</Text>
                )}

                {/* Parágrafo para informações complementares */}
                <Text style={{ color: 'black', marginVertical: 8 }}>
                  Informações complementares:
                </Text>
                {infoComp ? (
                  <>
                    <Text style={{ color: 'black' }}>Escolaridade: {infoComp.escolaridade}</Text>
                    <Text style={{ color: 'black' }}>Nome da escola: {infoComp.nome_escola}</Text>
                    <Text style={{ color: 'black' }}>Unidade APAE: {infoComp.unidade_apae}</Text>
                    <Text style={{ color: 'black' }}>Autonomia/comunicação: {infoComp.autonomia_comunicacao}</Text>
                    <Text style={{ color: 'black' }}>Acompanhamento multiprofissional: {infoComp.acompanhamento_multiprofissional}</Text>
                  </>
                ) : (
                  <Text style={{ color: 'black' }}>Informações complementares não cadastradas.</Text>
                )}
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
