import ButtonP from '@/components/ButtonP';
import { usePaciente } from '@/context/context';
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RadioButton } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { cadastropacDois } from '../routes/rotas';


export default function CadastroPac() {

  const { pacientedados, setPacientedados } = usePaciente();

//Variáveis para o funcionamento do dropdown

  const [valor, setValor] = useState(null);

  const itens = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
    { label: 'Outro', value: 'outro' },
  ];
  
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
    <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280} enableOnAndroid={true}>
      
      <View style={styles.container}>
        {/* View do formulário */}
          <View style={styles.containerForm}>
        
            <View>
              <Text style={styles.textForm}>Nome Completo*</Text>
              <TextInput style={styles.input} 
              onChangeText={(text) => setPacientedados(prev => ({ ...prev, nome: text }))} />
            </View>

            <View>
              <Text style={styles.textForm}>Data de Nascimento*</Text>
              <TextInput style={styles.input}
               keyboardType="numeric"
               onChangeText={(text) => setPacientedados(prev => ({ ...prev, data: text }))} />
            </View>

            <View>
            <Text style={styles.textForm}>Gênero*</Text>
            <Dropdown
                style={styles.input}
                placeholderStyle={styles.textForm}
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
              <TextInput style={styles.input}
              keyboardType="numeric" 
              onChangeText={(text) => setPacientedados(prev => ({ ...prev, cpf: text }))} />
            </View>

            <View>
            <Text style={styles.textForm}>CNS*</Text>
            <TextInput style={styles.input}
            onChangeText={(text) => setPacientedados(prev => ({ ...prev, cns: text }))} />
            </View>

            <View>
              <Text style={styles.textForm}>Nome da mãe*</Text>
              <TextInput style={styles.input} 
              onChangeText={(text) => setPacientedados(prev => ({ ...prev, nomeMae: text }))} />
            </View>

            <View>
              <Text style={styles.textForm}>Nome do responsável*</Text>
              <TextInput style={styles.input}
              onChangeText={(text) => setPacientedados(prev => ({ ...prev, nomeResp: text }))} />
            </View>

            <View>
              <Text style={styles.textForm}>Telefone do responsável*</Text>
              <TextInput style={styles.input}
              keyboardType="numeric" 
              onChangeText={(text) => setPacientedados(prev => ({ ...prev, telResp: text }))} />
            </View>

            <View>
              <Text style={styles.textForm}>E-mail do responsável*</Text>
              <TextInput style={styles.input} 
              onChangeText={(text) => setPacientedados(prev => ({ ...prev, emailResp: text }))} />
            </View>

            <View>
              <Text style={styles.textForm}>Nº do Prontuário*</Text>
              <TextInput style={styles.input} onChangeText={text => handleChange('prontuario', text)} />
              <RadioButton.Group onValueChange={setValor} value={valor}>
                <RadioButton.Item uncheckedColor='#fff' color="#fff" labelStyle={styles.textForm} label="UBS" value="UBS" />
                <RadioButton.Item uncheckedColor='#fff' color="#fff" labelStyle={styles.textForm} label="Unesp" value="Unesp" />
              </RadioButton.Group>
            </View>

            {/* View dos botões do prontuário */}
            <ButtonP label="Próximo" onPress={cadastropacDois}/>
          </View>
          </View>
      
      </KeyboardAwareScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
    corEscura: {
      flexGrow: 1,
      backgroundColor: '#081221',
    },
    container: {
      flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#081221',
    },
    containerForm: {
        justifyContent: 'flex-start',
        gap: 10,
        width: '90%',
    },
    dropdownContainer: {
      backgroundColor: '#081221',
    },
    input: {
        backgroundColor: '#081221',
        color: '#fff',
        paddingVertical: 0,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 2,
        width: '100%',
        fontSize: 16,
        height: 35,
    },
    containerTeclado: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    textForm: {
        color: '#fff',
        fontSize: 16,
    },

})