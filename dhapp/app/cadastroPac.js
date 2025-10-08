import ButtonP from '@/components/ButtonP';
import { usePaciente } from '@/context/context';
import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaskInput from 'react-native-mask-input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cadastropacTres } from '../routes/rotas';
import styles from './styleForms';

export default function CadastroPac() {
  const { pacientedados, setPacientedados } = usePaciente();

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
      { nome: 'data_nascimento', label: 'Data de Nascimento' },
      { nome: 'genero', label: 'Gênero' },
      { nome: 'cpf', label: 'CPF' },
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
    cadastropacTres();
  }

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
      <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280} enableOnAndroid={true}>
        <View style={styles.container}>
          <View style={styles.containerForm}>

            <View>
              <Text style={styles.titulo}>Cadastro de Pessoa com Sd. Down</Text>
              <Text style={styles.subTitulo}>Dados pessoais</Text>
            </View>

            <View>
              <Text style={styles.textForm}>Nome Completo*</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: Rene Vitor França de Melo'
                placeholderTextColor={'grey'}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, nome: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Data de Nascimento*</Text>
              <MaskInput
                style={styles.input}
                keyboardType="numeric"
                mask={dateMask}
                maxLength={10}
                value={dataNascimento}
                placeholder='ex: 14/10/2021'
                placeholderTextColor={'grey'}
                onChangeText={(masked, unmasked) => {
                  setDataNascimento(masked);
                  setPacientedados(prev => ({ ...prev, data_nascimento: unmasked }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Gênero*</Text>
              <Dropdown
                style={styles.input}
                placeholderStyle={styles.exemplo}
                selectedTextStyle={styles.textForm}
                containerStyle={styles.dropdownContainer}
                itemTextStyle={styles.textForm}
                activeColor='#F5F5FF'
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
              <Text style={styles.textForm}>CPF*</Text>
              <MaskInput
                style={styles.input}
                keyboardType="numeric"
                mask={cpfMask}
                maxLength={14}
                value={cpf}
                placeholder='ex: 140.777.964-77'
                placeholderTextColor={'grey'}
                onChangeText={(masked, unmasked) => {
                  setCpf(masked);
                  setPacientedados(prev => ({ ...prev, cpf: unmasked }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Senha*</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: s&nh@Segur@123$'
                placeholderTextColor={'grey'}
                onChangeText={(text) => 
                  setPacientedados(prev => ({ ...prev, senha: text }))}
                secureTextEntry
              />
            </View>

            <View>
              <Text style={styles.textForm}>Confirmar senha*</Text>
              <TextInput
                style={styles.input}
                placeholder='Digite novamente a senha'
                placeholderTextColor={'grey'}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
              />
            </View>

            <View>
              <Text style={styles.textForm}>Nome da mãe*</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: Roseane França de Melo'
                placeholderTextColor={'grey'}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, nome_mae: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Nome do responsável*</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: Roseane França de Melo'
                placeholderTextColor={'grey'}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, nome_responsavel: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Telefone do responsável*</Text>
              <MaskInput
                style={styles.input}
                placeholder='ex: (14)12345-6789'
                placeholderTextColor={'grey'}
                keyboardType="phone-pad"
                mask={phoneMask}
                maxLength={15}
                value={telResp}
                onChangeText={(masked, unmasked) => {
                  setTelResp(masked);
                  setPacientedados(prev => ({ ...prev, telefone_responsavel: unmasked }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>E-mail do responsável*</Text>
              <TextInput
                style={styles.input}
                keyboardType='email-address'
                placeholder='ex: roseane@gmail.com'
                placeholderTextColor={'grey'}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, email_responsavel: text }))}
              />
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
