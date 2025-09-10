import { useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FAB } from 'react-native-paper';
import { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonP from '@/components/ButtonP';
import styles from "./styleForms";
import { exameCad } from '../routes/rotas';

export default function Exames() {
  const { exame, data, medico, obs } = useLocalSearchParams();
  const [exames, setExames] = useState([]);

  // toda vez que vier novo exame via params, adiciona na lista
  useEffect(() => {
    if (exame || data || medico || obs) {
      setExames((prev) => [
        ...prev,
        { exame, data, medico, obs }
      ]);
    }
  }, [exame, data, medico, obs]);

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