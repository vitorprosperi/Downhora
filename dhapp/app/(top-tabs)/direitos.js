import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function telaDireitos() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Direitos garantidos da criança com Síndrome de Down</Text>
        <View style={styles.contTexto}>
            <View style={styles.cardImpar}>
          <Text style={styles.title}>Saúde</Text>
          </View>
          <Text style={styles.text}>
            Consultas regulares no SUS com médicos de família, enfermeiros, pediatra e especialistas
            (cardiologista, endocrinologista, oftalmologista, otorrino, entre outros, conforme necessidade).
          </Text>
          <Text style={styles.text}>Acesso a vacinas do calendário básico.</Text>
          <Text style={styles.text}>Terapias gratuitas de estimulação precoce (fonoaudiologia, fisioterapia, terapia ocupacional, psicologia).</Text>
          <Text style={styles.text}>Fornecimento de medicamentos e insumos pelo SUS, quando prescritos.</Text>
          <Text style={styles.text}>Acompanhamento pelo Programa de Saúde da Pessoa com Deficiência em municípios que possuem o programa.</Text>
        </View>
        <View style={styles.contTexto}>
            <View style={styles.cardPar}>
          <Text style={styles.title}>Educação</Text>
          </View>
          <Text style={styles.text}>Direito de matrícula em escola regular pública ou privada, sem cobrança adicional.</Text>
          <Text style={styles.text}>Acesso ao Atendimento Educacional Especializado (AEE) em turno complementar.</Text>
          <Text style={styles.text}>Presença de profissional de apoio escolar quando necessário (ex.: auxiliar de vida escolar).</Text>
          <Text style={styles.text}>Adaptação de materiais pedagógicos (livros acessíveis, recursos visuais, atividades simplificadas).</Text>
          <Text style={styles.text}>Participação em todas as atividades escolares, inclusive passeios e projetos.</Text>
        </View>
        <View style={styles.contTexto}>
            <View style={styles.cardImpar}>
          <Text style={styles.title}>Proteção social</Text>
          </View>
          <Text style={styles.text}>
            Possibilidade de solicitar o Benefício de Prestação Continuada (BPC),
            que garante um salário-mínimo mensal à criança com deficiência, desde que comprove não possuir meios para garantir o próprio
            sustento e que a renda mensal per capita da família do beneficiário seja inferior a ¼ do salário-mínimo vigente (Lei nº 8.748/93).
          </Text>
          <Text style={styles.text}>Pessoas com Síndrome de Down estão isentas do recolhimento do Imposto de Renda, conforme prevê a Lei nº 7.713/88.</Text>
          <Text style={styles.text}>Direito a prioridade em programas sociais (como Bolsa Família, vagas em creches e pré-escolas).</Text>
          <Text style={styles.text}>Atendimento prioritário em repartições públicas, hospitais e serviços bancários.</Text>
          <Text style={styles.text}>
            Transporte público gratuito em muitas cidades (mediante carteira de gratuidade). O Passe Livre para o transporte interestadual
            é direito das pessoas portadoras de deficiência que comprovem insuficiências de recursos financeiros garantido pela Lei nº 8.899/94.
          </Text>
          <Text style={styles.textPequeno}>
              * Cada município é livre para definir quais grupos de passageiros terão isenção no uso do transporte público.
              Entre em contato com a prefeitura da cidade de onde você mora para consultar se este direito existe.
            </Text>
        </View>
        <View style={styles.contTexto}>
            <View style={styles.cardPar}>
          <Text style={styles.title}>Convivência e lazer</Text>
          </View>
          <Text style={styles.text}>Participar de atividades esportivas, culturais e de lazer oferecidas em escolas, ONGs, clubes e centros comunitários.</Text>
          <Text style={styles.text}>Garantia de acessibilidade em espaços públicos (parques, praças, teatros, cinemas).</Text>
          <Text style={styles.text}>Direito de conviver com a família e a comunidade, não podendo ser segregada ou institucionalizada de forma compulsória.</Text>
          <Text style={styles.text}>Acesso a programas de inclusão no esporte e lazer adaptado.</Text>
        </View>
        <View style={styles.contTexto}>
            <View style={styles.cardImpar}>
          <Text style={styles.title}>Proteção legal</Text>
          </View>
          <Text style={styles.text}>Amparo pelo Estatuto da Criança e do Adolescente (ECA), que garante prioridade absoluta na proteção da vida, saúde e desenvolvimento.</Text>
          <Text style={styles.text}>Proteção contra violência, negligência, preconceito e discriminação.</Text>
          <Text style={styles.text}>Atendimento prioritário em emergências médicas.</Text>
          <Text style={styles.text}>Acesso à Justiça gratuita para garantir direitos violados (via Defensoria Pública).</Text>
        </View>
        <View style={styles.contTexto}>
          <Text style={styles.subTitulo}>Resumo: </Text>
          <Text style={styles.text}>Seu filho tem direito a tratamento de saúde completo pelo SUS, incluindo terapias.</Text>
          <Text style={styles.text}>Na escola, tem direito a estar incluído na sala de aula regular, com adaptações e apoio especializado.</Text>
          <Text style={styles.text}>Pode receber benefícios sociais e transporte gratuito, dependendo da situação da família.</Text>
          <Text style={styles.text}>Deve ter acesso a lazer e convivência sem barreiras.</Text>
          <Text style={styles.text}>Está protegido por lei contra qualquer tipo de violência ou exclusão.</Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.textPequenoTitulo}>Referências: </Text>
          <Text style={styles.textPequeno}>
            Constituição Federal (1988), Estatuto da Criança e do Adolescente – ECA (1990), Convenção da ONU sobre os Direitos da Pessoa com Deficiência
            (Decreto nº 6.949/2009), Lei Brasileira de Inclusão – LBI (2015), Diretrizes de Atenção à Pessoa com Síndrome de Down (Ministério da Saúde, 2013).
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


//temporario
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