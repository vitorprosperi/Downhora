import { ButtonP } from "@/components/ButtonP";
import { CadastroWarningModal } from "@/components/CadastroWarningModal";
import { MyDropdown } from "@/components/MyDropdown";
import { MyInput } from "@/components/MyInput";
import { MyMaskInput } from "@/components/MyMaskInput";
import { PassInput } from "@/components/PassInput";
import { PrivacyPolicyModal } from "@/components/PrivacyPolicyModal";
import { TermsOfUseModal } from "@/components/TermsOfUseModal";
import { usePaciente } from "@/context/context";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { Stack } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Modal, Platform, Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Masks } from "react-native-mask-input";
import { SafeAreaView } from "react-native-safe-area-context";
import validator from "validator";
import { cadastropacDois } from "../routes/rotas";
import { supabase } from "../supabaseserver";
import styles from "./styleForms";

const validateCpf = require("validar-cpf");
const normalizarCpf = (valor) => (valor || "").toString().replace(/\D/g, "");
const DEBOUNCE_VALIDACAO_MS = 900;

const senhaEhForte = (senha) =>
  validator.isStrongPassword(senha || "", {
    minUppercase: 0,
    minSymbols: 0,
  });

const telefoneEhValido = (telefone) =>
  validator.isMobilePhone(telefone || "", "pt-BR") &&
  (telefone || "").length === 11;

const emailEhValido = (email) => validator.isEmail((email || "").trim());

export default function CadastroPac() {
  const { pacientedados, setPacientedados } = usePaciente();

  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [cpfUnmasked, setCpfUnmasked] = useState("");
  const [senhaForca, setSenhaForca] = useState("");
  const [genero, setGenero] = useState(null);
  const [dataNascimentoDisplay, setDataNascimentoDisplay] = useState("");
  const [showNascimentoPicker, setShowNascimentoPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [cpf, setCpf] = useState("");
  const [telResp, setTelResp] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [dataValor, setDataValor] = useState(null);
  const [isModalVisible, setModalVisible] = useState(true);
  const [isModalTermoVisible, setModalTermoVisible] = useState(true);
  const [isModalPrivacidadeVisible, setModalPrivacidadeVisible] =
    useState(true);
  const [aceitouPrivacidade, setAceitouPrivacidade] = useState(false);
  const [erroAceitePrivacidade, setErroAceitePrivacidade] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [erroAceiteTermos, setErroAceiteTermos] = useState(false);

  // --- Estados de validação ---
  const [cpfValido, setCpfValido] = useState(true);
  const [cpfJaCadastrado, setCpfJaCadastrado] = useState(false);
  const [emailJaCadastrado, setEmailJaCadastrado] = useState(false);
  const [cpfProntoParaValidar, setCpfProntoParaValidar] = useState(false);
  const [senhaProntaParaValidar, setSenhaProntaParaValidar] = useState(false);
  const [telProntoParaValidar, setTelProntoParaValidar] = useState(false);
  const [emailProntoParaValidar, setEmailProntoParaValidar] = useState(false);

  const itensGenero = [
    { label: "Masculino", value: "Masculino" },
    { label: "Feminino", value: "Feminino" },
    { label: "Outro", value: "Outro" },
  ];

  const toggleModal = () => setModalVisible(!isModalVisible);
  const toggleModalTermo = () => setModalTermoVisible(!isModalTermoVisible);
  const toggleModalPrivacidade = () =>
    setModalPrivacidadeVisible(!isModalPrivacidadeVisible);

  const formatarParaBR = (date) =>
    new Date(date).toLocaleDateString("pt-BR", { timeZone: "UTC" });

  const formatarParaISO = (date) => dayjs(date).format("YYYY-MM-DD");

  // --- Checagens de duplicidade no Supabase ---
  const verificarCpfDuplicado = useCallback(async (cpfValor) => {
    const cpfNormalizado = normalizarCpf(cpfValor);
    if (!cpfNormalizado || cpfNormalizado.length < 11) {
      setCpfJaCadastrado(false);
      return false;
    }
    try {
      const { data, error } = await supabase.rpc("verificar_cpf_existente", {
        p_cpf: cpfNormalizado,
      });
      if (error) {
        console.error("RPC verificar_cpf_existente falhou:", error);
        return null;
      }
      const existeCpf = Boolean(data);
      setCpfJaCadastrado(existeCpf);
      return existeCpf;
    } catch (err) {
      console.error("Erro inesperado ao verificar CPF duplicado:", err);
      return null;
    }
  }, []);

  const verificarEmailDuplicado = useCallback(async (emailValor) => {
    const emailNormalizado = emailValor?.trim().toLowerCase();
    if (!emailNormalizado || !validator.isEmail(emailNormalizado)) {
      setEmailJaCadastrado(false);
      return false;
    }
    try {
      const { data, error } = await supabase.rpc("verificar_email_existente", {
        p_email: emailNormalizado,
      });
      if (error) {
        console.error("RPC verificar_email_existente falhou:", error);
        return null;
      }
      const existeEmail = Boolean(data);
      setEmailJaCadastrado(existeEmail);
      return existeEmail;
    } catch (err) {
      console.error("Erro inesperado ao verificar e-mail duplicado:", err);
      return null;
    }
  }, []);

  useEffect(() => {
    setCpfProntoParaValidar(false);
    if (!cpfUnmasked) {
      setCpfValido(true);
      setCpfJaCadastrado(false);
      return;
    }

    const timer = setTimeout(async () => {
      setCpfProntoParaValidar(true);
      const cpfNormalizado = normalizarCpf(cpfUnmasked);
      const cpfEhValido = validateCpf(cpfNormalizado);
      setCpfValido(cpfEhValido);

      if (cpfEhValido && cpfNormalizado.length === 11) {
        await verificarCpfDuplicado(cpfNormalizado);
      } else {
        setCpfJaCadastrado(false);
      }
    }, DEBOUNCE_VALIDACAO_MS);

    return () => clearTimeout(timer);
  }, [cpfUnmasked, verificarCpfDuplicado]);

  useEffect(() => {
    setSenhaProntaParaValidar(false);
    if (!senhaForca) return;

    const timer = setTimeout(() => {
      setSenhaProntaParaValidar(true);
    }, DEBOUNCE_VALIDACAO_MS);

    return () => clearTimeout(timer);
  }, [senhaForca]);

  useEffect(() => {
    setTelProntoParaValidar(false);
    if (!tel) return;

    const timer = setTimeout(() => {
      setTelProntoParaValidar(true);
    }, DEBOUNCE_VALIDACAO_MS);

    return () => clearTimeout(timer);
  }, [tel]);

  useEffect(() => {
    setEmailProntoParaValidar(false);
    const emailNormalizado = email?.trim().toLowerCase();

    if (!emailNormalizado) {
      setEmailJaCadastrado(false);
      return;
    }

    const timer = setTimeout(async () => {
      setEmailProntoParaValidar(true);
      if (validator.isEmail(emailNormalizado)) {
        await verificarEmailDuplicado(emailNormalizado);
      } else {
        setEmailJaCadastrado(false);
      }
    }, DEBOUNCE_VALIDACAO_MS);

    return () => clearTimeout(timer);
  }, [email, verificarEmailDuplicado]);

  const handleDataNascimentoChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowNascimentoPicker(false);
      if (selectedDate) {
        setDataValor(selectedDate);
        setDataNascimentoDisplay(formatarParaBR(selectedDate));
        setPacientedados((prev) => ({
          ...prev,
          data_nascimento: formatarParaISO(selectedDate),
        }));
      }
    } else {
      if (selectedDate) setTempDate(selectedDate);
    }
  };

  // --- Avançar para próxima etapa ---
  async function Proximo() {
    const cpfAtual = normalizarCpf(pacientedados.cpf);
    const emailAtual = (pacientedados.email_responsavel || "")
      .toString()
      .trim()
      .toLowerCase();
    const cpfEhValido = validateCpf(cpfAtual);
    const emailAtualEhValido = emailEhValido(emailAtual);
    const senhaAtualEhForte = senhaEhForte(senhaForca);

    const obrigatorios = [
      { nome: "nome", label: "Nome Completo" },
      { nome: "cpf", label: "CPF" },
      { nome: "data_nascimento", label: "Data de Nascimento" },
      { nome: "genero", label: "Gênero" },
      { nome: "senha", label: "Senha" },
      { nome: "nome_mae", label: "Nome da mãe" },
      { nome: "nome_responsavel", label: "Nome do responsável" },
      { nome: "telefone_responsavel", label: "Telefone do responsável" },
      { nome: "email_responsavel", label: "E-mail do responsável" },
    ];

    const vazio = obrigatorios.find(
      (campo) =>
        !pacientedados[campo.nome] ||
        pacientedados[campo.nome].toString().trim() === "",
    );
    if (vazio) {
      Alert.alert("Atenção", `O campo "${vazio.label}" é obrigatório.`);
      return;
    }

    if (!cpfEhValido) {
      setCpfValido(cpfEhValido);
      Alert.alert("Atenção", "CPF inválido. Por favor, verifique.");
      return;
    }

    if (!emailAtualEhValido) {
      Alert.alert("Atenção", "E-mail inválido. Por favor, verifique.");
      return;
    }

    const cpfDuplicado = await verificarCpfDuplicado(cpfAtual);
    if (cpfDuplicado === null) {
      Alert.alert(
        "Erro",
        "Nao foi possivel validar CPF no servidor. Verifique as funcoes RPC e permissoes no Supabase.",
      );
      return;
    }
    if (cpfDuplicado) {
      Alert.alert("Atenção", "Este CPF já está cadastrado no sistema.");
      return;
    }

    const emailDuplicado = await verificarEmailDuplicado(emailAtual);
    if (emailDuplicado === null) {
      Alert.alert(
        "Erro",
        "Nao foi possivel validar e-mail no servidor. Verifique as funcoes RPC e permissoes no Supabase.",
      );
      return;
    }

    if (emailDuplicado) {
      Alert.alert("Atenção", "Este e-mail já está cadastrado no sistema.");
      return;
    }

    if (!senhaAtualEhForte) {
      Alert.alert("Atenção", "Senha fraca.");
      return;
    }

    if (pacientedados.senha !== confirmarSenha) {
      Alert.alert(
        "Atenção",
        "As senhas não coincidem. Por favor, verifique e tente novamente.",
      );
      return;
    }

    cadastropacDois();
  }

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();
  const ref_input8 = useRef();
  const ref_input9 = useRef();

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.corEscura}>
      <Stack.Screen
        options={{
          title: "Cadastro de pessoa com síndrome de Down",
          headerShadowVisible: true,
          headerTitle: ({ children: title }) => (
            <Text style={styles.headerCadastro} numberOfLines={2}>
              {title}
            </Text>
          ),
        }}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.corEscura]}
        extraHeight={280}
      >
        <CadastroWarningModal
          visible={isModalVisible}
          onContinue={toggleModal}
        />

        <TermsOfUseModal
          visible={isModalTermoVisible}
          accepted={aceitouTermos}
          onToggleAccepted={() => {
            setAceitouTermos(!aceitouTermos);
            setErroAceiteTermos(false);
          }}
          showError={erroAceiteTermos}
          onContinue={() => {
            if (!aceitouTermos) {
              setErroAceiteTermos(true);
              return;
            }
            setPacientedados((prev) => ({
              ...prev,
              aceitou_termos: true,
              data_aceite_termos: new Date().toISOString(),
              versao_termos: "1.0",
            }));
            toggleModalTermo();
          }}
        />

        <PrivacyPolicyModal
          visible={isModalPrivacidadeVisible}
          accepted={aceitouPrivacidade}
          onToggleAccepted={() => {
            setAceitouPrivacidade(!aceitouPrivacidade);
            setErroAceitePrivacidade(false);
          }}
          showError={erroAceitePrivacidade}
          onContinue={() => {
            if (!aceitouPrivacidade) {
              setErroAceitePrivacidade(true);
              return;
            }
            setPacientedados((prev) => ({
              ...prev,
              aceitou_privacidade: true,
              data_aceite_privacidade: new Date().toISOString(),
              versao_privacidade: "1.0",
            }));
            toggleModalPrivacidade();
          }}
        />

        <View style={styles.container}>
          <View style={styles.containerForm}>
            <Text style={styles.subTitulo}>Dados pessoais (Passo 1 de 4)</Text>

            <View>
              <Text style={styles.textForm}>Nome completo</Text>
              <MyInput
                style={styles.input}
                placeholder="Ex: João Silva Santos"
                placeholderTextColor={"grey"}
                returnKeyType="next"
                onChangeText={(text) =>
                  setPacientedados((prev) => ({ ...prev, nome: text }))
                }
                onSubmitEditing={() => ref_input2.current.focus()}
              />
            </View>

            <View>
              <Text style={styles.textForm}>CPF</Text>
              <MyMaskInput
                ref={ref_input2}
                style={styles.input}
                keyboardType="numeric"
                mask={Masks.BRL_CPF}
                returnKeyType="done"
                maxLength={14}
                value={cpf}
                placeholder="Ex: 123.456.789-01"
                placeholderTextColor={"grey"}
                onChangeText={(masked, unmasked) => {
                  setCpf(masked);
                  setCpfUnmasked(unmasked);
                  setCpfJaCadastrado(false);
                  setPacientedados((prev) => ({ ...prev, cpf: unmasked }));
                }}
              />
              {cpfProntoParaValidar && !cpfValido && (
                <Text style={styles.textFormErro}>CPF inválido</Text>
              )}
              {cpfProntoParaValidar && cpfValido && cpfJaCadastrado && (
                <Text style={styles.textFormErro}>
                  CPF já cadastrado no sistema
                </Text>
              )}
            </View>

            <View>
              <Text style={styles.textForm}>Data de nascimento</Text>
              <Pressable onPress={() => setShowNascimentoPicker(true)}>
                <View pointerEvents="none">
                  <MyInput
                    editable={false}
                    style={[
                      styles.input,
                      { color: dataNascimentoDisplay ? "#231F20" : "grey" },
                    ]}
                  >
                    {dataNascimentoDisplay || "Selecione a data"}
                  </MyInput>
                </View>
              </Pressable>

              {showNascimentoPicker && Platform.OS === "android" && (
                <DateTimePicker
                  value={dataValor || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDataNascimentoChange}
                />
              )}

              {Platform.OS === "ios" && (
                <Modal
                  transparent
                  visible={showNascimentoPicker}
                  animationType="slide"
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      backgroundColor: "rgba(0,0,0,0.4)",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#fff",
                        paddingTop: 20,
                        paddingBottom: 20,
                        paddingHorizontal: 15,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        minHeight: 350,
                      }}
                    >
                      <DateTimePicker
                        value={tempDate}
                        mode="date"
                        display="spinner"
                        locale="pt-BR"
                        themeVariant="light"
                        style={{ backgroundColor: "#fff" }}
                        onChange={(event, date) => {
                          if (date) setTempDate(date);
                        }}
                      />
                      <ButtonP
                        label="Confirmar"
                        onPress={() => {
                          setShowNascimentoPicker(false);
                          setDataValor(tempDate);
                          setDataNascimentoDisplay(formatarParaBR(tempDate));
                          setPacientedados((prev) => ({
                            ...prev,
                            data_nascimento: formatarParaISO(tempDate),
                          }));
                        }}
                      />
                    </View>
                  </View>
                </Modal>
              )}
            </View>

            <View>
              <Text style={styles.textForm}>Gênero</Text>
              <MyDropdown
                data={itensGenero}
                labelField="label"
                valueField="value"
                placeholder="Selecione"
                value={genero}
                onChange={(item) => {
                  setGenero(item.value);
                  setPacientedados((prev) => ({ ...prev, genero: item.value }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Senha</Text>
              <PassInput
                ref={ref_input5}
                style={styles.input}
                placeholder="Digite uma senha segura"
                placeholderTextColor={"grey"}
                returnKeyType="next"
                onSubmitEditing={() => ref_input6.current.focus()}
                onChangeText={(text) => {
                  setSenhaForca(text);
                  setPacientedados((prev) => ({ ...prev, senha: text }));
                }}
                secureTextEntry
              />
              {senhaProntaParaValidar &&
                senhaForca !== "" &&
                !senhaEhForte(senhaForca) && (
                  <Text style={styles.textFormErro}>Senha fraca</Text>
                )}
            </View>

            <View>
              <Text style={styles.textForm}>Confirmar senha</Text>
              <PassInput
                ref={ref_input6}
                style={styles.input}
                returnKeyType="next"
                placeholder="Digite novamente a senha"
                placeholderTextColor={"grey"}
                value={confirmarSenha}
                onSubmitEditing={() => ref_input7.current.focus()}
                onChangeText={setConfirmarSenha}
                secureTextEntry
              />
            </View>

            <View>
              <Text style={styles.textForm}>Nome da mãe</Text>
              <MyInput
                ref={ref_input7}
                style={styles.input}
                placeholder="Ex: Maria Silva Santos"
                returnKeyType="next"
                placeholderTextColor={"grey"}
                onSubmitEditing={() => ref_input8.current.focus()}
                onChangeText={(text) =>
                  setPacientedados((prev) => ({ ...prev, nome_mae: text }))
                }
              />
            </View>

            <View>
              <Text style={styles.textForm}>Nome do responsável</Text>
              <MyInput
                ref={ref_input8}
                style={styles.input}
                returnKeyType="next"
                placeholder="Ex: Maria Silva Santos"
                placeholderTextColor={"grey"}
                onSubmitEditing={() => ref_input9.current.focus()}
                onChangeText={(text) =>
                  setPacientedados((prev) => ({
                    ...prev,
                    nome_responsavel: text,
                  }))
                }
              />
            </View>

            <View>
              <Text style={styles.textForm}>Telefone do responsável</Text>
              <MyMaskInput
                ref={ref_input9}
                style={styles.input}
                returnKeyType="next"
                placeholder="Ex: (12) 34567-8901"
                placeholderTextColor={"grey"}
                keyboardType="phone-pad"
                mask={Masks.BRL_PHONE}
                maxLength={15}
                value={telResp}
                onSubmitEditing={() => ref_input3.current.focus()}
                onChangeText={(masked, unmasked) => {
                  setTelResp(masked);
                  setTel(unmasked);
                  setPacientedados((prev) => ({
                    ...prev,
                    telefone_responsavel: unmasked,
                  }));
                }}
              />
              {telProntoParaValidar && tel !== "" && !telefoneEhValido(tel) && (
                <Text style={styles.textFormErro}>Número inválido</Text>
              )}
            </View>

            <View>
              <Text style={styles.textForm}>E-mail do responsável</Text>
              <MyInput
                ref={ref_input3}
                style={styles.input}
                returnKeyType="next"
                autoComplete="email"
                keyboardType="email-address"
                placeholder="Ex: maria@gmail.com"
                placeholderTextColor={"grey"}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailJaCadastrado(false);
                  setPacientedados((prev) => ({
                    ...prev,
                    email_responsavel: text,
                  }));
                }}
              />
              {emailProntoParaValidar &&
                email !== "" &&
                !emailEhValido(email) && (
                  <Text style={styles.textFormErro}>Email inválido</Text>
                )}
              {emailProntoParaValidar &&
                email !== "" &&
                emailEhValido(email) &&
                emailJaCadastrado && (
                  <Text style={styles.textFormErro}>
                    E-mail já cadastrado no sistema
                  </Text>
                )}
            </View>
          </View>

          <View style={{ marginBottom: 10, marginTop: 10, width: 200 }}>
            <ButtonP label="Próximo" onPress={Proximo} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
