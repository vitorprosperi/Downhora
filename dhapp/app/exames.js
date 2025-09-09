import { useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
    <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.corEscura, {alignItems: "center"}]}>
      <View style={styles.telaExames}>

        <View>
          <Text style={styles.titulo}>Exames Cadastrados</Text>
        </View>

        <View style={cstyle.container}>
          <View style={cstyle.card}>
            <Pressable >
              <View>
                <Text>Médico: {medico}</Text>
              </View>
              <View>
                <Text>Exame: {exame}</Text>
              </View>
              <View style={cstyle.bottomBar}>
                
                <Text>Data: {data}</Text>
                <Text>Observações: {obs}</Text>
              </View>
            </Pressable>
          </View>
          <View style={cstyle.card}>
            <Pressable >
              <View>
                <Text>Médico: {medico}</Text>
              </View>
              <View>
                <Text>Exame: {exame}</Text>
              </View>
              <View style={cstyle.bottomBar}>
                
                <Text>Data: {data}</Text>
                <Text>Observações: {obs}</Text>
              </View>
            </Pressable>
          </View>
        </View>

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

const cstyle = StyleSheet.create({
  card: {
    backgroundColor: 'hsla(216, 70%, 45%, 0.3)',
    borderRadius: 2,
    minWidth: '100%',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
  }
})