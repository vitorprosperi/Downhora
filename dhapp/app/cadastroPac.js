import ButtonP from '@/components/ButtonP';
import { usePaciente } from '@/context/context';
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RadioButton } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { cadastropacDois } from '../routes/rotas';
import MaskInput from 'react-native-mask-input'; // Importação do MaskInput
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

  //Variáveis para o funcionamento do dropdown
  const [valor, setValor] = useState(null);

  const itens = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
    { label: 'Outro', value: 'outro' },
  ];

  // Estados para os campos mascarados
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [telResp, setTelResp] = useState('');

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
      <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280} enableOnAndroid={true}>
        <View style={styles.container}>
          <View style={styles.containerForm}>

            <View>
              <Text style={styles.titulo}>Cadastro de Pessoa com Sd. Down</Text>
              <Text style={styles.subTitulo}>Dados pessoais</Text>
            </View>

            <Text style={styles.textoPequeno}>Campos com * são obrigatórios</Text>

            <View>
              <Text style={styles.textForm}>Nome Completo*</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: Rene Vitor França de Melo'
                placeholderTextColor={'lightgrey'}
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
                placeholder='ex: 14/10/2001'
                placeholderTextColor={'lightgrey'}
                onChangeText={(masked, unmasked) => {
                  setDataNascimento(masked);
                  setPacientedados(prev => ({ ...prev, data: unmasked }));
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
                activeColor='#081221'
                data={itens}
                labelField="label"
                valueField="value"
                placeholder="Selecione"
                value={valor}
                onChange={item => {
                  setValor(item.value);
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
                placeholderTextColor={'lightgrey'}
                onChangeText={(masked, unmasked) => {
                  setCpf(masked);
                  setPacientedados(prev => ({ ...prev, cpf: unmasked }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>CNS*</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: pesqusiar amanha'
                placeholderTextColor={'lightgrey'}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, cns: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Nome da mãe*</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: Roseane França de Melo'
                placeholderTextColor={'lightgrey'}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, nomeMae: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Nome do responsável*</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: Roseane França de Melo'
                placeholderTextColor={'lightgrey'}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, nomeResp: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Telefone do responsável*</Text>
              <MaskInput
                style={styles.input}
                placeholder='ex: 14999999999'
                placeholderTextColor={'lightgrey'}
                keyboardType="numeric"
                mask={phoneMask}
                maxLength={15}
                value={telResp}
                onChangeText={(masked, unmasked) => {
                  setTelResp(masked);
                  setPacientedados(prev => ({ ...prev, telResp: unmasked }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>E-mail do responsável*</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: roseane@gmail.com'
                placeholderTextColor={'lightgrey'}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, emailResp: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Nº do Prontuário*</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: pesquiasr amanha'
                placeholderTextColor={'lightgrey'}
                onChangeText={text => handleChange('prontuario', text)}
              />
              <RadioButton.Group onValueChange={setValor} value={valor}>
                <RadioButton.Item uncheckedColor='#fff' color="#fff" labelStyle={styles.textForm} label="UBS" value="UBS" />
                <RadioButton.Item uncheckedColor='#fff' color="#fff" labelStyle={styles.textForm} label="Unesp" value="Unesp" />
              </RadioButton.Group>
            </View>

          </View>
          <View style={{ marginBottom: 20, width: 200 }}>
            <ButtonP label="Próximo" onPress={cadastropacDois} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>

  );
}
