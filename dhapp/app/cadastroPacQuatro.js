import { ButtonP } from "@/components/ButtonP";
import { MyDropdown } from "@/components/MyDropdown";
import { MyInput } from "@/components/MyInput";
import { usePaciente } from "@/context/context";
import NetInfo from "@react-native-community/netinfo";
import { router, Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDB } from "../database";
import { supabase } from "../supabaseserver";
import styles from "./styleForms";

export default function CadastroPacQuatro() {
  const { pacientedados, setPacientedados } = usePaciente();
  const [db, setDb] = useState(null);
  const [valor1, setValor1] = useState(null);
  const [valor2, setValor2] = useState(null);
  const [cadastroCarregando, setCadastroCarregando] = useState(false);

  useEffect(() => {
    (async () => {
      const database = await getDB();
      setDb(database);
    })();
  }, []);

  const traduzirErroCadastro = (error) => {
    const mensagemOriginal = String(error?.message || error || "");
    const mensagem = mensagemOriginal.toLowerCase();

    if (mensagem.includes("sem_internet")) {
      return "Você está sem conexão com a internet. Conecte-se e tente novamente.";
    }

    if (
      mensagem.includes("user already registered") ||
      mensagem.includes("already registered") ||
      mensagem.includes("already exists") ||
      mensagem.includes("duplicate") ||
      mensagem.includes("unique")
    ) {
      return "Este e-mail já está cadastrado.";
    }

    if (mensagem.includes("invalid email")) {
      return "O e-mail informado é inválido.";
    }

    if (mensagem.includes("password")) {
      return "A senha informada não atende aos requisitos mínimos.";
    }

    if (
      mensagem.includes("network") ||
      mensagem.includes("fetch") ||
      mensagem.includes("internet") ||
      mensagem.includes("failed to fetch") ||
      mensagem.includes("network request failed")
    ) {
      return "Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.";
    }

    if (
      mensagem.includes("violates foreign key constraint") ||
      mensagem.includes("foreign key")
    ) {
      return "Erro ao vincular os dados do paciente. Tente novamente.";
    }

    if (mensagem.includes("null value") || mensagem.includes("not-null")) {
      return "Existem campos obrigatórios não preenchidos. Revise os dados e tente novamente.";
    }

    return "Não foi possível finalizar o cadastro. Verifique os dados e tente novamente.";
  };

  const limparCadastroSupabase = async (authUserId) => {
    if (!authUserId) return;

    try {
      await supabase
        .from("complementares")
        .delete()
        .eq("usuario_id", authUserId);

      await supabase
        .from("historico_medico")
        .delete()
        .eq("usuario_id", authUserId);

      await supabase.from("usuarios").delete().eq("id", authUserId);

      console.log("Limpeza parcial do Supabase concluída.");
    } catch (error) {
      console.error(
        "Erro ao tentar limpar cadastro parcial no Supabase:",
        error,
      );
    }
  };

  const registrarAuth = async (email_responsavel, senha) => {
    let authUserId = null;

    try {
      const emailNormalizado = email_responsavel.trim().toLowerCase();

      const { data, error } = await supabase.auth.signUp({
        email: emailNormalizado,
        password: senha,
        options: {
          data: {
            cpf: pacientedados.cpf,
            nome: pacientedados.nome,
            email_responsavel: emailNormalizado,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (!data?.user?.id) {
        throw new Error("Não foi possível obter o ID do usuário criado.");
      }

      authUserId = data.user.id;

      const { error: errorUsuario } = await supabase.from("usuarios").insert([
        {
          id: authUserId,
          nome: pacientedados.nome,
          data_nascimento: pacientedados.data_nascimento,
          genero: pacientedados.genero,
          cpf: pacientedados.cpf,
          nome_mae: pacientedados.nome_mae,
          nome_responsavel: pacientedados.nome_responsavel,
          telefone_responsavel: pacientedados.telefone_responsavel,
          email_responsavel: emailNormalizado,
          aceitou_privacidade: pacientedados.aceitou_privacidade,
          data_privacidade: pacientedados.data_aceite_privacidade,
          versao_privacidade: pacientedados.versao_privacidade,
          aceitou_termos: pacientedados.aceitou_termos,
          data_termo: pacientedados.data_aceite_termos,
          versao_termo: pacientedados.versao_termos,
        },
      ]);

      if (errorUsuario) {
        throw errorUsuario;
      }

      const { error: errorHistorico } = await supabase
        .from("historico_medico")
        .insert([
          {
            usuario_id: authUserId,
            exame_cariotipo: pacientedados.cariotipo,
            data_cariotipo: pacientedados.dataCariotipo,
            triagem_auditiva: pacientedados.exameAuditivo,
            data_triagem: pacientedados.dataAuditivo,
            consulta_cardiologista: pacientedados.consultCardio,
            data_cardiologista: pacientedados.dataCard,
            teste_pezinho: pacientedados.testePe,
            data_pezinho: pacientedados.dataPe,
            consulta_oftalmo: pacientedados.oftalmo,
            data_oftalmo: pacientedados.dataOftal,
            consulta_fono: pacientedados.consultaFono,
            data_fono: pacientedados.dataFono,
            consulta_odonto: pacientedados.consultaOdonto,
            data_odonto: pacientedados.dataOdonto,
            consulta_endocrinologia: pacientedados.consultaEndocrino,
            data_endocrinologia: pacientedados.dataEndocrino,
            comorbidades: pacientedados.comorbidades,
            medicamentos: pacientedados.medicamento,
            alergias: pacientedados.alergia,
            tipo_sanguineo: pacientedados.tiposangue,
            consulta_terapia: pacientedados.consultaTerapia,
            data_terapia: pacientedados.dataTerapia,
            consulta_fisio: pacientedados.consultaFisio,
            data_fisio: pacientedados.dataFisio,
            consulta_psicopedagogo: pacientedados.consultaPsico,
            data_psicopedagogo: pacientedados.dataPsico,
          },
        ]);

      if (errorHistorico) {
        throw errorHistorico;
      }

      const { error: errorComplementar } = await supabase
        .from("complementares")
        .insert([
          {
            usuario_id: authUserId,
            escolaridade: pacientedados.escolaridade,
            unidade_1: pacientedados.uni1,
            unidade_2: pacientedados.uni2,
            unidade_3: pacientedados.uni3,
            autonomia_comunicacao: pacientedados.comunicacao,
          },
        ]);

      if (errorComplementar) {
        throw errorComplementar;
      }

      return authUserId;
    } catch (error) {
      console.error("Erro no cadastro do Supabase:", error);

      if (authUserId) {
        await limparCadastroSupabase(authUserId);
      }

      throw error;
    }
  };

  const salvarPaciente = async () => {
    if (cadastroCarregando) return;

    if (!db) {
      Alert.alert("Aguarde", "O banco de dados ainda está sendo inicializado.");
      return;
    }

    try {
      setCadastroCarregando(true);

      const emailNormalizado = pacientedados.email_responsavel
        ?.trim()
        .toLowerCase();

      if (!emailNormalizado) {
        throw new Error("E-mail do responsável não informado.");
      }

      if (!pacientedados.senha) {
        throw new Error("Senha não informada.");
      }

      const netState = await NetInfo.fetch();

      if (!netState.isConnected) {
        throw new Error("SEM_INTERNET");
      }

      const authUserId = await registrarAuth(
        pacientedados.email_responsavel,
        pacientedados.senha,
      );

      await db.withTransactionAsync(async () => {
        await db.runAsync(
          `INSERT INTO usuarios 
            (id, nome, data_nascimento, genero, cpf, nome_mae, nome_responsavel, telefone_responsavel, email_responsavel)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            authUserId,
            pacientedados.nome,
            pacientedados.data_nascimento,
            pacientedados.genero,
            pacientedados.cpf,
            pacientedados.nome_mae,
            pacientedados.nome_responsavel,
            pacientedados.telefone_responsavel,
            emailNormalizado,
          ],
        );

        await db.runAsync(
          `INSERT INTO historico_medico 
            (usuario_id, exame_cariotipo, data_cariotipo, triagem_auditiva, data_triagem, consulta_cardiologista, data_cardiologista, teste_pezinho, data_pezinho, consulta_oftalmo, data_oftalmo, consulta_fono, data_fono, consulta_odonto, data_odonto, consulta_endocrinologia, data_endocrinologia, consulta_fisio, data_fisio, consulta_terapia, data_terapia, consulta_psicopedagogo, data_psicopedagogo, comorbidades, medicamentos, alergias, tipo_sanguineo)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            authUserId,
            pacientedados.cariotipo,
            pacientedados.dataCariotipo,
            pacientedados.exameAuditivo,
            pacientedados.dataAuditivo,
            pacientedados.consultCardio,
            pacientedados.dataCard,
            pacientedados.testePe,
            pacientedados.dataPe,
            pacientedados.oftalmo,
            pacientedados.dataOftal,
            pacientedados.consultaFono,
            pacientedados.dataFono,
            pacientedados.consultaOdonto,
            pacientedados.dataOdonto,
            pacientedados.consultaEndocrino,
            pacientedados.dataEndocrino,
            pacientedados.consultaFisio,
            pacientedados.dataFisio,
            pacientedados.consultaTerapia,
            pacientedados.dataTerapia,
            pacientedados.consultaPsico,
            pacientedados.dataPsico,
            pacientedados.comorbidades,
            pacientedados.medicamento,
            pacientedados.alergia,
            pacientedados.tiposangue,
          ],
        );

        await db.runAsync(
          `INSERT INTO complementares 
            (usuario_id, escolaridade, unidade_1, unidade_2, unidade_3, autonomia_comunicacao)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            authUserId,
            pacientedados.escolaridade,
            pacientedados.uni1,
            pacientedados.uni2,
            pacientedados.uni3,
            pacientedados.comunicacao,
          ],
        );
      });

      console.log("Paciente salvo no Supabase e no SQLite.");

      Alert.alert("Cadastro concluído!");
      router.replace("/");
    } catch (error) {
      console.error("Erro ao salvar paciente:", error);

      const mensagem = traduzirErroCadastro(error);

      Alert.alert("Erro no cadastro", mensagem);
    } finally {
      setCadastroCarregando(false);
    }
  };

  const ref_input1 = useRef();
  const ref_input2 = useRef();

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.corEscura}>
      <Stack.Screen
        options={{
          title: "Cadastro de pessoa com síndrome de Down",
          headerShadowVisible: true,
          headerTitle: ({ children: title }) => {
            return (
              <Text style={styles.headerCadastro} numberOfLines={2}>
                {title}
              </Text>
            );
          },
        }}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.corEscura}
        extraHeight={280}
      >
        <View style={styles.container}>
          <View style={styles.containerForm}>
            <View>
              <Text style={styles.subTitulo}>
                Informações complementares (Passo 4 de 4)
              </Text>
            </View>

            <View>
              <Text style={styles.textForm}>Escolaridade</Text>
              <MyDropdown
                data={[
                  { label: "Creche", value: "Creche" },
                  { label: "Pré-escola", value: "Pré escola" },
                  {
                    label: "Ensino fundamental incompleto",
                    value: "Ensino fundamental incompleto",
                  },
                  {
                    label: "Ensino fundamental completo",
                    value: "Ensino fundamental completo",
                  },
                  {
                    label: "Ensino médio incompleto",
                    value: "Ensino médio incompleto",
                  },
                  {
                    label: "Ensino médio completo",
                    value: "Ensino médio completo",
                  },
                  {
                    label: "Ensino superior incompleto",
                    value: "Ensino superior incompleto",
                  },
                  {
                    label: "Ensino superior completo",
                    value: "Ensino superior completo",
                  },
                  { label: "Pós-graduação", value: "Pós graduação" },
                ]}
                labelField="label"
                valueField="value"
                placeholder="Selecione"
                value={valor1}
                onChange={(item) => {
                  setValor1(item.value);
                  setPacientedados((prev) => ({
                    ...prev,
                    escolaridade: item.value,
                  }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Unidade escolar 1</Text>
              <MyInput
                style={styles.input}
                placeholder="Ex: Colégio Cora Coralina"
                placeholderTextColor={"grey"}
                onSubmitEditing={() => ref_input1.current.focus()}
                returnKeyType="next"
                submitBehavior="submit"
                onChangeText={(text) =>
                  setPacientedados((prev) => ({ ...prev, uni1: text }))
                }
              />
            </View>

            <View>
              <Text style={styles.textForm}>Unidade escolar 2</Text>
              <MyInput
                ref={ref_input1}
                style={styles.input}
                placeholder="Ex: APAE Botucatu"
                placeholderTextColor={"grey"}
                onSubmitEditing={() => ref_input2.current.focus()}
                returnKeyType="next"
                submitBehavior="submit"
                onChangeText={(text) =>
                  setPacientedados((prev) => ({ ...prev, uni2: text }))
                }
              />
            </View>

            <View>
              <Text style={styles.textForm}>Unidade escolar 3</Text>
              <MyInput
                ref={ref_input2}
                style={styles.input}
                placeholder="Ex: Apoio"
                placeholderTextColor={"grey"}
                returnKeyType="done"
                onChangeText={(text) =>
                  setPacientedados((prev) => ({ ...prev, uni3: text }))
                }
              />
            </View>

            <View>
              <Text style={styles.textForm}>Autonomia de comunicação</Text>
              <MyDropdown
                data={[
                  { label: "Total", value: "Total" },
                  { label: "Parcial", value: "Parcial" },
                  { label: "Não", value: "Não" },
                ]}
                labelField="label"
                valueField="value"
                placeholder="Selecione"
                value={valor2}
                onChange={(item) => {
                  setValor2(item.value);
                  setPacientedados((prev) => ({
                    ...prev,
                    comunicacao: item.value,
                  }));
                }}
              />
            </View>

            {cadastroCarregando ? (
              <ButtonP
                onPress={salvarPaciente}
                label={<ActivityIndicator color="#FAFAFF" />}
              />
            ) : (
              <ButtonP onPress={salvarPaciente} label="Cadastrar" />
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
