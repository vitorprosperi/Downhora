import { useUsuario } from '@/context/context';
import NetInfo from '@react-native-community/netinfo';
import dayjs from 'dayjs';
import { Stack } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { MaskedText } from 'react-native-mask-text';
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
        <View>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.text}>
            {valor}
          </Text>
          <Text style={styles.label}>Data mais recente</Text>
          <MaskedText mask="99/99/9999" style={styles.text}>{dataCampo}</MaskedText>
        </View>
      );
    }


    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.text}>
          {valor || "Não informado"}
        </Text>
      </View>
    );
  };

  // Formatador de data
  var customParseFormat = require("dayjs/plugin/customParseFormat");
  dayjs.extend(customParseFormat)


  return (
    <SafeAreaView style={styles.safeView} edges={['bottom']}>
      <Stack.Screen
        options={{ title: 'Prontuário', 
          headerShadowVisible: true,
        }}
      />
      <View>
        <FlatList
          data={pacientes}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={({ item }) => {
            const historico = HistoricoPorPacienteId(item.id);
            const infoComp = InfoPorPacienteId(item.id);

            const data = `${item.data_nascimento}`
            const dataFormatada = dayjs(data, 'DDMMYYYY').format('YYYY-MM-DD');

            const idade = dayjs().diff(dataFormatada, 'y');

            return (
              <View style={styles.container}>

                <View style={styles.contNome}>
                  <Text style={styles.nome}>{item.nome}, {idade} anos</Text>
                </View>

                <View style={styles.contTitulo}>
                  {<Text style={styles.titulo}>Dados pessoais</Text>}
                </View>
                <View style={styles.dadosContainer}>
                  <View>
                    <Text style={styles.label}>CPF</Text>
                    <MaskedText mask="999.999.999-99" style={styles.text}>{item.cpf}</MaskedText>
                  </View>

                  <View>
                    <Text style={styles.label}>Data de nascimento</Text>
                    <MaskedText mask="99/99/9999" style={styles.text}>{item.data_nascimento}</MaskedText>
                  </View>

                  <View>
                    <Text style={styles.label}>Gênero</Text>
                    <Text style={styles.text}>{item.genero}</Text>
                  </View>

                  <View>
                    <Text style={styles.label}>CNS</Text>
                    <Text style={styles.text}>{item.cns}</Text>
                  </View>

                  {infoComp ? (
                    <>
                      <View>
                        <Text style={styles.label}>Escolaridade</Text>
                        <Text style={styles.text}>{infoComp.escolaridade}</Text>
                      </View>

                      <View>
                        <Text style={styles.label}>Unidade escolar 1</Text>
                        <Text style={styles.text}>{infoComp.unidade_1}</Text>
                      </View>

                      <View>
                        <Text style={styles.label}>Unidade escolar 2</Text>
                        <Text style={styles.text}>{infoComp.unidade_2}</Text>
                      </View>

                      <View>
                        <Text style={styles.label}>Unidade escolar 3</Text>
                        <Text style={styles.text}>{infoComp.unidade_3}</Text>
                      </View>

                      <View>
                        <Text style={styles.label}>Autonomia/comunicação </Text>
                        <Text style={styles.text}>{infoComp.autonomia_comunicacao}</Text>
                      </View>
                    </>
                  ) : (
                    <View>
                    </View>
                  )}

                  <View>
                    <Text style={styles.label}>Nome da mãe</Text>
                    <Text style={styles.text}>{item.nome_mae}</Text>
                  </View>

                  <View>
                    <Text style={styles.label}>Nome do responsável</Text>
                    <Text style={styles.text}>{item.nome_responsavel}</Text>
                  </View>

                  <View>
                    <Text style={styles.label}>Telefone do responsável</Text>
                    <MaskedText mask="(99) 9999-9999" style={styles.text}>{item.telefone_responsavel}</MaskedText>
                  </View>

                  <View>
                    <Text style={styles.label}>Email do responsável</Text>
                    <Text style={[styles.text, { textTransform: 'none' }]}>{item.email_responsavel}</Text>
                  </View>
                </View>

                <View style={styles.contTitulo}>
                  <Text style={styles.titulo}>Histórico médico</Text>
                </View>
                <View style={styles.dadosContainer}>
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
                      <View>
                        <Text style={styles.label}>Comorbidades</Text>
                        <Text style={[styles.text, { textTransform: 'none' }]}>
                          {historico.comorbidades}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.label}>Medicamentos</Text>
                        <Text style={[styles.text]}>
                          {historico.medicamentos}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.label}>Alergias</Text>
                        <Text style={[styles.text, { textTransform: 'none' }]}>
                          {historico.alergias}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.label}>Tipo sanguíneo</Text>
                        <Text style={styles.text}>
                          {historico.tipo_sanguineo}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <Text style={styles.text}>
                      Histórico não cadastrado.
                    </Text>
                  )}
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardColap: {
    backgroundColor: '#FAFAFF',
    width: '100%',
    borderWidth: 0,
    alignItems: 'flex-start',
  },
  safeView: {
    flex: 1,
    backgroundColor: '#FAFAFF',
  },
  container: {
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '92%',
  },
  contTitulo: {
    alignSelf: 'center',
    paddingVertical: 5,
  },
  contNome: {
    alignSelf: 'center'
  },
  dadosContainer: {
    gap: 8,
    marginBottom: 10,
  },
  nome: {
    fontFamily: 'Roboto',
    color: '#231F20',
    fontSize: 19,
  },
  titulo: {
    fontFamily: 'Raleway-700',
    color: '#231F20',
    fontSize: 18,
  },
  text: {
    fontSize: 15,
    color: '#231F20',
    fontFamily: 'Roboto',
    textTransform: 'capitalize',
    marginTop: -2,
  },
  label: {
    fontSize: 15,
    color: '#hsl(345, 6%, 43%)',
    fontFamily: 'Roboto-500',
  },
})