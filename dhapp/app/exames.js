<<<<<<< HEAD
import { View, Text } from "react-native";
import { FAB } from 'react-native-paper';
import styles from './styleForms';
import { exameCad } from "../routes/rotas";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from "expo-router";
import ButtonP from '@/components/ButtonP';
import { useEffect, useState } from "react";
=======
import { useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { exameCad } from "../routes/rotas";
import styles from './styleForms';
>>>>>>> 6fd4d96b025c11d8e13383f59707defdd568cc32

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
<<<<<<< HEAD
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
      <View style={styles.telaInicio}>
=======
    <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.corEscura, { alignItems: "center" }]}>
      <View style={styles.telaExames}>

>>>>>>> 6fd4d96b025c11d8e13383f59707defdd568cc32
        <View>
          <Text style={styles.titulo}>Exames Cadastrados</Text>
        </View>

<<<<<<< HEAD
        {/* Renderiza um botão para cada exame cadastrado */}
        {exames.map((item, index) => (
          <ButtonP
            key={index}
            label={`Exame: ${item.exame || ""}\nData: ${item.data || ""}\nMédico: ${item.medico || ""}\nObservações: ${item.obs || ""}`}
          />
        ))}

        <FAB
          icon="plus"
          style={styles.fab}
          customSize={76}
          onPress={exameCad}
=======
        <View style={cstyle.container}>
          <View style={cstyle.card}>
            <Pressable >
              <View>
                <Text style={cstyle.textoSecundario}>Dr. {medico}</Text>
              </View>
              <View style={cstyle.midBar}>
                <Text style={cstyle.textoPrincipal}>{exame}</Text>
                  <Text style={[cstyle.textoSecundario, {fontSize: 20}]}>{data}</Text>
              </View>
              <View>


                <Text>{obs}</Text>
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
>>>>>>> 6fd4d96b025c11d8e13383f59707defdd568cc32
        />
      </View>
    </SafeAreaView>
  );
}
<<<<<<< HEAD
=======

const cstyle = StyleSheet.create({
  card: {
    backgroundColor: 'hsla(216, 70%, 45%, 0.2)',
    borderRadius: 1,
    minWidth: '99%',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  midBar: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textoPrincipal: {
    fontSize: 21,
    fontWeight: 500,
    color: "#231F20",
  },
  textoSecundario: {
    color: 'hsla(345, 6%, 33%, 1)',
    fontSize: 17,
  }
})
>>>>>>> 6fd4d96b025c11d8e13383f59707defdd568cc32
