import * as React from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Collapsible from 'react-native-collapsible';
import { Icon } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";

export default function telaDesenvolvimento() {
  const [collapsedUmAno, setCollapsedUmAno] = React.useState(true);
  const [collapsedDoisAnos, setCollapsedDoisAnos] = React.useState(true);
  const [collapsedTresAnos, setCollapsedTresAnos] = React.useState(true);

  const [chevOne, setChevOne] = React.useState('chevron-right');
  const [chevTwo, setChevTwo] = React.useState('chevron-right');
  const [chevThree, setChevThree] = React.useState('chevron-right');

  const handleUmAno = () => {
    setCollapsedUmAno(!collapsedUmAno)
    if (chevOne == 'chevron-right') {
      setChevOne('chevron-down')
    } else {
      setChevOne('chevron-right')
    }
  };

  const handleDoisAnos = () => {
    setCollapsedDoisAnos(!collapsedDoisAnos)
    if (chevTwo == 'chevron-right') {
      setChevTwo('chevron-down')
    } else {
      setChevTwo('chevron-right')
    }
  };

  const handleTresAnos = () => {
    setCollapsedTresAnos(!collapsedTresAnos)
    if (chevThree == 'chevron-right') {
      setChevThree('chevron-down')
    } else {
      setChevThree('chevron-right')
    }
  };

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

        <Pressable onPress={() => handleUmAno()}>
          <View style={styles.titleCollapsible}>
            <Icon source={chevOne} size={18} color="#0066CC"></Icon>
            <Text style={styles.subTitulo}>Até 1 ano</Text>
          </View>
        </Pressable>
        <Collapsible collapsed={collapsedUmAno}>
          <View style={styles.contTextoCollap}>
            <View style={styles.bPoint}>
              <Text style={styles.text}>· </Text>
              <Text style={styles.text}><Text style={styles.textHeavy}>Sorriso social:</Text> entre 1,5 e 5 meses.</Text>
            </View>
            <View style={styles.bPoint}>
              <Text style={styles.text}>· </Text>
              <Text style={styles.text}><Text style={styles.textHeavy}>Sentar sozinho:</Text> pode acontecer a partir de 6 meses, mas pode levar até 2 anos e meio.</Text>
            </View>
            <View style={styles.bPoint}>
              <Text style={styles.text}>· </Text>
              <Text style={styles.text}><Text style={styles.textHeavy}>Engatinhar ou se deslocar:</Text> geralmente entre 8 meses e quase 2 anos.</Text>
            </View>
            <View style={styles.bPoint}>
              <Text style={styles.text}>· </Text>
              <Text style={styles.text}><Text style={styles.textHeavy}>Comer com os dedos:</Text> pode iniciar entre 10 meses e 2 anos.</Text>
            </View>
          </View>
        </Collapsible>

        <Pressable onPress={() => handleDoisAnos()}>
          <View style={styles.titleCollapsible}>
            <Icon source={chevTwo} size={18} color="#0066CC"></Icon>
            <Text style={[styles.subTitulo, { textAlign: 'left' }]}>De 1 a 3 anos</Text>
          </View>
        </Pressable>
        <Collapsible collapsed={collapsedDoisAnos}>
          <View style={styles.contTextoCollap}>
            <View style={styles.bPoint}>
              <Text style={styles.text}>· </Text>
              <Text style={styles.textHeavy}>Andar sem ajuda.</Text>
            </View>
            <View style={styles.bPoint}>
              <Text style={styles.text}>· </Text>
              <Text style={styles.textHeavy}>Beber no copo.</Text>
            </View>
            <View style={styles.bPoint}>
              <Text style={styles.text}>· </Text>
              <Text style={styles.textHeavy}>Usar colher.</Text>
            </View>
            <View style={styles.bPoint}>
              <Text style={styles.text}>· </Text>
              <Text style={styles.textHeavy}>Primeiras palavras.</Text>
            </View>
          </View>
        </Collapsible>

        <Pressable onPress={() => handleTresAnos()}>
          <View style={styles.titleCollapsible}>
            <Icon source={chevThree} size={18} color="#0066CC"></Icon>
            <Text style={[styles.subTitulo, { textAlign: 'left' }]}>A partir de 3 anos</Text>
          </View>
        </Pressable>
        <Collapsible collapsed={collapsedTresAnos}>
          <View style={styles.contTextoCollap}>
            <View style={styles.bPoint}>
              <Text style={styles.text}>· </Text>
              <Text style={styles.text}><Text style={styles.textHeavy}>Frases de duas palavras:</Text> podem aparecer a partir dos 2 anos, mas podem levar até 7 anos e meio.</Text>
            </View>
            <View style={styles.bPoint}>
              <Text style={styles.text}>· </Text>
              <Text style={styles.text}><Text style={styles.textHeavy}>Controle de esfíncteres (xixi e cocô):</Text> pode ocorrer em qualquer momento entre 2 e 7 anos.</Text>
            </View>
            <View style={styles.bPoint}>
              <Text style={styles.text}>· </Text>
              <Text style={styles.text}><Text style={styles.textHeavy}>Vestir-se com ajuda e começar a tentar sozinho:</Text> entre 3 anos e meio e 8 anos e meio.</Text>
            </View>
          </View>
        </Collapsible>

        <View style={styles.contTexto}>
          <Text style={styles.subTitulo}>Como estimular o desenvolvimento?</Text>
          <Text style={styles.text}>
            Planejar brincadeiras em grupo, contar histórias, desenhar e pintar, oferecer jogos simples de encaixe e memória,
            incentivar a participação da criança nas pequenas tarefas do dia a dia (guardar brinquedos, escolher roupas).
          </Text>
        </View>

        <View style={styles.contTexto}>
          <Text style={styles.subTitulo}>Dicas importantes</Text>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}><Text style={styles.textHeavy}></Text>Cada criança tem seu próprio ritmo, respeite o tempo dela.</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}><Text style={styles.textHeavy}></Text>Estimule com paciência, brincadeiras e carinho.</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}><Text style={styles.textHeavy}></Text>O acompanhamento com pediatra, fonoaudiólogo, fisioterapeuta e terapeuta ocupacional ajuda a favorecer o desenvolvimento.</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}><Text style={styles.textHeavy}></Text>Valorize sempre as conquistas do seu filho.</Text>
          </View>
        </View>

        <View style={styles.contTexto}>
          <Text style={styles.titleH2}>Referências:</Text>
          <Text style={styles.text}>National Down Syndrome Society (NDSS),</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://saut.org.sa/page-developmental-milestones%26lang%3DEnglish')}>
            <Text style={styles.textLinkRef}>Saut – The Voice of Down Syndrome Society,</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.growthcharts.com/')}>
            <Text style={styles.textLinkRef}>Growth Charts.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


// temporario
const styles = StyleSheet.create({
  bPoint: {
    flexDirection: 'row',
    paddingRight: 15,
    marginBottom: 3,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contTexto: {
    marginBottom: 5,
    paddingHorizontal: 15,
  },
  contTextoCollap: {
    marginBottom: 5,
    marginTop: -5,
    paddingHorizontal: 15,
  },
  contImg: {
    height: '100%',

  },
  cardTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  titleCollapsible: {
    //backgroundColor: 'hsla(216 70% 44.5% / 0.3)',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    width: '100%',
    alignSelf: 'center',
  },
  subTitulo: {
    fontSize: 18,
    lineHeight: 27,
    fontFamily: 'Roboto-500',
    color: '#231F20',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto-600',
    color: '#231F20',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  titleH2: {
    fontSize: 18,
    lineHeight: 27,
    fontFamily: 'Roboto-600',
    color: '#231F20',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#231F20',
    fontFamily: 'Roboto',
  },
  textCarro: {
    fontSize: 16,
    lineHeight: 24,
    color: 'back',
    fontFamily: 'Roboto',
  },
  blurCont: {
    marginTop: 'auto',
    paddingLeft: 5,
  },
  textHeavy: {
    fontSize: 16,
    lineHeight: 24,
    color: '#231F20',
    fontFamily: 'Roboto-500',
  },
  textLinkRef: {
    fontSize: 16,
    lineHeight: 24,
    color: '#0066CC',
    fontFamily: 'Roboto',
  },
});