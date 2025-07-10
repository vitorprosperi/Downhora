import ButtonP from '@/components/ButtonP';
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from "react-native-paper";
import { cadastropacDois } from '../routes/rotas';
import styles from './style';

export default function CadastroPac() {
  //Variáveis para o funcionamento do dropdown
  const [valor, setValor] = useState(null);
  const [value, setValue] = useState(null);
  const itens = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
    { label: 'Outro', value: 'outro' },
  ];

  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={styles.container}>
        
        {/* View do formulário */}
          <View style={styles.containerForm}>
        
            <View>
              <Text style={styles.textForm}>Nome Completo*</Text>
              <TextInput style={styles.input} />
            </View>


            {/* Testando o scroll só, pode comentar ai qnd precisar. */}
            <View>
              <Text style={styles.textForm}>Nome Completo*</Text>
              <TextInput style={styles.input} />
            </View>
            <View>
              <Text style={styles.textForm}>Nome Completo*</Text>
              <TextInput style={styles.input} />
            </View>
            <View>
              <Text style={styles.textForm}>Nome Completo*</Text>
              <TextInput style={styles.input} />
            </View>
             <View>
              <Text style={styles.textForm}>Nome Completo*</Text>
              <TextInput style={styles.input} />
            </View>
             <View>
              <Text style={styles.textForm}>Nome Completo*</Text>
              <TextInput style={styles.input} />
            </View>
             <View>
              <Text style={styles.textForm}>Nome Completo*</Text>
              <TextInput style={styles.input} />
            </View>
            

            <View>
              <Text style={styles.textForm}>Data de Nascimento*</Text>
              <TextInput style={styles.input} />
            </View>

            <View>
            <Text style={styles.textForm}>Gênero*</Text>
            <Dropdown
                 style={{ borderWidth: 1, marginBottom: 8 }}
                 data={itens}
                 labelField="label"
                 valueField="value"
                 placeholder="Selecione"
                 value={value}
                 onChange={item => setValue(item.value)}         
             />
            </View>

            <View>
              <Text style={styles.textForm}>CPF*</Text>
              <TextInput style={styles.input} />
            </View>

            <View>
            <Text style={styles.textForm}>CNS*</Text>
            <TextInput style={styles.input} />
            </View>

            <View>
              <Text style={styles.textForm}>Nome da mãe*</Text>
              <TextInput style={styles.input} />
            </View>

            <View>
              <Text style={styles.textForm}>Nome do responsável*</Text>
              <TextInput style={styles.input} />
            </View>

            <View>
              <Text style={styles.textForm}>Telefone do responsável*</Text>
              <TextInput style={styles.input} />
            </View>

            <View>
              <Text style={styles.textForm}>E-mail do responsável*</Text>
              <TextInput style={styles.input} />
            </View>

            <View>
              <Text style={styles.textForm}>Nº do Prontuário*</Text>
              <TextInput style={styles.input} />
            </View>

            {/* View dos botões do prontuário */}
            <View style={{ marginBottom: 16 }}>
              <RadioButton.Group onValueChange={setValor} value={valor}>
                <RadioButton.Item label="UBS" value="UBS" />
                <RadioButton.Item label="Unesp" value="Unesp" />
              </RadioButton.Group>
            </View>

            <ButtonP label="Continuar" onPress={cadastropacDois}/>
            
          </View>
          
      </View>
      </ScrollView>
    
  );
}