import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function telaDireitos() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.cardTitle}>
          <Text style={styles.title}>Direitos garantidos da criança com síndrome de Down</Text>
        </View>
        <View style={styles.contTexto}>
          <View style={styles.cardImpar}>
            <Text style={styles.subTitulo}>Saúde</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>
              Consultas regulares no <Text style={styles.textHeavy}>SUS</Text> com médicos de família, enfermeiros, pediatra e especialistas
              (cardiologista, endocrinologista, oftalmologista, otorrino, entre outros, conforme necessidade).
            </Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Acesso a <Text style={styles.textHeavy}>vacinas</Text> do calendário básico.</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}><Text style={styles.textHeavy}>Terapias gratuitas</Text> de estimulação precoce (fonoaudiologia, fisioterapia, terapia ocupacional, psicologia).</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Fornecimento de <Text style={styles.textHeavy}>medicamentos</Text> e insumos pelo SUS, quando prescritos.</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Acompanhamento pelo <Text style={styles.textHeavy}>Programa de Saúde da Criança e/ou da Pessoa com Deficiência</Text></Text>
          </View>
        </View>
        <View style={styles.contTexto}>
          <View style={styles.cardPar}>
            <Text style={styles.subTitulo}>Educação</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Direito de <Text style={styles.textHeavy}>matrícula em escola regular pública ou privada</Text>, sem cobrança adicional.</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Acesso ao <Text style={styles.textHeavy}>Atendimento Educacional Especializado (AEE)</Text> em turno complementar.</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Presença de <Text style={styles.textHeavy}>profissional de apoio</Text> escolar quando necessário (ex.: auxiliar de vida escolar).</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Adaptação de materiais pedagógicos (livros acessíveis, recursos visuais, atividades simplificadas).</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Participação em todas as atividades escolares, inclusive passeios e projetos.</Text>
          </View>
        </View>
        <View style={styles.contTexto}>
          <View style={styles.cardImpar}>
            <Text style={styles.subTitulo}>Proteção social</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>
              Possibilidade de solicitar o <Text style={styles.textHeavy}>Benefício de Prestação Continuada (BPC)</Text>,
              que garante um salário-mínimo mensal à criança com deficiência, desde que comprove não possuir meios para garantir o próprio
              sustento e que a renda mensal per capita da família do beneficiário seja inferior a ¼ do salário-mínimo vigente (Lei nº 8.748/93).
            </Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Pessoas com Síndrome de Down estão isentas do recolhimento do Imposto de Renda, conforme prevê a Lei nº 7.713/88.</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Direito a <Text style={styles.textHeavy}>prioridade em programas sociais</Text> (como Bolsa Família, vagas em creches e pré-escolas).</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}><Text style={styles.textHeavy}>Atendimento prioritário</Text> em repartições públicas, hospitais e serviços bancários.</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>
              Transporte público gratuito em muitas cidades (mediante carteira de gratuidade). O Passe Livre para o transporte interestadual
              é direito das pessoas portadoras de deficiência que comprovem insuficiências de recursos financeiros garantido pela Lei nº 8.899/94.
            </Text>
          </View>
          <Text style={styles.textPequeno}>
            * Cada município é livre para definir quais grupos de passageiros terão isenção no uso do transporte público.
            Entre em contato com a prefeitura da cidade de onde você mora para consultar se este direito existe.
          </Text>
        </View>
        <View style={styles.contTexto}>
          <View style={styles.cardPar}>
            <Text style={styles.subTitulo}>Convivência e lazer</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Participar de <Text style={styles.textHeavy}>atividades esportivas, culturais e de lazer</Text> oferecidas em escolas, ONGs, clubes e centros comunitários.</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Garantia de <Text style={styles.textHeavy}>acessibilidade em espaços públicos</Text> (parques, praças, teatros, cinemas).</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Direito de conviver com a família e a comunidade, não podendo ser segregada ou institucionalizada de forma compulsória.</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Acesso a programas de <Text style={styles.textHeavy}>inclusão no esporte e lazer adaptado.</Text></Text>
          </View>
        </View>
        <View style={styles.contTexto}>
          <View style={styles.cardImpar}>
            <Text style={styles.subTitulo}>Proteção legal</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Amparo pelo <Text style={styles.textHeavy}>Estatuto da Criança e do Adolescente (ECA)</Text>, que garante prioridade absoluta na proteção da vida, saúde e desenvolvimento.</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Proteção contra <Text style={styles.textHeavy}>violência, negligência, preconceito e discriminação.</Text></Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Acesso à <Text style={styles.textHeavy}>Justiça gratuita</Text> para garantir direitos violados (via Defensoria Pública).</Text>
          </View>
        </View>
        <View style={styles.contTexto}>
          <Text style={styles.subTitulo}>Resumo</Text>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Seu filho tem direito a <Text style={styles.textHeavy}>tratamento de saúde completo pelo SUS</Text>, incluindo terapias.</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Na escola, tem direito a <Text style={styles.textHeavy}>estar incluído na sala de aula regular</Text>, com adaptações e apoio especializado.</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Pode receber <Text style={styles.textHeavy}>benefícios sociais e transporte gratuito</Text>, dependendo da situação da família.</Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Deve ter acesso a <Text style={styles.textHeavy}>lazer e convivência sem barreiras.</Text></Text>
          </View>
          <View style={styles.bPoint}>
            <Text style={styles.text}>· </Text>
            <Text style={styles.text}>Está protegido por lei contra qualquer tipo de <Text style={styles.textHeavy}>violência ou exclusão.</Text></Text>
          </View>
        </View>
        <View style={styles.contTexto}>
          <Text style={styles.titleH2}>Referências: </Text>
          <Text style={styles.text}>Constituição Federal (1988),</Text>
          <Text style={styles.text}>Estatuto da Criança e do Adolescente – ECA (1990),</Text>
          <Text style={styles.text}>Convenção da ONU sobre os Direitos da Pessoa com Deficiência (Decreto nº 6.949/2009),</Text>
          <Text style={styles.text}>Lei Brasileira de Inclusão – LBI (2015),</Text>
          <Text style={styles.text}>Diretrizes de Atenção à Pessoa com Síndrome de Down (Ministério da Saúde, 2013).</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


//temporario
const styles = StyleSheet.create({
  bPoint: {
    flexDirection: 'row',
    paddingRight: 15,
    marginBottom: 3,
  },
  cardImpar: {
    //   backgroundColor: 'hsla(216 70% 44.5% / 0.3)',
    justifyContent: 'center',
  },
  cardPar: {
    // backgroundColor: 'hsla(42 93.6% 49% / 0.3)',
    justifyContent: 'center',
  },
  cardTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contTexto: {
    marginBottom: 10,
  },
  scrollView: {
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 15,
  },
  subTitulo: {
    fontSize: 18,
    lineHeight: 24,
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
    lineHeight: 24,
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
  textHeavy: {
    fontSize: 16,
    lineHeight: 24,
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