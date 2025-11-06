import { useUsuario } from '@/context/context';
import NetInfo from '@react-native-community/netinfo';
import dayjs from 'dayjs';
import { Stack } from 'expo-router';
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { MaskedText } from 'react-native-mask-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDB } from "../database"; // 👈 importa seu helper moderno
import { supabase } from "../supabaseserver";

export default function Prontuario() {
  const { userId } = useUsuario();
  const [pacientes, setPacientes] = useState([]);
  const [historicos, setHistoricos] = useState([]);
  const [complementares, setComplementares] = useState([]);

  const carregarSupabase = async (db) => {
    try {
      // Pacientes
      const { data: pacienteData, error: pacienteError } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id", userId);
      if (pacienteError) throw pacienteError;
      setPacientes(pacienteData || []);

      // Histórico médico
      const { data: historicoData, error: historicoError } = await supabase
        .from("historico_medico")
        .select("*")
        .eq("usuario_id", userId);
      if (historicoError) throw historicoError;
      setHistoricos(historicoData || []);

      // Complementares
      const { data: compData, error: compError } = await supabase
        .from("complementares")
        .select("*")
        .eq("usuario_id", userId);
      if (compError) throw compError;
      setComplementares(compData || []);

      // 💾 Atualiza o cache local
      if (pacienteData?.length) {
        for (const p of pacienteData) {
          await db.runAsync(
            `INSERT OR REPLACE INTO usuarios 
             (id, nome, data_nascimento, genero, cpf, nome_mae, nome_responsavel, telefone_responsavel, email_responsavel)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              p.id, p.nome, p.data_nascimento, p.genero, p.cpf,
              p.nome_mae, p.nome_responsavel, p.telefone_responsavel, p.email_responsavel
            ]
          );
        }
      }

      if (historicoData?.length) {
        for (const h of historicoData) {
          await db.runAsync(
            `INSERT OR REPLACE INTO historico_medico (
              id, usuario_id, exame_cariotipo, data_cariotipo, triagem_auditiva, data_triagem,
              consulta_cardiologista, data_cardiologista, teste_pezinho, data_pezinho, consulta_oftalmo, data_oftalmo,
              consulta_fono, data_fono, consulta_odonto, data_odonto, consulta_endocrinologia, data_endocrinologia,
              consulta_fisio, data_fisio, consulta_terapia, data_terapia, consulta_psicopedagogo, data_psicopedagogo,
              comorbidades, medicamentos, alergias, tipo_sanguineo
            ) VALUES (
              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )`,
            [
              h.id, h.usuario_id, h.exame_cariotipo, h.data_cariotipo, h.triagem_auditiva, h.data_triagem,
              h.consulta_cardiologista, h.data_cardiologista, h.teste_pezinho, h.data_pezinho, h.consulta_oftalmo, h.data_oftalmo,
              h.consulta_fono, h.data_fono, h.consulta_odonto, h.data_odonto, h.consulta_endocrinologia, h.data_endocrinologia,
              h.consulta_fisio, h.data_fisio, h.consulta_terapia, h.data_terapia, h.consulta_psicopedagogo, h.data_psicopedagogo,
              h.comorbidades, h.medicamentos, h.alergias, h.tipo_sanguineo
            ]
          );
        }
      }

      if (compData?.length) {
        for (const c of compData) {
          await db.runAsync(
            `INSERT OR REPLACE INTO complementares (
              id, usuario_id, escolaridade, unidade_1, unidade_2, unidade_3, autonomia_comunicacao
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              c.id, c.usuario_id, c.escolaridade, c.unidade_1, c.unidade_2, c.unidade_3, c.autonomia_comunicacao
            ]
          );
        }
      }

    } catch (error) {
      console.error("Erro ao buscar dados no Supabase:", error);
    }
  };

  const carregarSQLite = async (db) => {
    try {
      const resultPac = await db.getAllAsync("SELECT * FROM usuarios WHERE id = ?", [userId]);
      setPacientes(resultPac);

      const resultHist = await db.getAllAsync("SELECT * FROM historico_medico WHERE usuario_id = ?", [userId]);
      setHistoricos(resultHist);

      const resultComp = await db.getAllAsync("SELECT * FROM complementares WHERE usuario_id = ?", [userId]);
      setComplementares(resultComp);
    } catch (error) {
      console.error("Erro ao buscar dados no SQLite:", error);
    }
  };

  useEffect(() => {
    const buscarDados = async () => {
      const db = await getDB(); // ✅ banco moderno
      const netState = await NetInfo.fetch();

      if (netState.isConnected && userId) {
        console.log("Recuperando dados do Supabase...");
        await carregarSupabase(db);
      } else {
        console.log("Recuperando dados do SQLite...");
        await carregarSQLite(db);
      }
    };

    if (userId) buscarDados();
  }, [userId]);

  const HistoricoPorPacienteId = (pacienteId) =>
    historicos.find((h) => h.usuario_id === pacienteId || h.pessoa_id === pacienteId);

  const InfoPorPacienteId = (pacienteId) =>
    complementares.find((h) => h.usuario_id === pacienteId || h.pessoa_id === pacienteId);

  const mostrarExame = (label, valor, dataCampo) => {
    const dataFormatadaExame = new Date(dataCampo).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    if (valor?.toLowerCase() === "sim") {
      return (
        <View>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.text}>{valor}</Text>
          <Text style={styles.label}>Data mais recente</Text>
          <Text style={styles.text}>{dataFormatadaExame}</Text>
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.text}>{valor || "Não informado"}</Text>
      </View>
    );
  };

  // Configura o parse de data
  const customParseFormat = require("dayjs/plugin/customParseFormat");
  dayjs.extend(customParseFormat);

  return (
    <SafeAreaView style={styles.safeView} edges={['bottom']}>
      <Stack.Screen
        options={{
          title: 'Prontuário',
          headerShadowVisible: true,
        }}
      />
      <View>
        <FlatList
          data={pacientes}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => {
            const historico = HistoricoPorPacienteId(item.id);
            const infoComp = InfoPorPacienteId(item.id);
            const data = new Date(item.data_nascimento).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
            const dataFormatada = dayjs(data, 'DDMMYYYY').format('YYYY-MM-DD');
            const idade = dayjs().diff(dataFormatada, 'y');

            return (
              <View style={styles.container}>
                <View style={styles.contNome}>
                  <Text style={styles.nome}>{item.nome}, {idade} anos</Text>
                </View>

                <View style={styles.contTitulo}>
                  <Text style={styles.titulo}>Dados pessoais</Text>
                </View>

                <View style={styles.dadosContainer}>
                  <View>
                    <Text style={styles.label}>CPF</Text>
                    <MaskedText mask="999.999.999-99" style={styles.text}>{item.cpf}</MaskedText>
                  </View>

                  <View>
                    <Text style={styles.label}>Data de nascimento</Text>
                    <Text style={styles.text}>{data}</Text>
                  </View>

                  <View>
                    <Text style={styles.label}>Gênero</Text>
                    <Text style={styles.text}>{item.genero}</Text>
                  </View>

                  {infoComp && (
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
                        <Text style={styles.label}>Autonomia/Comunicação</Text>
                        <Text style={styles.text}>{infoComp.autonomia_comunicacao}</Text>
                      </View>
                    </>
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
                    <MaskedText mask="(99) 99999-9999" style={styles.text}>{item.telefone_responsavel}</MaskedText>
                  </View>
                  <View>
                    <Text style={styles.label}>Email do responsável</Text>
                    <Text style={[styles.text, { textTransform: 'none' }]}>{item.email_responsavel}</Text>
                  </View>
                </View>

                <View style={styles.contTituloDois}>
                  <Text style={styles.titulo}>Histórico médico</Text>
                </View>

                <View style={styles.dadosContainer}>
                  {historico ? (
                    <>
                      {mostrarExame("Exame cariótipo", historico.exame_cariotipo, historico.data_cariotipo)}
                      {mostrarExame("Triagem auditiva", historico.triagem_auditiva, historico.data_triagem)}
                      {mostrarExame("Consulta cardiologista", historico.consulta_cardiologista, historico.data_cardiologista)}
                      {mostrarExame("Teste do pezinho", historico.teste_pezinho, historico.data_pezinho)}
                      {mostrarExame("Consulta oftalmologista", historico.consulta_oftalmo, historico.data_oftalmo)}
                      {mostrarExame("Consulta fonoaudiólogo", historico.consulta_fono, historico.data_fono)}
                      {mostrarExame("Consulta odontologista", historico.consulta_odonto, historico.data_odonto)}
                      {mostrarExame("Consulta endocrinologista", historico.consulta_endocrinologia, historico.data_endocrinologia)}
                      {mostrarExame("Consulta fisioterapeuta", historico.consulta_fisio, historico.data_fisio)}
                      {mostrarExame("Consulta terapia", historico.consulta_terapia, historico.data_terapia)}
                      {mostrarExame("Consulta psicopedagogo", historico.consulta_psicopedagogo, historico.data_psicopedagogo)}

                      <View>
                        <Text style={styles.label}>Comorbidades</Text>
                        <Text style={[styles.text, { textTransform: 'none' }]}>{historico.comorbidades}</Text>
                      </View>
                      <View>
                        <Text style={styles.label}>Medicamentos</Text>
                        <Text style={styles.text}>{historico.medicamentos}</Text>
                      </View>
                      <View>
                        <Text style={styles.label}>Alergias</Text>
                        <Text style={[styles.text, { textTransform: 'none' }]}>{historico.alergias}</Text>
                      </View>
                      <View>
                        <Text style={styles.label}>Tipo sanguíneo</Text>
                        <Text style={styles.text}>{historico.tipo_sanguineo}</Text>
                      </View>
                    </>
                  ) : (
                    <Text style={styles.text}>Histórico não cadastrado.</Text>
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
  safeView: { flex: 1, backgroundColor: '#FAFAFF' },
  container: { alignItems: 'flex-start', alignSelf: 'center', width: '95%', paddingTop: 10 },
  contTitulo: {
    alignSelf: 'center',
    backgroundColor: 'hsla(216 70% 44.5% / 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    width: '100%',
  },
  contTituloDois: {
    alignSelf: 'center',
    backgroundColor: 'hsla(42 93.6% 49% / 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    width: '100%',
  },
  contNome: { 
    alignSelf: 'center' 
  },
  dadosContainer: { 
    gap: 8, marginBottom: 10 
  },
  nome: { 
    fontFamily: 'Roboto', 
    color: '#231F20', 
    fontSize: 20 
  },
  titulo: { 
    fontFamily: 'Roboto-700', 
    color: '#231F20', 
    fontSize: 19 
  },
  text: { 
    fontSize: 16, 
    color: '#231F20', 
    fontFamily: 'Roboto', 
    textTransform: 'capitalize',
    marginTop: -2 
    },
  label: { 
    fontSize: 16, 
    color: 'hsl(345, 6%, 43%)', 
    fontFamily: 'Roboto-500' 
  },
});
