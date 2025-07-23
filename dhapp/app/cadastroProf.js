import ButtonP from '@/components/ButtonP';
import { useProfissional } from '@/context/context';
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cadastroprofdois } from '../routes/rotas';
import styles from './styleForms';

export default function CadastroProfissional() {
  const { profissionaldados, setProfissionaldados } = useProfissional();

  const [valorGenero, setValorGenero] = useState(null);

  const generos = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
    { label: 'Outro', value: 'outro' },
  ];

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
      <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={281} enableOnAndroid={true}>
        <View style={styles.container}>
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
                selectedTextStyle={styles.textForm}
                containerStyle={styles.dropdownContainer}
                itemTextStyle={styles.textForm}
                activeColor='#081221'
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
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

