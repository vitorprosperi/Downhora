import ButtonP from '@/components/ButtonP';
import { usePaciente } from '@/context/context';
import { useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaskInput from 'react-native-mask-input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buscarcep } from "../API Correios/endereco";
import { cadastropacTres } from "../routes/rotas";
import { unidades } from "../unidades/unidades";
import styles from './styleForms';

export default function CadastroPacDois() {

  const cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  const { setPacientedados } = usePaciente();

  const [loading, setLoading] = useState(false);
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [valor, setValor] = useState(null);
  const itens = unidades;

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
      <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280} enableOnAndroid={true}>
        <View style={styles.container}>
          <View style={styles.containerForm}>

            <View>
              <Text style={styles.titulo}>Cadastro de Pessoa com Sd. Down</Text>
              <Text style={styles.subTitulo}>Endereço</Text>
            </View>

            {/* Formulário */}
            <View>
              <Text style={styles.textForm}>CEP*</Text>
              <MaskInput
                style={styles.input}
                placeholder='ex: 18640-000'
                placeholderTextColor='grey'
                keyboardType="numeric"
                mask={cepMask}
                maxLength={9}
                value={cep}
                onChangeText={(masked, unmasked) => {
                  setCep(masked); // mostra formatado com traço
                  setPacientedados(prev => ({ ...prev, cep: unmasked })); // salva sem o traço
                }}
                onBlur={() =>
                  buscarcep(
                    cep.replace('-', ''), // 🔧 tira o traço antes de buscar
                    (rua) => {
                      setRua(rua);
                      setPacientedados(prev => ({ ...prev, rua }));
                    },
                    (bairro) => {
                      setBairro(bairro);
                      setPacientedados(prev => ({ ...prev, bairro }));
                    },
                    (cidade) => {
                      setCidade(cidade);
                      setPacientedados(prev => ({ ...prev, cidade }));
                    },
                    (estado) => {
                      setEstado(estado);
                      setPacientedados(prev => ({ ...prev, estado }));
                    },
                    setLoading
                  )
                }
              />

              {loading && <ActivityIndicator size="small" color="#0000ff" />}
            </View>
            <View>
              <Text style={styles.textForm}>Rua*</Text>
              <TextInput
                style={styles.input}
                value={rua}
                editable={!loading}
                onChangeText={(text) => {
                  setRua(text);
                  setPacientedados(prev => ({ ...prev, rua: text }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Estado*</Text>
              <TextInput
                style={styles.input}
                value={estado}
                onChangeText={(text) => {
                  setEstado(text);
                  setPacientedados(prev => ({ ...prev, estado: text }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Cidade*</Text>
              <TextInput
                style={styles.input}
                value={cidade}
                onChangeText={(text) => {
                  setCidade(text);
                  setPacientedados(prev => ({ ...prev, cidade: text }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Bairro*</Text>
              <TextInput
                style={styles.input}
                value={bairro}
                onChangeText={(text) => {
                  setBairro(text);
                  setPacientedados(prev => ({ ...prev, bairro: text }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Número*</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: 90'
                placeholderTextColor={'grey'}
                keyboardType="numeric"
                value={numero}
                onChangeText={(text) => {
                  setNumero(text);
                  setPacientedados(prev => ({ ...prev, numero: text }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Complemento</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: Apartamento 10'
                placeholderTextColor={'grey'}
                value={complemento}
                onChangeText={(text) => {
                  setComplemento(text);
                  setPacientedados(prev => ({ ...prev, complemento: text }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Unidade de Saúde*</Text>
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
                placeholder="Selecione a unidade"
                search
                searchPlaceholder="Pesquisar unidade"
                value={valor}
                onChange={item => {
                  setValor(item.value);
                  setPacientedados(prev => ({ ...prev, unidadeSaude: item.value }));
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 20, width: 200 }}>
            <ButtonP label="Próximo" onPress={cadastropacTres} />
          </View>


        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
