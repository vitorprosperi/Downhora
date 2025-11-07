import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function telaDesenvolvimento() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.cardTitle}>
        <Text style={styles.title}>Desenvolvimento da criança com síndrome de Down</Text>
        </View>
        <View style={styles.contTexto}>
          <Text style={styles.text}>
            Toda criança com Síndrome de Down tem seu próprio ritmo de desenvolvimento.
            Todos os marcos de desenvolvimento vão acontecer na vida da criança com síndrome de Down.
            O importante é acompanhar as conquistas, estimular no dia a dia e contar com o apoio de profissionais de saúde.
          </Text>
        </View>
        <View style={styles.contTexto}>
          <View style={styles.cardPar}>
          <Text style={[styles.title, {textAlign: 'left'}]}>Até 1 ano</Text>
          </View>
          <Text style={styles.text}><Text style={styles.textHeavy}> · Sorriso social:</Text> entre 1,5 e 5 meses.</Text>
          <Text style={styles.text}><Text style={styles.textHeavy}> · Sentar sozinho:</Text> pode acontecer a partir de 6 meses, mas pode levar até 2 anos e meio.</Text>
          <Text style={styles.text}><Text style={styles.textHeavy}> · Engatinhar ou se deslocar:</Text> geralmente entre 8 meses e quase 2 anos.</Text>
          <Text style={styles.text}><Text style={styles.textHeavy}> · Comer com os dedos:</Text> pode iniciar entre 10 meses e 2 anos.</Text>
        </View>
        <View style={styles.contTexto}>
          <View style={styles.cardImpar}>
          <Text style={[styles.title, {textAlign: 'left'}]}>De 1 a 3 anos</Text>
          </View>
          <Text style={styles.textHeavy}> · Andar sem ajuda.</Text>
          <Text style={styles.textHeavy}> · Beber no copo.</Text>
          <Text style={styles.textHeavy}> · Usar colher.</Text>
          <Text style={styles.textHeavy}> · Primeiras palavras.</Text>
        </View>
        <View style={styles.contTexto}>
          <View style={styles.cardPar}>
          <Text style={[styles.title, {textAlign: 'left'}]}>A partir de 3 anos</Text>
                    </View>
          <Text style={styles.text}><Text style={styles.textHeavy}> · Frases de duas palavras:</Text> podem aparecer a partir dos 2 anos, mas podem levar até 7 anos e meio.</Text>
          <Text style={styles.text}><Text style={styles.textHeavy}> · Controle de esfíncteres (xixi e cocô):</Text> pode ocorrer em qualquer momento entre 2 e 7 anos.</Text>
          <Text style={styles.text}><Text style={styles.textHeavy}> · Vestir-se com ajuda e começar a tentar sozinho:</Text> entre 3 anos e meio e 8 anos e meio.</Text>
        </View>
        <View style={styles.contTexto}>
          <Text style={styles.subTitulo}>Como estimular o desenvolvimento?</Text>
          <Text style={styles.text}>
             Planejar brincadeiras em grupo, contar histórias, desenhar e pintar, oferecer jogos simples de encaixe e memória,
            incentivar a participação da criança nas pequenas tarefas do dia a dia (guardar brinquedos, escolher roupas).
          </Text>
        </View>
        <View style={styles.contTexto}>
          <Text style={styles.subTitulo}>Dicas importantes</Text>
          <Text style={styles.text}><Text style={styles.textHeavy}>·</Text> Cada criança tem seu próprio ritmo, respeite o tempo dela.</Text>
          <Text style={styles.text}><Text style={styles.textHeavy}>·</Text> Estimule com paciência, brincadeiras e carinho.</Text>
          <Text style={styles.text}><Text style={styles.textHeavy}>·</Text> O acompanhamento com pediatra, fonoaudiólogo, fisioterapeuta e terapeuta ocupacional ajuda a favorecer o desenvolvimento.</Text>
          <Text style={styles.text}><Text style={styles.textHeavy}>·</Text> Valorize sempre as conquistas do seu filho.</Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.textPequenoTitulo}>Referências:</Text>
          <Text style={styles.textPequeno}>National Down Syndrome Society (NDSS) e parceiros (como
            <TouchableOpacity onPress={() => Linking.openURL('https://saut.org.sa/page-developmental-milestones%26lang%3DEnglish')}>
              <Text style={styles.textLinkRef}>
                Saut – The Voice of Down Syndrome Society
              </Text>
            </TouchableOpacity>).
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.growthcharts.com/')}>
            <Text style={styles.textLinkRef}>
              https://www.growthcharts.com/
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


// temporario
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFF',
  },
  contTexto: {
    marginBottom: 10,
  },
  cardTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
    cardImpar: {
    backgroundColor: 'hsla(216 70% 44.5% / 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  cardPar: {
    backgroundColor: 'hsla(42 93.6% 49% / 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  scrollView: {
    flexGrow: 1,
    width: '95%',
    alignSelf: 'center',
  },
  subTitulo: {
    fontSize: 16,
   fontFamily: 'Raleway-700',
  },
  title: {
    fontSize: 19,
    fontFamily: 'Raleway-700',
    color: '#231F20',
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    color: '#231F20',
    fontFamily: 'Roboto',
  },
  textHeavy: {
    fontSize: 16,
    color: '#231F20',
    fontFamily: 'Roboto-500',
  },
  textPequeno: {
    fontSize: 14,
    color: '#231F20',
    fontFamily: 'Roboto',
  },
  textPequenoTitulo: {
    fontSize: 14,
    color: '#231F20',
    fontFamily: 'Raleway-500',
  },
  textLinkRef: {
    fontSize: 13,
    color: 'blue',
    fontFamily: 'Roboto',
  },
});