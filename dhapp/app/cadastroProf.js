import ButtonP from '@/components/ButtonP';
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfissional } from '@/context/context'; 
import { cadastroprofdois, proximoPasso } from '../routes/rotas'; 

export default function CadastroProfissional() {
  const { profissionaldados, setProfissionaldados } = useProfissional();

  const [valorGenero, setValorGenero] = useState(null);

  const generos = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
    { label: 'Outro', value: 'outro' },
  ];

  return (
    <KeyboardAwareScrollView extraHeight={280} enableOnAndroid={true}>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerForm}>
          
          <View>
            <Text style={styles.textForm}>Nome completo*</Text>
            <TextInput 
              style={styles.input}
              onChangeText={(text) => setProfissionaldados(prev => ({ ...prev, nomeCompleto: text }))}
            />
          </View>

          <View>
            <Text style={styles.textForm}>CPF* (Será o método de login)</Text>
            <TextInput 
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(text) => setProfissionaldados(prev => ({ ...prev, cpf: text }))}
            />
          </View>

          <View>
            <Text style={styles.textForm}>Nome social</Text>
            <TextInput 
              style={styles.input}
              onChangeText={(text) => setProfissionaldados(prev => ({ ...prev, nomeSocial: text }))}
            />
          </View>

          <View>
            <Text style={styles.textForm}>Data de nascimento</Text>
            <TextInput 
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(text) => setProfissionaldados(prev => ({ ...prev, dataNascimento: text }))}
            />
          </View>

          <View>
            <Text style={styles.textForm}>Gênero</Text>
            <Dropdown
              style={styles.input}
              placeholderStyle={styles.textForm}
              data={generos}
              labelField="label"
              valueField="value"
              placeholder="Selecione"
              value={valorGenero}
              onChange={item => {
                setValorGenero(item.value);
                setProfissionaldados(prev => ({ ...prev, genero: item.value }));
              }}
            />
          </View>

          <ButtonP label="Continuar" onPress={cadastroprofdois} />

        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
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
  textForm: {
    color: '#fff',
    fontSize: 16,
  },
});