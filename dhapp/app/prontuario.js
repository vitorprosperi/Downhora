import { useState, useEffect } from "react"
import { View, Text, FlatList } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styleForms';
import { useSQLiteContext } from 'expo-sqlite';
import NetInfo from '@react-native-community/netinfo';
import { supabase } from "../supabaseserver";
import { useUsuario } from '@/context/context';

export default function Prontuario(){

  const db = useSQLiteContext();
  const { userId } = useUsuario();
  const [pacientes, setPacientes] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [historicos, setHistoricos] = useState([]);
  const [complementares, setComplementares] = useState([]);

  // Buscar dados do Supabase
  const carregarSupabase = async () => {
    try {
      // Busca paciente do usuário logado
      const { data: pacienteData, error: pacienteError } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id", userId);

      if (pacienteError) throw pacienteError;
      setPacientes(pacienteData || []);

      // Busca endereço
      const { data: enderecoData, error: enderecoError } = await supabase
        .from("endereco")
        .select("*")
        .eq("usuario_id", userId);

      if (enderecoError) throw enderecoError;
      setEnderecos(enderecoData || []);

      // Busca histórico médico
      const { data: historicoData, error: historicoError } = await supabase
        .from("historico_medico")
        .select("*")
        .eq("usuario_id", userId);

      if (historicoError) throw historicoError;
      setHistoricos(historicoData || []);

      // Busca informações complementares
      const { data: compData, error: compError } = await supabase
        .from("complementares")
        .select("*")
        .eq("usuario_id", userId);

      if (compError) throw compError;
      setComplementares(compData || []);

    } catch (error) {
      console.error("Erro ao buscar dados no Supabase:", error);
    }
  };

  // Buscar dados do SQLite
  const carregarSQLite = async () => {
    try {
      const resultPac = await db.getAllAsync("SELECT * FROM PessoaSindromeDeDown");
      setPacientes(resultPac);

      const resultEnd = await db.getAllAsync("SELECT * FROM Endereco");
      setEnderecos(resultEnd);

      const resultHist = await db.getAllAsync("SELECT * FROM HistoricoMedico");
      setHistoricos(resultHist);

      const resultComp = await db.getAllAsync("SELECT * FROM InformacoesComplementares");
      setComplementares(resultComp);

    } catch (error) {
      console.error("Erro ao buscar dados no SQLite:", error);
    }
  };

  useEffect(() => {
    const buscarDados = async () => {
      const netState = await NetInfo.fetch();
      if (netState.isConnected && userId) {
        console.log("Recuperando dados do Supabase...");
        await carregarSupabase();
      } else {
        console.log("Recuperando dados do SQLite...");
        await carregarSQLite();
      }
    };
    buscarDados();
  }, [userId]);

  // Funções para buscar dados relacionados
  function EnderecoPorPacienteId(pacienteId) {
    return enderecos.find(e => e.usuario_id === pacienteId || e.pessoa_id === pacienteId);
  }
  function HistoricoPorPacienteId(pacienteId) {
    return historicos.find(h => h.usuario_id === pacienteId || h.pessoa_id === pacienteId);
  }
  function InformacaoPorPacienteId(pacienteId) {
    return complementares.find(h => h.usuario_id === pacienteId || h.pessoa_id === pacienteId);
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
                <Text style={{ color: 'black' }}>Nome: {item.nome_completo || item.nome}</Text>
                <Text style={{ color: 'black' }}>CPF: {item.cpf}</Text>
                <Text style={{ color: 'black' }}>Nascimento: {item.data_nascimento}</Text>
                <Text style={{ color: 'black' }}>Gênero: {item.genero}</Text>
                <Text style={{ color: 'black' }}>CNS: {item.cns}</Text>
                <Text style={{ color: 'black' }}>Nome mãe: {item.nome_mae}</Text>
                <Text style={{ color: 'black' }}>Nome responsável: {item.nome_responsavel}</Text>
                <Text style={{ color: 'black' }}>Telefone responsável: {item.telefone_responsavel}</Text>
                <Text style={{ color: 'black' }}>Email responsável: {item.email_responsavel}</Text>
                <Text style={{ color: 'black' }}>Número Prontuario: {item.numero_prontuario || item.n_prontuario}</Text>
                <Text style={{ color: 'black' }}>Unidade: {item.unidade_saude || item.unidade_prontuario}</Text>

                <Text style={{ color: 'black', marginVertical: 8 }}>
                  Dados de endereço do paciente:
                </Text>
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

                <Text style={{ color: 'black', marginVertical: 8 }}>
                  Histórico médico do paciente:
                </Text>
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

                <Text style={{ color: 'black', marginVertical: 8 }}>
                  Informações complementares:
                </Text>
                {infoComp ? (
                  <>
                    <Text style={{ color: 'black' }}>Escolaridade: {infoComp.escolaridade}</Text>
                    <Text style={{ color: 'black' }}>Nome da escola: {infoComp.nome_escola}</Text>
                    <Text style={{ color: 'black' }}>Unidade APAE: {infoComp.unidade_apae}</Text>
                    <Text style={{ color: 'black' }}>Autonomia/comunicação: {infoComp.autonomia_comunicacao}</Text>
                    <Text style={{ color: 'black' }}>Acompanhamento multiprofissional: {infoComp.acompanhamento_prof}</Text>
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
