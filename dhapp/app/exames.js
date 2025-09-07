import ButtonP from '@/components/ButtonP';
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { exameCad } from "../routes/rotas";
import styles from './styleForms';

export default function Exames() {

  //recuperando o parâmetro "exame" da tela exameCad
  const { exame } = useLocalSearchParams();
  const { data } = useLocalSearchParams();
  const { medico } = useLocalSearchParams();
  const { obs } = useLocalSearchParams();

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
        <View style={styles.telaInicio}>

          <View>
            <Text style={styles.titulo}>Exames Cadastrados</Text>
          </View>

          <ButtonP
            label={`Exame: ${exame}\nData: ${data}\nMédico: ${medico}\nObservações: ${obs}`} 
          />

         <FAB
            icon="plus"
            color="#FAFAFF"
            style={styles.fab}
            customSize={76}
            onPress={exameCad}
            mode="flat"
        />
        </View>
        </SafeAreaView>
  );
}