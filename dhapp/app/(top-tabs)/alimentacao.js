import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function telaDireitos() {
    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.title}>Avaliação nutricional de crianças e adolescentes com síndrome de Down</Text>
                <View style={styles.contTexto}>
                    <Text style={styles.text}>
                        É fundamental utilizar curvas de crescimento específicas para crianças e adolescentes com Síndrome de Down,
                        pois quando usamos as curvas de crescimento da população em geral, podemos ter interpretações equivocadas,
                        como achar que a criança está menor do que deveria para a idade ou que está com peso acima do esperado.
                    </Text>
                    <Text style={styles.text}>
                        As curvas específicas levam em conta as características próprias do crescimento de pessoas com Síndrome de Down,
                        permitindo uma avaliação adequada e real da estatura, do peso e do desenvolvimento ao longo dos anos.
                        Assim, pais e profissionais de saúde conseguem acompanhar a criança de maneira mais apropriada, identificar precocemente
                        qualquer alteração e planejar os cuidados necessários para proporcionar uma vida mais saudável.
                    </Text>
                </View>
                <View style={styles.contTexto}>
                    <Text style={styles.subTitulo}>15 passos para uma alimentação saudável de crianças com síndrome de Down</Text>
                    <Text style={styles.text}>Aleitamento materno exclusivo até os 6 meses de idade;</Text>
                    <Text style={styles.text}>Oferecer o leite materno como complemento até 2 anos de idade ou mais;</Text>
                    <Text style={styles.text}>A introdução dos alimentos deve começar somente quando o pediatra orientar e quando a criança mostrar que já está pronta.</Text>
                    <Text style={styles.text}>A alimentação da família também deve ser introduzida respeitando o desenvolvimento da criança;</Text>
                    <Text style={styles.text}>Não é necessário adicionar sal na comida da criança até 1 ano de idade e açúcar até os 2 anos de idade;</Text>
                    <Text style={styles.text}>É PROIBIDO o consumo de mel até os dois anos de idade;</Text>
                    <Text style={styles.text}>Oferecer legumes, frutas e verduras diariamente;</Text>
                    <Text style={styles.text}>Oferecer água à criança várias vezes ao dia;</Text>
                    <Text style={styles.text}>
                        Não oferecer sucos, mesmo que naturais aos menores de 1 ano. Além disso, os sucos devem limitar a quantidade máxima de 120 mL/dia,
                        para crianças de 1 a 3 anos e de 175mL/dia, para crianças de 4 a 6 anos e 250ml a partir dos 7 anos.
                    </Text>
                    <Text style={styles.text}>
                        Evitar embutidos (presunto, mortadela, salsicha, linguiça, peito de peru, salame, nuggets, hambúrgueres),
                        bebidas açucaradas (refrigerante, suco em pó, achocolatados prontos, bebida lácteas com sabor) e ultraprocessados
                        (salgadinho, bolachas com e sem recheio, salgadinhos, chocolate, doces, etc);
                    </Text>
                    <Text style={styles.text}>Não permitir distrações como telas durante as refeições;</Text>
                    <Text style={styles.text}>Dar atenção aos sinais de fome e saciedade da criança e conversar com ela durante a refeição;</Text>
                    <Text style={styles.text}>Os bons hábitos alimentares da família são fundamentais para que a criança se alimente bem!</Text>
                    <Text style={styles.text}>
                        Permita que a criança explore os alimentos: tocar, apertar e cheirar faz parte da experiência de comer!
                        Além disso, incentive sempre a experimentar novos sabores e texturas.
                    </Text>
                    <Text style={styles.text}>Proteja as crianças da publicidade de alimentos.</Text>
                </View>
                <View>
                    <Text style={styles.subTitulo}>15 passos para uma alimentação saudável de adolescentes com síndrome de Down</Text>
                    <Text style={styles.text}>Coma frutas, legumes e verduras diariamente;</Text>
                    <Text style={styles.text}>Tome água várias vezes ao dia;</Text>
                    <Text style={styles.text}>
                        Evite o consumo de embutidos (presunto, mortadela, salsicha, linguiça, peito de peru, salame, nuggets, hambúrgueres),
                        bebidas açucaradas (refrigerante, suco em pó, achocolatados prontos, bebida lácteas com sabor) e ultraprocessados
                        (salgadinho, bolachas com e sem recheio, salgadinhos, chocolate, doces, etc);
                    </Text>
                    <Text style={styles.text}>Não pule refeições! É importante comer várias vezes ao dia (café da manhã, almoço, jantar e lanches entre as refeições principais);</Text>
                    <Text style={styles.text}>Tome café da manhã, pois essa é uma das refeições mais importantes do dia!</Text>
                    <Text style={styles.text}>Evite o consumo de fast food;</Text>
                    <Text style={styles.text}>Limite a ingestão de suco, mesmo que natural, à 240ml por dia;</Text>
                    <Text style={styles.text}>Evite frituras (prefira os alimentos cozidos, assados, grelhados);</Text>
                    <Text style={styles.text}>Consuma fontes de cálcio (leite, derivados, vegetais verdes escuro), pois esse mineral é fundamental na formação dos ossos e dentes;</Text>
                    <Text style={styles.text}>O consumo adequado de carboidratos (arroz, pães, mandioca, batata, etc) é fundamental, pois é principal fonte de energia do corpo;</Text>
                    <Text style={styles.text}>O consumo adequado de proteína (feijão, lentilha, ervilha, grão-de-bico, ovos, carnes, peixes, etc) é fundamental, pois auxiliam no crescimento, desenvolvimento dos músculos e fortalecimento do corpo;</Text>
                    <Text style={styles.text}>Consuma sal, açúcar, óleos e gorduras com moderação;</Text>
                    <Text style={styles.text}>Não troque a comida por lanches;</Text>
                    <Text style={styles.text}>Durma bem;</Text>
                    <Text style={styles.text}>Leia o rótulo dos alimentos sempre!</Text>
                </View>
                <View style={styles.contTexto}>
                    <Text style={styles.subTitulo}>Classificação dos alimentos quanto ao grau de processamento</Text>
                    <Text style={styles.text}>In natura: alimentos obtidos diretamente de plantas ou animais (ex.: folhas, frutos, ovos, leite)</Text>
                    <Text style={styles.text}>
                        Minimamente processados: alimentos que passaram por pequenas alterações (ex.: arroz, feijão, farinhas, carnes resfriadas,
                        raízes e tubérculos lavados, couve picada, leite pasteurizado)
                    </Text>
                    <Text style={styles.text}>
                        Processados: alimentos com adição de sal, açúcar ou gordura (ex.: frutas em calda,
                        legumes em conserva, peixes em conserva, carne seca, pães, queijos)
                    </Text>
                    <Text style={styles.text}>
                        Ultraprocessados: produtos que passam por diversas etapas de processamento e vários geralmente possuem vários ingredientes
                        (ex.: salgadinho, bolacha, macarrão instantâneo)
                    </Text>
                    <Text style={styles.text}>Pensando na analogia dos grupos alimentares com um semáforo, temos:</Text>
                    <Text style={styles.text}>Verde – alimentos in natura e minimamente processados: podem ser consumidos em maiores quantidades.</Text>
                    <Text style={styles.text}>Amarelo – alimentos processados: indicam que o consumo deve ser moderado.</Text>
                    <Text style={styles.text}>Vermelho – alimentos ultraprocessados: devem ser evitados sempre que possível.</Text>
                    <Text style={styles.text}>Essa analogia ajuda a entender de forma simples quais alimentos podem ser consumidos mais, com moderação ou evitados.</Text>
                </View>
                <View>
                        <Text style={styles.subTitulo}>Como ler o rótulo dos alimentos?</Text>
                        <Text style={styles.text}>
                            A lista de ingredientes é organizada da maior para a menor quantidade. O primeiro ingrediente é o que tem mais, e o último,
                            o que tem menos. Listas longas e/ou com nomes difíceis podem indicar que o alimento é ultraprocessado.
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
    height: '25',
    width: '100vw',
  },
  cardPar: {
    backgroundColor: 'hsla(42 93.6% 49% / 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    height: '25',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFF',
  },
  contTexto: {
    marginBottom: 10,
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
    fontFamily: 'Roboto',
  },
  textPequenoTitulo: {
    fontSize: 14,
    fontFamily: 'Raleway-500',
  },
  textLinkRef: {
    fontSize: 13,
    color: 'blue',
    fontFamily: 'Roboto',
  },
});