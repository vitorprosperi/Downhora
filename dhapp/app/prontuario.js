import { useUsuario } from '@/context/context';
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import NetInfo from '@react-native-community/netinfo';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from "../supabaseserver";

export default function Prontuario() {
  const db = useSQLiteContext();
  const { userId } = useUsuario();
  const [pacientes, setPacientes] = useState([]);
  const [historicos, setHistoricos] = useState([]);
  const [complementares, setComplementares] = useState([]);

  const carregarSupabase = async () => {
    try {
      const { data: pacienteData, error: pacienteError } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id", userId);
      if (pacienteError) throw pacienteError;
      setPacientes(pacienteData || []);

      const { data: historicoData, error: historicoError } = await supabase
        .from("historico_medico")
        .select("*")
        .eq("usuario_id", userId);
      if (historicoError) throw historicoError;
      setHistoricos(historicoData || []);

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

  const carregarSQLite = async () => {
    try {
      const resultPac = await db.getAllAsync("SELECT * FROM usuarios");
      setPacientes(resultPac);
      const resultHist = await db.getAllAsync("SELECT * FROM historico_medico");
      setHistoricos(resultHist);
      const resultComp = await db.getAllAsync("SELECT * FROM complementares");
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

  const HistoricoPorPacienteId = (pacienteId) =>
    historicos.find(
      (h) => h.usuario_id === pacienteId || h.pessoa_id === pacienteId
    );

  const InfoPorPacienteId = (pacienteId) =>
    complementares.find(
      (h) => h.usuario_id === pacienteId || h.pessoa_id === pacienteId
    );

  const mostrarExame = (label, valor, dataCampo) => {
    if (valor?.toLowerCase() === "sim") {
      return (
        <Text style={{ color: "black" }}>
          {label}: {valor} {dataCampo ? `(Data: ${dataCampo})` : ""}
        </Text>
      );
    }
    return (
      <Text style={{ color: "black" }}>
        {label}: {valor || "Não informado"}
      </Text>
    );
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']}>
      <View>
        <FlatList
          data={pacientes}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={({ item }) => {
            const historico = HistoricoPorPacienteId(item.id);
            const infoComp = InfoPorPacienteId(item.id);

            return (
              <View>
                <Text style={{ color: 'black' }}>Nome: {item.nome}</Text>
                <CollapsibleView title="Dados pessoais">
                  <Text style={{ color: 'black' }}>CPF: {item.cpf}</Text>
                  <Text style={{ color: 'black' }}>Nascimento: {item.data_nascimento}</Text>
                  <Text style={{ color: 'black' }}>Gênero: {item.genero}</Text>
                  <Text style={{ color: 'black' }}>CNS: {item.cns}</Text>
                  <Text style={{ color: 'black' }}>Nome da mãe: {item.nome_mae}</Text>
                  <Text style={{ color: 'black' }}>Responsável: {item.nome_responsavel}</Text>
                  <Text style={{ color: 'black' }}>Telefone: {item.telefone_responsavel}</Text>
                  <Text style={{ color: 'black' }}>Email: {item.email_responsavel}</Text>
                </CollapsibleView>

                <CollapsibleView title="Histórico médico">
                {historico ? (
                  <>
                    {mostrarExame(
                      "Exame cariótipo",
                      historico.exame_cariotipo,
                      historico.data_cariotipo
                    )}
                    {mostrarExame(
                      "Triagem auditiva",
                      historico.triagem_auditiva,
                      historico.data_triagem
                    )}
                    {mostrarExame(
                      "Consulta cardiologista",
                      historico.consulta_cardiologista,
                      historico.data_cardiologista
                    )}
                    {mostrarExame(
                      "Teste do pezinho",
                      historico.teste_pezinho,
                      historico.data_pezinho
                    )}
                    {mostrarExame(
                      "Consulta oftalmo",
                      historico.consulta_oftalmo,
                      historico.data_oftalmo
                    )}
                    {mostrarExame(
                      "Consulta fono",
                      historico.consulta_fono,
                      historico.data_fono
                    )}
                    {mostrarExame(
                      "Consulta odonto",
                      historico.consulta_odonto,
                      historico.data_odonto
                    )}
                    {mostrarExame(
                      "Consulta endocrinologia",
                      historico.consulta_endocrinologia,
                      historico.data_endocrinologia
                    )}
                    {mostrarExame(
                      "Consulta fisio",
                      historico.consulta_fisio,
                      historico.data_fisio
                    )}
                    {mostrarExame(
                      "Consulta terapia",
                      historico.consulta_terapia,
                      historico.data_terapia
                    )}
                    {mostrarExame(
                      "Consulta psicopedagogo",
                      historico.consulta_psicopedagogo,
                      historico.data_psicopedagogo
                    )}
                    <Text style={{ color: "black" }}>
                      Comorbidades: {historico.comorbidades}
                    </Text>
                    <Text style={{ color: "black" }}>
                      Medicamentos: {historico.medicamentos}
                    </Text>
                    <Text style={{ color: "black" }}>
                      Alergias: {historico.alergias}
                    </Text>
                    <Text style={{ color: "black" }}>
                      Tipo sanguíneo: {historico.tipo_sanguineo}
                    </Text>
                  </>
                ) : (
                  <Text style={{ color: "black" }}>
                    Histórico não cadastrado.
                  </Text>
                )}
                </CollapsibleView>

                <CollapsibleView title="Informações complementares">
                {infoComp ? (
                  <>
                    <Text style={{ color: "black" }}>
                      Escolaridade: {infoComp.escolaridade}
                    </Text>
                    <Text style={{ color: "black" }}>
                      Unidade escolar 1: {infoComp.unidade_1}
                    </Text>
                    <Text style={{ color: "black" }}>
                      Unidade escolar 2: {infoComp.unidade_2}
                    </Text>
                    <Text style={{ color: "black" }}>
                      Unidade escolar 3: {infoComp.unidade_3}
                    </Text>
                    <Text style={{ color: "black" }}>
                      Autonomia/comunicação: {infoComp.autonomia_comunicacao}
                    </Text>
                  </>
                ) : (
                  <Text style={{ color: "black" }}>
                    Informações complementares não cadastradas.
                  </Text>
                )}
                </CollapsibleView>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
