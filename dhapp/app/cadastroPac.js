import { ButtonP } from '@/components/ButtonP';
import { MyDropdown } from '@/components/MyDropdown';
import { MyInput } from '@/components/MyInput';
import { MyMaskInput } from '@/components/MyMaskInput';
import { usePaciente } from '@/context/context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack } from 'expo-router';
import { useRef, useState } from "react";
import { Alert, Platform, Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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

  // Máscaras
  const cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  const phoneMask = [
    '(', /\d/, /\d/, ')', ' ',
    /\d/, /\d/, /\d/, /\d/, /\d/, '-',
    /\d/, /\d/, /\d/, /\d/
  ];

  // Estados separados
  const [genero, setGenero] = useState(null);

  const itensGenero = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
    { label: 'Outro', value: 'outro' },
  ];

  // Estados para os campos mascarados
  const [dataNascimento, setDataNascimento] = useState('');
  const [showNascimentoPicker, setShowNascimentoPicker] = useState(false);
  const [cpf, setCpf] = useState('');
  const [telResp, setTelResp] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Função para formatar a data selecionada
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Função para renderizar o DateTimePicker
  const renderNascimentoPicker = () => (
    <>
      <Pressable onPress={() => setShowNascimentoPicker(true)}> <View style={styles.input}>
        <Text style={{ color: dataNascimento ? 'black' : 'grey' }}>
          {dataNascimento || 'Selecione a data'} </Text> </View> </Pressable>
      {showNascimentoPicker && (
        <DateTimePicker
          value={dataNascimento ? new Date(dataNascimento.split('/').reverse().join('-')) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
          onChange={(event, selectedDate) => {
            if (Platform.OS !== 'ios') setShowNascimentoPicker(false);
            if (selectedDate) {
              const formatted = formatDate(selectedDate);
              setDataNascimento(formatted);
              setPacientedados(prev => ({ ...prev, data_nascimento: formatted }));
            }
          }}
        />
      )}
    </>
  );

  function Proximo() {
    // Lista de campos obrigatórios
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


    // Verifica se algum campo obrigatório está vazio
    const vazio = obrigatorios.find(campo => !pacientedados[campo.nome] || pacientedados[campo.nome].toString().trim() === '');

    if (vazio) {
      Alert.alert("Atenção", `O campo "${vazio.label}" é obrigatório.`);
      return false;
    }

    // temporario, mudar depois p uma funcao que onchange/onblur da senha ja avise o problema
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

  function checkEmail() {
    if (validator.isEmail(email)) {
      return;
    } else {
      return <Text style={styles.textFormErro}>Email inválido</Text>;
    }
  }

  function checkTel() {
    if (validator.isMobilePhone(tel, "pt-BR") && tel.length == 11) {
      return;
    } else {
      return <Text style={styles.textFormErro}>Número inválido</Text>;
    }
  }

  const validateCpf = require('validar-cpf');

  function checkCpf() {
    if (validateCpf(cpfUnmasked)) {
      return;
    } else {
      return <Text style={styles.textFormErro}>CPF inválido</Text>;
    }
  }

  function checkSenha() {
    if (validator.isStrongPassword(senhaForca, { minUppercase: 0, minSymbols: 0 })) {
      return;
    } else {
      return <Text style={styles.textFormErro}>Senha fraca</Text>;
    }
  }

  const ref_inputGenero = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();
  const ref_input8 = useRef();
  const ref_input9 = useRef();

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.corEscura]}>
      <Stack.Screen
        options={{
          title: 'Cadastro de pessoa com síndrome de Down',
          headerShadowVisible: true,
          headerTitle: ({ children: title }) => {
            return (<Text style={styles.headerCadastro} numberOfLines={2}>{title}</Text>
            )
          },
        }}
      />
      <KeyboardAwareScrollView contentContainerStyle={[styles.corEscura, { backgroundColor: 'orange' }]} extraHeight={280}>
        <View style={styles.container}>
          <View style={styles.containerForm}>

            <View>
              <Text style={styles.subTitulo}>Dados pessoais (Passo 1 de 4)</Text>
            </View>

            <View>
              <Text style={styles.textForm}>Nome completo</Text>
              <MyInput
                style={styles.input}
                placeholder='Ex: João Silva Santos'
                placeholderTextColor={'grey'}
                returnKeyType="next"
                submitBehavior='submit'
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
                mask={cpfMask}
                maxLength={14}
                value={cpf}
                autoComplete='off'
                placeholder='Ex: 123.456.789-01'
                placeholderTextColor={'grey'}
                onSubmitEditing={() => ref_input3.current.focus()}
                returnKeyType="next"
                submitBehavior='submit'
                onChangeText={(masked, unmasked) => {
                  setCpf(masked);
                  setCpfUnmasked(unmasked);
                  setPacientedados(prev => ({ ...prev, cpf: unmasked }));
                }}
              />

              {(cpfUnmasked == '') ? (
                null
              ) : (
                checkCpf()
              )
              }
            </View>

            <View>
              <Text style={styles.textForm}>Data de nascimento</Text>
              <Pressable onPress={() => setShowNascimentoPicker(true)}>
                <View style={styles.input}>
                  <Text style={{ color: dataNascimento ? 'black' : 'grey' }}>
                    {dataNascimento || 'Selecione a data'}
                  </Text>
                </View>
              </Pressable>

              {showNascimentoPicker && (
                <DateTimePicker
                  value={
                    dataNascimento
                      ? new Date(dataNascimento.split('/').reverse().join('-'))
                      : new Date()
                  }
                  mode="date"
                  display={Platform.OS === 'ios' ? 'compact' : 'calendar'}
                  onChange={(event, selectedDate) => {
                    if (Platform.OS !== 'ios') setShowNascimentoPicker(false);
                    if (selectedDate) {
                      const d = new Date(selectedDate);
                      const day = d.getDate().toString().padStart(2, '0');
                      const month = (d.getMonth() + 1).toString().padStart(2, '0');
                      const year = d.getFullYear();
                      const formatted = `${day}/${month}/${year}`;
                      setDataNascimento(formatted);
                      setPacientedados(prev => ({
                        ...prev,
                        data_nascimento: formatted
                      }));
                    }
                  }}
                />
              )}
            </View>

            <View>
              <Text style={styles.textForm}>Gênero</Text>
              <MyDropdown
                ref={ref_inputGenero}
                data={itensGenero}
                labelField="label"
                valueField="value"
                placeholder="Selecione"
                value={genero}
                dropdownPosition='bottom'
                onChange={item => {
                  setGenero(item.value);
                  setPacientedados(prev => ({ ...prev, genero: item.value }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Senha</Text>
              <MyInput
                ref={ref_input4}
                style={styles.input}
                placeholder='Digite uma senha segura'
                placeholderTextColor={'grey'}
                returnKeyType="next"
                submitBehavior='submit'
                onSubmitEditing={() => ref_input5.current.focus()}
                onChangeText={(text) => {
                  setSenhaForca(text);
                  setPacientedados(prev => ({ ...prev, senha: text }));
                }}
                secureTextEntry
              />
              {(senhaForca == '') ? (
                null
              ) : (
                checkSenha()
              )
              }
            </View>

            <View>
              <Text style={styles.textForm}>Confirmar senha</Text>
              <MyInput
                ref={ref_input5}
                style={styles.input}
                placeholder='Digite novamente a senha'
                placeholderTextColor={'grey'}
                value={confirmarSenha}
                returnKeyType="next"
                submitBehavior='submit'
                onSubmitEditing={() => ref_input6.current.focus()}
                onChangeText={setConfirmarSenha}
                secureTextEntry
              />
            </View>

            <View>
              <Text style={styles.textForm}>Nome da mãe</Text>
              <MyInput
                ref={ref_input6}
                style={styles.input}
                placeholder='Ex: Maria Silva Santos'
                placeholderTextColor={'grey'}
                returnKeyType="next"
                submitBehavior='submit'
                onSubmitEditing={() => ref_input7.current.focus()}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, nome_mae: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Nome do responsável</Text>
              <MyInput
                ref={ref_input7}
                style={styles.input}
                placeholder='Ex: Maria Silva Santos'
                placeholderTextColor={'grey'}
                returnKeyType="next"
                submitBehavior='submit'
                onSubmitEditing={() => ref_input8.current.focus()}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, nome_responsavel: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Telefone do responsável</Text>
              <MyMaskInput
                ref={ref_input8}
                style={styles.input}
                placeholder='Ex: (12) 34567-8901'
                placeholderTextColor={'grey'}
                keyboardType="phone-pad"
                mask={phoneMask}
                maxLength={15}
                value={telResp}
                returnKeyType="next"
                submitBehavior='submit'
                onSubmitEditing={() => ref_input9.current.focus()}
                onChangeText={(masked, unmasked) => {
                  setTelResp(masked);
                  setTel(unmasked);
                  setPacientedados(prev => ({ ...prev, telefone_responsavel: unmasked }));
                }}
              />


              {(tel == '') ? (
                null
              ) : (
                checkTel()
              )
              }
            </View>

            <View>
              <Text style={styles.textForm}>E-mail do responsável</Text>
              <MyInput
                ref={ref_input9}
                style={styles.input}
                autoComplete='email'
                keyboardType='email-address'
                placeholder='Ex: maria@gmail.com'
                placeholderTextColor={'grey'}
                onChangeText={(text) => {
                  setEmail(text);
                  setPacientedados(prev => ({ ...prev, email_responsavel: text }))
                }}
              />
              {(email == '') ? (
                null
              ) : (
                checkEmail()
              )
              }
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