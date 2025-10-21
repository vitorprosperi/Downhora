import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function telaDireitos() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.cardTitle}>
          <Text style={styles.title}>Avaliação nutricional de crianças e adolescentes com síndrome de Down</Text>
        </View>
        <View style={styles.contTexto}>
          <Text style={styles.text}>
            É fundamental utilizar <Text style={styles.textHeavy}>curvas de crescimento específicas para crianças e adolescentes com Síndrome de Down</Text>,
            pois quando usamos as curvas de crescimento da população em geral, podemos ter interpretações equivocadas,
            como achar que a criança está <Text style={styles.textHeavy}>menor do que deveria para a idade</Text> ou que está com <Text style={styles.textHeavy}>peso acima do esperado</Text>.
          </Text>
          <Text style={styles.text}>
            As curvas específicas levam em conta as <Text style={styles.textHeavy}>características próprias do crescimento</Text> de pessoas com Síndrome de Down,
            permitindo uma avaliação adequada e real da estatura, do peso e do desenvolvimento ao longo dos anos.
            Assim, pais e profissionais de saúde conseguem acompanhar a criança de maneira mais apropriada, identificar precocemente
            qualquer alteração e planejar os cuidados necessários para proporcionar uma vida mais saudável.
          </Text>
        </View>
        <View style={styles.contTexto}>
          <View style={styles.cardImpar}>
            <Text style={styles.title}>15 passos para uma alimentação saudável de crianças com síndrome de Down</Text>
          </View>
          <Text style={styles.text}>1- <Text style={styles.textHeavy}>Aleitamento materno exclusivo</Text> até os <Text style={styles.textHeavy}>6 meses de idade</Text>;</Text>
          <Text style={styles.text}>2- Oferecer o <Text style={styles.textHeavy}>leite materno como complemento até 2 anos de idade ou mais</Text>;</Text>
          <Text style={styles.text}>3- A <Text style={styles.textHeavy}>introdução dos alimentos</Text> deve começar somente quando o pediatra orientar e quando a <Text style={styles.textHeavy}>criança mostrar que já está pronta</Text>.</Text>
          <Text style={styles.text}>4- A <Text style={styles.textHeavy}>alimentação da família</Text> também deve ser introduzida respeitando o <Text style={styles.textHeavy}>desenvolvimento da criança</Text>;</Text>
          <Text style={styles.text}>5- <Text style={styles.textHeavy}>Não é necessário</Text> adicionar <Text style={styles.textHeavy}>sal na comida</Text> da criança <Text style={styles.textHeavy}>até 1 ano de idade</Text> e <Text style={styles.textHeavy}>açúcar até os 2 anos de idade</Text>;</Text>
          <Text style={styles.text}>6- É <Text style={styles.textHeavy}>PROIBIDO</Text> o consumo de <Text style={styles.textHeavy}>mel</Text> até os dois anos de idade;</Text>
          <Text style={styles.text}>7- Oferecer <Text style={styles.textHeavy}>legumes, frutas e verduras diariamente</Text>;</Text>
          <Text style={styles.text}>8- Oferecer água à criança <Text style={styles.textHeavy}>várias vezes ao dia</Text>;</Text>
          <Text style={styles.text}>
            9- <Text style={styles.textHeavy}>Não oferecer sucos</Text>, mesmo que naturais aos <Text style={styles.textHeavy}>menores de 1 ano</Text>. Além disso, os sucos devem <Text style={styles.textHeavy}>limitar a quantidade</Text>
            máxima de <Text style={styles.textHeavy}>120 mL/dia</Text>, para crianças de <Text style={styles.textHeavy}>1 a 3 anos</Text> e de <Text style={styles.textHeavy}>175mL/dia</Text>,
            para crianças de <Text style={styles.textHeavy}>4 a 6 anos</Text> e 250ml a partir dos <Text style={styles.textHeavy}>7 anos</Text>.
          </Text>
          <Text style={styles.text}>
            10- <Text style={styles.textHeavy}>Evitar embutidos</Text> (presunto, mortadela, salsicha, linguiça, peito de peru, salame, nuggets, hambúrgueres),
            <Text style={styles.textHeavy}>bebidas açucaradas</Text> (refrigerante, suco em pó, achocolatados prontos, bebida lácteas com sabor) e <Text style={styles.textHeavy}>ultraprocessados</Text>
            (salgadinho, bolachas com e sem recheio, salgadinhos, chocolate, doces, etc);
          </Text>
          <Text style={styles.text}>11- Não permitir <Text style={styles.textHeavy}>distrações como telas</Text> durante as refeições;</Text>
          <Text style={styles.text}>12- Dar atenção aos <Text style={styles.textHeavy}>sinais de fome e saciedade</Text> da criança e <Text style={styles.textHeavy}>conversar com ela durante a refeição</Text>;</Text>
          <Text style={styles.text}>13- Os <Text style={styles.textHeavy}>bons hábitos alimentares da família</Text> são fundamentais para que a criança se alimente bem!</Text>
          <Text style={styles.text}>
            14- <Text style={styles.textHeavy}>Permita que a criança explore os alimentos</Text>: tocar, apertar e cheirar faz parte da experiência de comer!
            Além disso, incentive sempre a experimentar novos sabores e texturas.
          </Text>
          <Text style={styles.text}>15- Proteja as crianças da publicidade de alimentos.</Text>
        </View>
        <View style={styles.contTexto}>
          <View style={styles.cardPar}>
            <Text style={styles.title}>15 passos para uma alimentação saudável de adolescentes com síndrome de Down</Text>
          </View>
          <Text style={styles.text}>1- Coma <Text style={styles.textHeavy}>frutas, legumes e verduras diariamente</Text>;</Text>
          <Text style={styles.text}>2- Tome <Text style={styles.textHeavy}>água</Text> várias vezes ao dia;</Text>
          <Text style={styles.text}>
            3- <Text style={styles.textHeavy}>Evite</Text> o consumo de <Text style={styles.textHeavy}>embutidos</Text> (presunto, mortadela, salsicha, linguiça, peito de peru, salame, nuggets, hambúrgueres),
            <Text style={styles.textHeavy}>bebidas açucaradas</Text> (refrigerante, suco em pó, achocolatados prontos, bebida lácteas com sabor) e <Text style={styles.textHeavy}>ultraprocessados</Text>
            (salgadinho, bolachas com e sem recheio, salgadinhos, chocolate, doces, etc);
          </Text>
          <Text style={styles.text}>4- <Text style={styles.textHeavy}>Não pule refeições</Text>! É importante comer várias vezes ao dia (café da manhã, almoço, jantar e lanches entre as refeições principais);</Text>
          <Text style={styles.text}>5- Tome <Text style={styles.textHeavy}>café da manhã</Text>, pois essa é uma das refeições mais importantes do dia!</Text>
          <Text style={styles.text}>6- <Text style={styles.textHeavy}>Evite</Text> o consumo de <Text style={styles.textHeavy}>fast food</Text>;</Text>
          <Text style={styles.text}>7- Limite a ingestão de suco, mesmo que natural, à 240ml por dia;</Text>
          <Text style={styles.text}>8- Evite frituras (prefira os alimentos cozidos, assados, grelhados);</Text>
          <Text style={styles.text}>9- Consuma fontes de <Text style={styles.textHeavy}>cálcio</Text> (leite, derivados, vegetais verdes escuro), pois esse mineral é fundamental na formação dos <Text style={styles.textHeavy}>ossos e dentes</Text>;</Text>
          <Text style={styles.text}>10- O consumo adequado de <Text style={styles.textHeavy}>carboidratos</Text> (arroz, pães, mandioca, batata, etc) é fundamental, pois é <Text style={styles.textHeavy}>principal fonte de energia</Text> do corpo;</Text>
          <Text style={styles.text}>11- O consumo adequado de <Text style={styles.textHeavy}>proteína</Text> (feijão, lentilha, ervilha, grão-de-bico, ovos, carnes, peixes, etc) é fundamental, pois auxiliam no <Text style={styles.textHeavy}>crescimento, desenvolvimento dos músculos e fortalecimento do corpo</Text>;</Text>
          <Text style={styles.text}>12- Consuma <Text style={styles.textHeavy}>sal, açúcar, óleos e gorduras </Text>com <Text style={styles.textHeavy}>moderação</Text>;</Text>
          <Text style={styles.text}>13- <Text style={styles.textHeavy}>Não troque</Text> a <Text style={styles.textHeavy}>comida</Text> por <Text style={styles.textHeavy}>lanches</Text>;</Text>
          <Text style={styles.text}>14- <Text style={styles.textHeavy}>Durma bem</Text>;</Text>
          <Text style={styles.text}>15- Leia o <Text style={styles.textHeavy}>rótulo dos alimentos</Text> sempre!</Text>
        </View>
        <View style={styles.contTexto}>
          <View style={styles.cardImpar}>
            <Text style={styles.title}>Classificação dos alimentos quanto ao grau de processamento</Text>
          </View>
          <Text style={styles.text}><Text style={[styles.textHeavy, { fontFamily: 'Roboto-500-italic' }]}>In natura:</Text> alimentos obtidos diretamente de plantas ou animais (ex.: folhas, frutos, ovos, leite)</Text>
          <Text style={styles.text}>
            <Text style={styles.textHeavy}>Minimamente processados:</Text> alimentos que passaram por pequenas alterações (ex.: arroz, feijão, farinhas, carnes resfriadas,
            raízes e tubérculos lavados, couve picada, leite pasteurizado)
          </Text>
          <Text style={styles.text}>
            <Text style={styles.textHeavy}>Processados:</Text> alimentos com adição de sal, açúcar ou gordura (ex.: frutas em calda,
            legumes em conserva, peixes em conserva, carne seca, pães, queijos)
          </Text>
          <Text style={styles.text}>
            <Text style={styles.textHeavy}>Ultraprocessados:</Text> produtos que passam por diversas etapas de processamento e vários geralmente possuem vários ingredientes
            (ex.: salgadinho, bolacha, macarrão instantâneo)
          </Text>
        </View>
        <View style={styles.contTexto}>
          <Text style={styles.text}>Pensando na analogia dos grupos alimentares com um semáforo, temos:</Text>
          <Text style={styles.text}><Text style={[styles.textHeavy, { color: 'green', }]}>Verde</Text> – <Text style={styles.textHeavy}>alimentos in natura e minimamente processados:</Text> podem ser consumidos em <Text style={styles.textHeavy}>maiores quantidades</Text>.</Text>
          <Text style={styles.text}><Text style={[styles.textHeavy, { color: '#DAA520' }]}>Amarelo</Text> – <Text style={styles.textHeavy}>alimentos processados</Text>: indicam que o consumo deve ser <Text style={styles.textHeavy}>moderado</Text>.</Text>
          <Text style={styles.text}><Text style={[styles.textHeavy, { color: 'red' }]}>Vermelho</Text> – <Text style={styles.textHeavy}>alimentos ultraprocessados</Text>: devem ser <Text style={styles.textHeavy}>evitados sempre que possível</Text>.</Text>
          <Text style={styles.text}>Essa analogia ajuda a entender de forma simples <Text style={styles.textHeavy}>quais alimentos podem ser consumidos mais, com moderação ou evitados</Text>.</Text>
        </View>
        <View>
          <Text style={styles.subTitulo}>Como ler o rótulo dos alimentos?</Text>
          <Text style={styles.text}>
            A lista de ingredientes é organizada <Text style={styles.textHeavy}>da maior para a menor quantidade</Text>. O primeiro ingrediente é o que tem mais, e o último,
            o que tem menos. <Text style={styles.textHeavy}>Listas longas e/ou com nomes difíceis</Text> podem indicar que o alimento é <Text style={styles.textHeavy}>ultraprocessado</Text>.
          </Text>
          <Text style={styles.text}>
            Evite alimentos que tenham no rótulo frontal avisos como “alto em açúcares adicionados”,
            “alto em sódio” ou “alto em gordura saturada”.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  cardTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFF',
  },
  contTexto: {
    marginBottom: 15,
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
    textAlign: 'center',
    marginBottom: 4,
  },
  text: {
    fontSize: 15,
    color: '#231F20',
    fontFamily: 'Roboto',
  },
  textHeavy: {
    fontSize: 15,
    color: '#231F20',
    fontFamily: 'Roboto-500',
  },
  textPequeno: {
    fontSize: 13,
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