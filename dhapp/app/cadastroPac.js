import ButtonP from '@/components/ButtonP';
import { MyDropdown } from '@/components/MyDropdown';
import { MyInput } from '@/components/MyInput';
import { MyMaskInput } from '@/components/MyMaskInput';
import { usePaciente } from '@/context/context';
import { useRef, useState } from "react";
import { Alert, Text, View } from "react-native";
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
  const dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
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
  const [cpf, setCpf] = useState('');
  const [telResp, setTelResp] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

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
      return;
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

  function checkSenha(){
    if (validator.isStrongPassword(senhaForca, {minUppercase: 0, minSymbols: 0})) {
      return;
    } else {
      return <Text style={styles.textFormErro}>Senha fraca</Text>;
    }
  }

  const ref_botao = useRef();
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
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
      <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280}>
        <View style={styles.container}>
          <View style={styles.containerForm}>

            <View>
              <Text style={styles.titulo}>Cadastro de pessoa com síndrome de Down</Text>
              <Text style={styles.subTitulo}>Dados pessoais</Text>
            </View>

            <View>
              <Text style={styles.textForm}>Nome completo*</Text>
              <MyInput
                style={styles.input}
                placeholder='Ex: Rene Vitor França de Melo'
                placeholderTextColor={'grey'}
                returnKeyType="next"
                submitBehavior='submit'
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, nome: text }))}
                onSubmitEditing={() => ref_input2.current.focus()}
              />
            </View>

            <View>
              <Text style={styles.textForm}>CPF*</Text>
              <MyMaskInput
                ref={ref_input2}
                style={styles.input}
                keyboardType="numeric"
                mask={cpfMask}
                maxLength={14}
                value={cpf}
                placeholder='Ex: 14077796477'
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
              <Text style={styles.textForm}>Data de nascimento*</Text>
              <MyMaskInput
                style={styles.input}
                keyboardType="numeric"
                mask={dateMask}
                returnKeyType="next"
                maxLength={10}
                value={dataNascimento}
                placeholder='Ex: 14/10/2021'
                placeholderTextColor={'grey'}
                ref={ref_input3}
                onChangeText={(masked, unmasked) => {
                  setDataNascimento(masked);
                  setPacientedados(prev => ({ ...prev, data_nascimento: unmasked }));
                }}
                onSubmitEditing={() => ref_inputGenero.current.open()}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Gênero*</Text>
              <MyDropdown
              ref={ref_inputGenero}
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
              <Text style={styles.textForm}>Senha*</Text>
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
                  setPacientedados(prev => ({ ...prev, senha: text }));}}
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
              <Text style={styles.textForm}>Confirmar senha*</Text>
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
              <Text style={styles.textForm}>Nome da mãe*</Text>
              <MyInput
                ref={ref_input6}
                style={styles.input}
                placeholder='Ex: Roseane França de Melo'
                placeholderTextColor={'grey'}
                returnKeyType="next"
                submitBehavior='submit'
                onSubmitEditing={() => ref_input7.current.focus()}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, nome_mae: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Nome do responsável*</Text>
              <MyInput
                ref={ref_input7}
                style={styles.input}
                placeholder='Ex: Roseane França de Melo'
                placeholderTextColor={'grey'}
                returnKeyType="next"
                submitBehavior='submit'
                onSubmitEditing={() => ref_input8.current.focus()}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, nome_responsavel: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Telefone do responsável*</Text>
              <MyMaskInput
                ref={ref_input8}
                style={styles.input}
                placeholder='Ex: 14123456789'
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
              <Text style={styles.textForm}>E-mail do responsável*</Text>
              <MyInput
                ref={ref_input9}
                style={styles.input}
                autoComplete='email'
                keyboardType='email-address'
                placeholder='Ex: roseane@gmail.com'
                placeholderTextColor={'grey'}
                onChangeText={(text) => { 
                  setEmail(text);
                  setPacientedados(prev => ({ ...prev, email_responsavel: text }))}}
              />
              {(email == '') ? (
                null
              ) : (
                checkEmail()
              )
              }
            </View>

          </View>
          <View ref={ref_botao} style={{ marginBottom: 10, marginTop: 10, width: 200 }}>
            <ButtonP label="Próximo" onPress={Proximo} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
