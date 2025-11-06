import { ButtonP } from '@/components/ButtonP';
import { MyDropdown } from '@/components/MyDropdown';
import { MyInput } from '@/components/MyInput';
import { MyMaskInput } from '@/components/MyMaskInput';
import { usePaciente } from '@/context/context';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { Stack } from 'expo-router';
import { useRef, useState } from "react";
import { Alert, Platform, Pressable, Text, View } from "react-native";
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
  const [cpf, setCpf] = useState('');
  const [telResp, setTelResp] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [dataValor, setDataValor] = useState(null);

  const itensGenero = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
    { label: 'Outro', value: 'outro' },
  ];

  // Função para formatar a data em br
  const formatarParaBR = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
  };

  // Função para formatar a data em ISO
  const formatarParaISO = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  // Ao selecionar a data
  const handleDataNascimentoChange = (event, selectedDate) => {
    if (Platform.OS !== 'ios') setShowNascimentoPicker(false);
    if (selectedDate) {
      console.log(new Date(selectedDate).toString())
      setDataValor(selectedDate);
      const formattedDisplay = formatarParaBR(selectedDate);
      const formattedISO = formatarParaISO(selectedDate);

      setDataNascimentoDisplay(formattedDisplay)
      setPacientedados(prev => ({
        ...prev,
        data_nascimento: formattedISO // formato usado no Supabase/SQLite
      }));
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

    if (pacientedados.senha.length < 6) {
      Alert.alert("Atenção", "A senha deve ter mais que 6 caracteres.");
      return;
    }

    if (pacientedados.senha !== confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem. Por favor, verifique e tente novamente.");
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
                <View>
                  <MyInput editable={false} style={[styles.input, { color: dataNascimentoDisplay ? '#231F20' : 'grey' }]}>
                    {dataNascimentoDisplay || 'Selecione a data'}
                  </MyInput>
                </View>
              </Pressable>

              {showNascimentoPicker && (
                <DateTimePicker
                  value={dataNascimentoDisplay
                    ? new Date(dataValor)
                    : new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'compact' : 'default'}
                  design='material'
                  timeZoneName='UTC'
                  onChange={handleDataNascimentoChange}
                />
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