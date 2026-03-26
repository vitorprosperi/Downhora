import { ButtonP } from '@/components/ButtonP';
import { MyDropdown } from '@/components/MyDropdown';
import { MyInput } from '@/components/MyInput';
import { MyMaskInput } from '@/components/MyMaskInput';
import { usePaciente } from '@/context/context';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { Stack } from 'expo-router';
import { useRef, useState } from "react";
import { Alert, Modal, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Masks } from 'react-native-mask-input';
import { SafeAreaView } from 'react-native-safe-area-context';
import validator from 'validator';
import { cadastropacDois } from '../routes/rotas';
import styles from './styleForms';

export default function CadastroPac() {
  const { pacientedados, setPacientedados } = usePaciente();

  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [cpfUnmasked, setCpfUnmasked] = useState('');
  const [senhaForca, setSenhaForca] = useState('');
  const [genero, setGenero] = useState(null);
  const [dataNascimentoDisplay, setDataNascimentoDisplay] = useState('');
  const [showNascimentoPicker, setShowNascimentoPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [cpf, setCpf] = useState('');
  const [telResp, setTelResp] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [dataValor, setDataValor] = useState(null);
  const [isModalVisible, setModalVisible] = useState(true);
  const [isModalTermoVisible, setModalTermoVisible] = useState(true);
  const [isModalPrivacidadeVisible, setModalPrivacidadeVisible] = useState(true);
  const [aceitouPrivacidade, setAceitouPrivacidade] = useState(false);
  const [erroAceitePrivacidade, setErroAceitePrivacidade] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [erroAceiteTermos, setErroAceiteTermos] = useState(false);

  const itensGenero = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Outro', value: 'Outro' },
  ];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalTermo = () => {
    setModalTermoVisible(!isModalTermoVisible);
  };

  const toggleModalPrivacidade = () => {
    setModalPrivacidadeVisible(!isModalPrivacidadeVisible);
  };

  // Função para formatar a data em br
  const formatarParaBR = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  // Função para formatar a data em ISO
  const formatarParaISO = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  // Ao selecionar a data
  const handleDataNascimentoChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowNascimentoPicker(false);

      if (selectedDate) {
        setDataValor(selectedDate);

        setDataNascimentoDisplay(formatarParaBR(selectedDate));
        setPacientedados(prev => ({
          ...prev,
          data_nascimento: formatarParaISO(selectedDate),
        }));
      }
    } else {
      // iOS apenas atualiza temporariamente
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  // Validações
  const validateCpf = require('validar-cpf');
  const [cpfValido, setCPFValido] = useState(true);
  const checkCpf = (valorcpf) => setCPFValido(validateCpf(valorcpf));

  const checkEmail = () => (
    validator.isEmail(email) ? null : <Text style={styles.textFormErro}>Email inválido</Text>
  );

  const checkTel = () => (
    validator.isMobilePhone(tel, "pt-BR") && tel.length === 11
      ? null
      : <Text style={styles.textFormErro}>Número inválido</Text>
  );

  const checkSenha = () => (
    validator.isStrongPassword(senhaForca, { minUppercase: 0, minSymbols: 0 })
      ? null
      : <Text style={styles.textFormErro}>Senha fraca</Text>
  );

  function Proximo() {
  const obrigatorios = [
    { nome: 'nome', label: 'Nome Completo' },
    { nome: 'cpf', label: 'CPF' },
    { nome: 'data_nascimento', label: 'Data de Nascimento' },
    { nome: 'genero', label: 'Gênero' },
    { nome: 'senha', label: 'Senha' },
    { nome: 'nome_mae', label: 'Nome da mãe' },
    { nome: 'nome_responsavel', label: 'Nome do responsável' },
    { nome: 'telefone_responsavel', label: 'Telefone do responsável' },
    { nome: 'email_responsavel', label: 'E-mail do responsável' },
  ];

  const vazio = obrigatorios.find(campo =>
    !pacientedados[campo.nome] || pacientedados[campo.nome].toString().trim() === ''
  );

  if (vazio) {
    Alert.alert("Atenção", `O campo "${vazio.label}" é obrigatório.`);
    return;
  }

  if (!cpfValido) {
    Alert.alert("Atenção", "CPF inválido. Por favor, verifique.");
    return;
  }

  if (!validator.isStrongPassword(senhaForca, { minUppercase: 0, minSymbols: 0 })) {
    Alert.alert("Atenção", "Senha fraca.");
    return;
  }

  if (pacientedados.senha !== confirmarSenha) {
    Alert.alert("Atenção", "As senhas não coincidem.");
    return;
  }

  if (
    !validator.isMobilePhone(pacientedados.telefone_responsavel, "pt-BR") ||
    pacientedados.telefone_responsavel.length !== 11
  ) {
    Alert.alert("Atenção", "Telefone inválido.");
    return;
  }

  if (!validator.isEmail(pacientedados.email_responsavel)) {
    Alert.alert("Atenção", "E-mail inválido.");
    return;
  }

  if (!aceitouTermos) {
    Alert.alert("Atenção", "Você precisa aceitar os Termos de Uso.");
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
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
      <Stack.Screen
        options={{
          title: 'Cadastro de pessoa com síndrome de Down',
          headerShadowVisible: true,
          headerTitle: ({ children: title }) => (
            <Text style={styles.headerCadastro} numberOfLines={2}>{title}</Text>
          ),
        }}
      />
      <KeyboardAwareScrollView contentContainerStyle={[styles.corEscura]} extraHeight={280}>
        <Modal
          visible={isModalVisible}
          backdropColor={"hsla(1 1 0/ 0.1)"}
          statusBarTranslucent={true}
          navigationBarTranslucent={true}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View style={{ height: 'fit-content', backgroundColor: 'white', alignItems: 'center', padding: 15, width: '90%', borderRadius: 5 }}>
              <Text style={{ fontFamily: 'Roboto', fontSize: 18, marginBottom: 5 }}>Atenção</Text>
              <Text style={{ fontFamily: "Roboto", lineHeight: 20, marginBottom: 10 }}>Esse cadastro se refere a pessoa com síndrome de Down, os dados dos responsáveis devem
                ser preenchidos apenas nos campos especificados.
              </Text>
              <View style={{ width: '50%' }}>
                <ButtonP label="Continuar" onPress={toggleModal}></ButtonP>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
  visible={isModalTermoVisible}
  transparent
  animationType="fade"
  statusBarTranslucent
  navigationBarTranslucent
>
  <View
    style={{
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        backgroundColor: 'white',
        width: '90%',
        maxHeight: '80%',
        borderRadius: 8,
        padding: 16,
      }}
    >
      <Text style={{ fontFamily: 'Roboto', fontSize: 18, marginBottom: 6 }}>
        Termos de Uso
      </Text>

      <Text style={{ fontFamily: 'Roboto', fontSize: 15, marginBottom: 12 }}>
        Antes de continuar, leia e aceite os documentos abaixo.
      </Text>

      <ScrollView
        style={{ flexGrow: 0 }}
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator
      >
        <Text
          style={{
            fontFamily: 'Roboto',
            lineHeight: 22,
            fontSize: 14,
          }}
        >
{`TERMO DE CONSENTIMENTO E POLÍTICA DE PRIVACIDADE

1. INTRODUÇÃO

Este Termo de Consentimento e Política de Privacidade tem como objetivo informar, de forma clara e transparente, como os dados pessoais e sensíveis são coletados, utilizados, armazenados e protegidos no aplicativo DownHora, em conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados – LGPD).

Ao utilizar o aplicativo, o RESPONSÁVEL LEGAL declara estar ciente e de acordo com os termos aqui descritos.

---

2. DADOS COLETADOS

O aplicativo realiza a coleta dos seguintes dados pessoais do usuário (pessoa com síndrome de Down):

2.1 Dados pessoais:

* Nome completo
* CPF
* Data de nascimento
* Gênero
* Nome da mãe

2.2 Dados do responsável legal:

* Nome completo
* Telefone
* E-mail

2.3 Dados sensíveis (saúde e desenvolvimento):

  2.3.1 Histórico médico:

  * Doenças relacionadas
  * Medicamentos em uso
  * Alergias
  * Tipo sanguíneo
  
  2.3.2 Consultas e exames realizados:

  * Exame de cariótipo
  * Triagem auditiva
  * Cardiologia
  * Pezinho
  * Oftalmologia
  * Fonoaudiologia
  * Odontologia
  * Endocrinologia
  * Fisioterapia
  * Terapia ocupacional
  * Psicopedagogia

2.4 Dados educacionais e de desenvolvimento:

* Escolaridade
* Unidade escolar
* Nível de autonomia de comunicação

---

3. FINALIDADE DO USO DOS DADOS

Os dados coletados são utilizados exclusivamente para:

* Organização e acompanhamento da saúde do usuário
* Registro de histórico médico e desenvolvimento
* Auxílio no acompanhamento por responsáveis e profissionais
* Melhorar a experiência e funcionalidades do aplicativo
* Garantir a segurança e identificação do usuário

---

4. BASE LEGAL PARA TRATAMENTO

O tratamento dos dados é realizado com base:

* No **consentimento do responsável legal**
* Na proteção da vida e da saúde do titular
* No cumprimento de obrigações legais e regulatórias

Dados sensíveis serão tratados com o máximo nível de proteção, conforme exigido pela LGPD.

---

5. COMPARTILHAMENTO DE DADOS

Os dados **não serão vendidos**.

Poderão ser compartilhados apenas quando necessário:

* Com profissionais de saúde autorizados pelo responsável
* Para cumprimento de obrigações legais
* Com serviços tecnológicos essenciais (ex: armazenamento em nuvem), sempre com proteção adequada

---

6. ARMAZENAMENTO E SEGURANÇA

Os dados são armazenados em ambiente seguro e protegidos por medidas técnicas e administrativas, incluindo:

* Criptografia
* Controle de acesso
* Proteção contra acessos não autorizados

---

7. DIREITOS DO TITULAR

Nos termos da LGPD, o responsável legal pode, a qualquer momento:

* Confirmar a existência de tratamento de dados
* Acessar os dados
* Corrigir dados incompletos ou desatualizados
* Solicitar a exclusão dos dados
* Revogar o consentimento

Solicitações podem ser feitas através do e-mail: downhorasuporte@gmail.com

---

8. CONSENTIMENTO

Ao aceitar este termo, o RESPONSÁVEL LEGAL declara que:

* Possui autoridade legal sobre o titular dos dados
* Autoriza o tratamento dos dados pessoais e sensíveis descritos
* Está ciente das finalidades e direitos previstos

---

9. REVOGAÇÃO

O consentimento pode ser revogado a qualquer momento, mediante solicitação, o que poderá implicar na interrupção dos serviços oferecidos pelo aplicativo.

---

10. ALTERAÇÕES DESTE TERMO

Este termo poderá ser atualizado a qualquer momento. O usuário será informado em caso de alterações relevantes.

---

11. CONTATO

Em caso de dúvidas ou solicitações relacionadas à privacidade:

E-mail: downhorasuporte@gmail.com
Responsável pelo tratamento de dados: `}
        </Text>
      </ScrollView>

      <Pressable
  onPress={() => {
    setAceitouTermos(!aceitouTermos);
    setErroAceiteTermos(false);
  }}
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  }}
>
  <View
    style={{
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: '#333',
      marginRight: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: aceitouTermos ? '#333' : 'transparent',
    }}
  >
    {aceitouTermos && (
      <Text style={{ color: 'white', fontSize: 14 }}>✓</Text>
    )}
  </View>

  <Text style={{ fontSize: 14 }}>
    Li e aceito a Política de Privacidade
  </Text>
</Pressable>

{erroAceiteTermos && (
  <Text style={{ color: 'red', marginTop: 6, fontSize: 13 }}>
    É necessário aceitar os Termos de Uso para continuar.
  </Text>
)}

      <View style={{ marginTop: 12 }}>
        <ButtonP label="Continuar" onPress={() => {
    if (!aceitouTermos) {
      setErroAceiteTermos(true);
      return;
    }

    setPacientedados(prev => ({
      ...prev,
      aceitou_termos: true,
      data_aceite_termos: new Date().toISOString(),
      versao_termos: '1.0',
    }));

    toggleModalTermo();
  }} />
      </View>
    </View>
  </View>
</Modal>

<Modal
  visible={isModalPrivacidadeVisible}
  transparent
  animationType="fade"
  statusBarTranslucent
  navigationBarTranslucent
>
  <View
    style={{
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        backgroundColor: 'white',
        width: '90%',
        maxHeight: '80%',
        borderRadius: 8,
        padding: 16,
      }}
    >
      <Text style={{ fontFamily: 'Roboto', fontSize: 18, marginBottom: 6 }}>
        Política de Privacidade
      </Text>

      <Text style={{ fontFamily: 'Roboto', fontSize: 15, marginBottom: 12 }}>
        Antes de continuar, leia e aceite os documentos abaixo.
      </Text>

      <ScrollView
        style={{ flexGrow: 0 }}
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator
      >
        <Text
          style={{
            fontFamily: 'Roboto',
            lineHeight: 22,
            fontSize: 14,
          }}
        >
{`POLÍTICA DE PRIVACIDADE

Última atualização: 15 de janeiro de 2026

Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos os dados pessoais dos usuários do aplicativo Downhora Botucatu, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD).

Ao utilizar o aplicativo, você concorda com as práticas descritas nesta Política.

DADOS COLETADOS

O aplicativo coleta apenas os dados necessários para o seu funcionamento adequado, podendo incluir:

Dados cadastrais:

Nome

Data de nascimento

CPF

Informações de contato (como telefone ou e-mail, quando aplicável)

Dados de saúde:

Informações médicas inseridas pelo próprio usuário

Exames, históricos médicos e dados relacionados à saúde

Dados técnicos:

Identificadores de autenticação

Informações necessárias para login e segurança da conta

Não coletamos cookies, dados de navegação web ou informações de rastreamento comportamental.

FINALIDADE DO USO DOS DADOS

Os dados coletados são utilizados exclusivamente para:

Identificação e autenticação do usuário

Funcionamento das funcionalidades do aplicativo

Armazenamento e organização de informações de saúde

Garantia de segurança, integridade e continuidade do serviço

Cumprimento de obrigações legais, quando aplicável

Não utilizamos os dados para fins publicitários ou de marketing.

BASE LEGAL PARA O TRATAMENTO DOS DADOS

O tratamento dos dados pessoais ocorre com base:

No consentimento do titular dos dados

Na execução dos serviços oferecidos pelo aplicativo

Na proteção da saúde, conforme previsto na LGPD

No cumprimento de obrigações legais

O consentimento é solicitado de forma clara no momento do cadastro.

COMPARTILHAMENTO DE DADOS

Os dados não são vendidos, alugados ou compartilhados com terceiros, exceto:

Quando necessário para o funcionamento técnico do aplicativo

Com provedores de infraestrutura e armazenamento de dados, como o Supabase

Quando exigido por obrigação legal ou ordem judicial

Todos os fornecedores utilizados seguem padrões adequados de segurança e proteção de dados.

ARMAZENAMENTO E SEGURANÇA DOS DADOS

Os dados são armazenados em ambiente seguro, utilizando medidas técnicas e organizacionais para protegê-los contra acessos não autorizados, perdas ou vazamentos.

Empregamos práticas de segurança como:

Autenticação segura

Controle de acesso

Criptografia quando aplicável

DIREITOS DO TITULAR DOS DADOS

Nos termos da LGPD, o usuário pode, a qualquer momento:

Confirmar a existência de tratamento de seus dados

Acessar seus dados pessoais

Solicitar correção de dados incompletos ou incorretos

Solicitar a exclusão dos dados, quando permitido por lei

Revogar o consentimento concedido

As solicitações podem ser feitas pelos canais de contato informados abaixo.

RETENÇÃO E EXCLUSÃO DOS DADOS

Os dados pessoais são mantidos apenas pelo tempo necessário para cumprir as finalidades descritas nesta Política ou conforme exigido por lei.

Quando solicitado pelo usuário, os dados poderão ser excluídos ou anonimizados, respeitando obrigações legais de retenção.

ALTERAÇÕES NESTA POLÍTICA

Esta Política de Privacidade pode ser atualizada periodicamente.
Sempre que houver alterações relevantes, a data de atualização será modificada e o usuário será informado quando necessário.

CONTATO

Em caso de dúvidas, solicitações ou exercício de direitos relacionados à proteção de dados, o usuário pode entrar em contato pelo e-mail:

DownHora@gmail.com

FIM DA POLÍTICA DE PRIVACIDADE
`}
        </Text>
      </ScrollView>

      {/* Checkbox */}
<Pressable
  onPress={() => {
    setAceitouPrivacidade(!aceitouPrivacidade);
    setErroAceitePrivacidade(false);
  }}
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  }}
>
  <View
    style={{
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: '#333',
      marginRight: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: aceitouPrivacidade ? '#333' : 'transparent',
    }}
  >
    {aceitouPrivacidade && (
      <Text style={{ color: 'white', fontSize: 14 }}>✓</Text>
    )}
  </View>

  <Text style={{ fontSize: 14 }}>
    Li e aceito a Política de Privacidade
  </Text>
</Pressable>

{erroAceitePrivacidade && (
  <Text style={{ color: 'red', marginTop: 6, fontSize: 13 }}>
    É necessário aceitar a Política de Privacidade para continuar.
  </Text>
)}

      <View style={{ marginTop: 12 }}>
        <ButtonP label="Continuar" onPress={() => {
    if (!aceitouPrivacidade) {
      setErroAceitePrivacidade(true);
      return;
    }

    setPacientedados(prev => ({
      ...prev,
      aceitou_privacidade: true,
      data_aceite_privacidade: new Date().toISOString(),
      versao_privacidade: '1.0',
    }));

    toggleModalPrivacidade();
  }} />
      </View>
    </View>
  </View>
</Modal>
        
        <View style={styles.container}>
          <View style={styles.containerForm}>
            <Text style={styles.subTitulo}>Dados pessoais (Passo 1 de 4)</Text>
            <View>
              <Text style={styles.textForm}>Nome completo</Text>
              <MyInput
                style={styles.input}
                placeholder='Ex: João Silva Santos'
                placeholderTextColor={'grey'}
                returnKeyType="next"
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, nome: text }))}
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
                returnKeyType="next"
                maxLength={14}
                value={cpf}
                placeholder='Ex: 123.456.789-01'
                placeholderTextColor={'grey'}
                onBlur={() => checkCpf(cpfUnmasked)}
                onSubmitEditing={() => ref_input5.current.focus()}
                onChangeText={(masked, unmasked) => {
                  setCpf(masked);
                  setCpfUnmasked(unmasked);
                  checkCpf(unmasked);
                  setPacientedados(prev => ({ ...prev, cpf: unmasked }));
                }}
              />
              {!cpfValido && <Text style={styles.textFormErro}>CPF inválido</Text>}
            </View>

            <View>
              <Text style={styles.textForm}>Data de nascimento</Text>
              <Pressable onPress={() => setShowNascimentoPicker(true)}>
                <View pointerEvents="none">
                  <MyInput
                    editable={false}
                    style={[styles.input, { color: dataNascimentoDisplay ? '#231F20' : 'grey' }]}
                  >
                    {dataNascimentoDisplay || 'Selecione a data'}
                  </MyInput>
                </View>
              </Pressable>

              {showNascimentoPicker && Platform.OS === 'android' && (
                <DateTimePicker
                  value={dataValor || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDataNascimentoChange}
                />
              )}

              {Platform.OS === 'ios' && (
                <Modal
                  transparent
                  visible={showNascimentoPicker}
                  animationType="slide"
                >
                  <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                    <View
                      style={{
                        backgroundColor: '#fff',
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
                        style={{ backgroundColor: '#fff' }}
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
                          setPacientedados(prev => ({
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
                onChange={item => {
                  setGenero(item.value);
                  setPacientedados(prev => ({ ...prev, genero: item.value }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Senha</Text>
              <MyInput
                ref={ref_input5}
                style={styles.input}
                placeholder='Digite uma senha segura'
                placeholderTextColor={'grey'}
                returnKeyType="next"
                onSubmitEditing={() => ref_input6.current.focus()}
                onChangeText={(text) => {
                  setSenhaForca(text);
                  setPacientedados(prev => ({ ...prev, senha: text }));
                }}
                secureTextEntry
              />
              {senhaForca !== '' && checkSenha()}
            </View>

            <View>
              <Text style={styles.textForm}>Confirmar senha</Text>
              <MyInput
                ref={ref_input6}
                style={styles.input}
                returnKeyType="next"
                placeholder='Digite novamente a senha'
                placeholderTextColor={'grey'}
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
                placeholder='Ex: Maria Silva Santos'
                returnKeyType="next"
                placeholderTextColor={'grey'}
                onSubmitEditing={() => ref_input8.current.focus()}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, nome_mae: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Nome do responsável</Text>
              <MyInput
                ref={ref_input8}
                style={styles.input}
                returnKeyType="next"
                placeholder='Ex: Maria Silva Santos'
                placeholderTextColor={'grey'}
                onSubmitEditing={() => ref_input9.current.focus()}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, nome_responsavel: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Telefone do responsável</Text>
              <MyMaskInput
                ref={ref_input9}
                style={styles.input}
                returnKeyType="next"
                placeholder='Ex: (12) 34567-8901'
                placeholderTextColor={'grey'}
                keyboardType="phone-pad"
                mask={Masks.BRL_PHONE}
                maxLength={15}
                value={telResp}
                onSubmitEditing={() => ref_input3.current.focus()}
                onChangeText={(masked, unmasked) => {
                  setTelResp(masked);
                  setTel(unmasked);
                  setPacientedados(prev => ({ ...prev, telefone_responsavel: unmasked }));
                }}
              />
              {tel !== '' && checkTel()}
            </View>

            <View>
              <Text style={styles.textForm}>E-mail do responsável</Text>
              <MyInput
                ref={ref_input3}
                style={styles.input}
                returnKeyType="next"
                autoComplete='email'
                keyboardType='email-address'
                placeholder='Ex: maria@gmail.com'
                placeholderTextColor={'grey'}
                onChangeText={(text) => {
                  setEmail(text);
                  setPacientedados(prev => ({ ...prev, email_responsavel: text }))
                }}
              />
              {email !== '' && checkEmail()}
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