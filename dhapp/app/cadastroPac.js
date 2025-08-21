import ButtonP from '@/components/ButtonP';
import { usePaciente } from '@/context/context';
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaskInput from 'react-native-mask-input';
import { RadioButton } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { cadastropacDois } from '../routes/rotas';
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
  const [unidade, setUnidade] = useState(null);

  const itensGenero = [
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
                placeholder='ex: 14/10/2001'
                placeholderTextColor={'grey'}
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
              <Text style={styles.textForm}>CNS*</Text>
              <TextInput
                style={styles.input}
                placeholder=''
                placeholderTextColor={'grey'}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, cns: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Nome da mãe*</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: Roseane França de Melo'
                placeholderTextColor={'grey'}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, nomeMae: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Nome do responsável*</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: Roseane França de Melo'
                placeholderTextColor={'grey'}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, nomeResp: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Telefone do responsável*</Text>
              <MaskInput
                style={styles.input}
                placeholder='ex: (14)12345-6789'
                placeholderTextColor={'grey'}
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
                placeholderTextColor={'grey'}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, emailResp: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Nº do Prontuário*</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: '
                placeholderTextColor={'grey'}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, prontuario: text }))}
              />
              <RadioButton.Group
                onValueChange={value => {
                  setUnidade(value);
                  setPacientedados(prev => ({ ...prev, unidade: value }));
                }}
                value={unidade}
              >
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
