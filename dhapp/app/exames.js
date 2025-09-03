import { View, Text} from "react-native";
import { FAB } from 'react-native-paper';
import styles from './styleForms';
import { exameCad } from "../routes/rotas";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from "expo-router";
import ButtonP from '@/components/ButtonP';

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
            style={styles.fab}
            customSize={76}
            onPress={exameCad}
        />
        </View>
        </SafeAreaView>
  );
}