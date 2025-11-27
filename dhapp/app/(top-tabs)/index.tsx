import { BlurView } from 'expo-blur';
import * as React from "react";
import { Dimensions, ImageBackground, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { SafeAreaView } from "react-native-safe-area-context";

const data = [...new Array(3).keys()];
const width = Dimensions.get("window").width;

export default function telaDesenvolvimento() {

  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
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
        <View>
        <View style={{flexDirection: 'row'}}>
        <Carousel
        ref={ref}
          height={500}
          width={width - 20}
          data={data}
          onProgressChange={progress}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                backgroundColor: 'white'
              }}
            >
              {
                index == 0 ? (
                  <ImageBackground style={styles.contImg}>
                    <BlurView experimentalBlurMethod='dimezisBlurView' intensity={90} tint='extraLight' style={styles.blurCont}>
                      <Text style={styles.titleCar}>Até 1 ano</Text>
                      <Text style={styles.textCarro}><Text style={styles.textHeavyCar}>Sorriso social:</Text> entre 1,5 e 5 meses.</Text>
                      <Text style={styles.textCarro}><Text style={styles.textHeavyCar}>Sentar sozinho:</Text> pode acontecer a partir de 6 meses, mas pode levar até 2 anos e meio.</Text>
                      <Text style={styles.textCarro}><Text style={styles.textHeavyCar}>Engatinhar ou se deslocar:</Text> geralmente entre 8 meses e quase 2 anos.</Text>
                      <Text style={styles.textCarro}><Text style={styles.textHeavyCar}>Comer com os dedos:</Text> pode iniciar entre 10 meses e 2 anos.</Text>
                    </BlurView>
                  </ImageBackground>
                ) : index == 1 ? (
                  <View style={styles.contTexto}>
                    <View style={styles.cardImpar}>
                      <Text style={[styles.title, { textAlign: 'left' }]}>De 1 a 3 anos</Text>
                    </View>
                    <Text style={styles.textHeavy}> · Andar sem ajuda.</Text>
                    <Text style={styles.textHeavy}> · Beber no copo.</Text>
                    <Text style={styles.textHeavy}> · Usar colher.</Text>
                    <Text style={styles.textHeavy}> · Primeiras palavras.</Text>
                  </View>
                ) : index == 2 ? (
                  <View style={styles.contTexto}>
                    <View style={styles.cardImpar}>
                      <Text style={[styles.title, { textAlign: 'left' }]}>A partir de 3 anos</Text>
                    </View>
                    <Text style={styles.text}><Text style={styles.textHeavy}> · Frases de duas palavras:</Text> podem aparecer a partir dos 2 anos, mas podem levar até 7 anos e meio.</Text>
                    <Text style={styles.text}><Text style={styles.textHeavy}> · Controle de esfíncteres (xixi e cocô):</Text> pode ocorrer em qualquer momento entre 2 e 7 anos.</Text>
                    <Text style={styles.text}><Text style={styles.textHeavy}> · Vestir-se com ajuda e começar a tentar sozinho:</Text> entre 3 anos e meio e 8 anos e meio.</Text>
                  </View>
                ) : <Text>nothing here</Text>
              }
            </View>
            
          )}
        />
        
      </View>
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 50 }}
        activeDotStyle={{
          backgroundColor: "#2261C1", 
          borderRadius: 50,
          overflow: 'hidden'
        }}
        containerStyle={{ gap: 5, marginTop: 10}}
        onPress={onPressPagination}
      />
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
        <View style={{ marginTop: 10 }}>
          <Text style={styles.textPequenoTitulo}>Referências:</Text>
          <Text style={styles.textPequeno}>National Down Syndrome Society (NDSS) e parceiros como
            <TouchableOpacity onPress={() => Linking.openURL('https://saut.org.sa/page-developmental-milestones%26lang%3DEnglish')}>
              <Text style={styles.textLinkRef}>
                Saut – The Voice of Down Syndrome Society
              </Text>
            </TouchableOpacity>.
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
    paddingHorizontal: 5,
  },
  contImg: {
    height: '100%',
        
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
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
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
  titleCar: {
    fontSize: 20,
    fontFamily: 'Roboto-600',
    color: 'black',
    textAlign: 'left'
  },
  text: {
    fontSize: 16,
    color: '#231F20',
    fontFamily: 'Roboto',
  },
  textCarro: {
    fontSize: 18,
    color: 'back',
    fontFamily: 'Roboto',
  },
  blurCont:{
    marginTop: 'auto',
    paddingLeft: 5,
  },
  textHeavy: {
    fontSize: 16,
    color: '#231F20',
    fontFamily: 'Roboto-500',
  },
  textHeavyCar: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Roboto-600',
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