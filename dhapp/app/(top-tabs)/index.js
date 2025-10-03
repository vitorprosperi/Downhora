import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function telaDesenvolvimento() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desenvolvimento da criança com Síndrome de Down</Text>
      <View>
        <Text>
          Toda criança com Síndrome de Down tem seu próprio ritmo de desenvolvimento.
          Os marcos como sentar, andar e falar, acontecem na mesma ordem que em outras crianças, mas podem levar mais tempo.
          O importante é acompanhar as conquistas, estimular no dia a dia e contar com o apoio de profissionais de saúde.
        </Text>
      </View>
      <View>
        <Text>Até 1 ano</Text>
        <Text>Sorriso social: entre 1,5 e 5 meses</Text>
        <Text>Sentar sozinho: pode acontecer a partir de 6 meses, mas pode levar até 2 anos e meio.</Text>
        <Text>Engatinhar ou se deslocar: geralmente entre 8 meses e quase 2 anos.</Text>
        <Text>Comer com os dedos (finger feeding): pode iniciar entre 10 meses e 2 anos.</Text>
      </View>
      <View>
        <Text>De 1 a 3 anos</Text>
        <Text>Andar sem ajuda: entre 1 e 4 anos.</Text>
        <Text>Beber no copo: entre 1 e 3 anos.</Text>
        <Text>Usar colher: geralmente entre 1 ano e 3 anos e meio.</Text>
        <Text>Primeiras palavras: podem surgir entre 1 e 4 anos.</Text>
      </View>
      <View>
        <Text>De 3 a 5 anos</Text>
        <Text>Frases de duas palavras: podem aparecer a partir dos 2 anos, mas podem levar até 7 anos e meio.</Text>
        <Text>Controle de esfíncteres (xixi e cocô): pode ocorrer em qualquer momento entre 2 e 7 anos.</Text>
        <Text>Vestir-se com ajuda e começar a tentar sozinho: entre 3 anos e meio e 8 anos e meio.</Text>
      </View>
      <View>
        <Text>
          Como estimular o desenvolvimento: planejar brincadeiras em grupo, contar histórias, desenhar e pintar, oferecer jogos simples de encaixe e memória,
          incentivar a participação da criança nas pequenas tarefas do dia a dia (guardar brinquedos, escolher roupas).
        </Text>
      </View>
      <View>
        <Text>Dicas importantes</Text>
        <Text>Cada criança tem seu próprio ritmo, respeite o tempo dela.</Text>
        <Text>Estimule com paciência, brincadeiras e carinho.</Text>
        <Text>O acompanhamento com pediatra, fonoaudiólogo, fisioterapeuta e terapeuta ocupacional ajuda a favorecer o desenvolvimento.</Text>
        <Text>Valorize sempre as conquistas do seu filho.</Text>
      </View>
      <View>
        <Text>Referências:</Text>
        <Text>National Down Syndrome Society (NDSS) e parceiros (como
          <TouchableOpacity onPress={() => Linking.openURL('https://saut.org.sa/page-developmental-milestones%26lang%3DEnglish')}>
            <Text style={{ color: 'blue' }}>
              Saut – The Voice of Down Syndrome Society
            </Text>
          </TouchableOpacity>).
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.growthcharts.com/')}>
          <Text style={{ color: 'blue' }}>
            https://www.growthcharts.com/
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


// temporario
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});