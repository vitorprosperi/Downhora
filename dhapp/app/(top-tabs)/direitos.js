import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function telaDireitos() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        <Text style={styles.title}>Direitos garantidos da criança com Síndrome de Down</Text>
        <View>
          <Text>Saúde</Text>
          <Text>
            Consultas regulares no SUS com médicos de família, enfermeiros, pediatra e especialistas
            (cardiologista, endocrinologista, oftalmologista, otorrino, entre outros, conforme necessidade).
          </Text>
          <Text>Acesso a vacinas do calendário básico.</Text>
          <Text>Terapias gratuitas de estimulação precoce (fonoaudiologia, fisioterapia, terapia ocupacional, psicologia).</Text>
          <Text>Fornecimento de medicamentos e insumos pelo SUS, quando prescritos.</Text>
          <Text>Acompanhamento pelo Programa de Saúde da Pessoa com Deficiência em municípios que possuem o programa.</Text>
        </View>
        <View>
          <Text>Educação</Text>
          <Text>Direito de matrícula em escola regular pública ou privada, sem cobrança adicional.</Text>
          <Text>Acesso ao Atendimento Educacional Especializado (AEE) em turno complementar.</Text>
          <Text>Presença de profissional de apoio escolar quando necessário (ex.: auxiliar de vida escolar).</Text>
          <Text>Adaptação de materiais pedagógicos (livros acessíveis, recursos visuais, atividades simplificadas).</Text>
          <Text>Participação em todas as atividades escolares, inclusive passeios e projetos.</Text>
        </View>
        <View>
          <Text>Proteção social</Text>
          <Text>
            Possibilidade de solicitar o Benefício de Prestação Continuada (BPC),
            que garante um salário-mínimo mensal à criança com deficiência, desde que comprove não possuir meios para garantir o próprio
            sustento e que a renda mensal per capita da família do beneficiário seja inferior a ¼ do salário-mínimo vigente (Lei nº 8.748/93).
          </Text>
          <Text>Pessoas com Síndrome de Down estão isentas do recolhimento do Imposto de Renda, conforme prevê a Lei nº 7.713/88.</Text>
          <Text>Direito a prioridade em programas sociais (como Bolsa Família, vagas em creches e pré-escolas).</Text>
          <Text>Atendimento prioritário em repartições públicas, hospitais e serviços bancários.</Text>
          <Text>
            Transporte público gratuito em muitas cidades (mediante carteira de gratuidade). O Passe Livre para o transporte interestadual
            é direito das pessoas portadoras de deficiência que comprovem insuficiências de recursos financeiros garantido pela Lei nº 8.899/94.

            <Text>
              * Cada município é livre para definir quais grupos de passageiros terão isenção no uso do transporte público.
              Entre em contato com a prefeitura da cidade de onde você mora para consultar se este direito existe.
            </Text>
          </Text>
        </View>
        <View>
          <Text>Convivência e lazer</Text>
          <Text>Participar de atividades esportivas, culturais e de lazer oferecidas em escolas, ONGs, clubes e centros comunitários.</Text>
          <Text>Garantia de acessibilidade em espaços públicos (parques, praças, teatros, cinemas).</Text>
          <Text>Direito de conviver com a família e a comunidade, não podendo ser segregada ou institucionalizada de forma compulsória.</Text>
          <Text>Acesso a programas de inclusão no esporte e lazer adaptado.</Text>
        </View>
        <View>
          <Text>Proteção legal</Text>
          <Text>Amparo pelo Estatuto da Criança e do Adolescente (ECA), que garante prioridade absoluta na proteção da vida, saúde e desenvolvimento.</Text>
          <Text>Proteção contra violência, negligência, preconceito e discriminação.</Text>
          <Text>Atendimento prioritário em emergências médicas.</Text>
          <Text>Acesso à Justiça gratuita para garantir direitos violados (via Defensoria Pública).</Text>
        </View>
        <View>
          <Text>Resumo: </Text>
          <Text>Seu filho tem direito a tratamento de saúde completo pelo SUS, incluindo terapias.</Text>
          <Text>Na escola, tem direito a estar incluído na sala de aula regular, com adaptações e apoio especializado.</Text>
          <Text>Pode receber benefícios sociais e transporte gratuito, dependendo da situação da família.</Text>
          <Text>Deve ter acesso a lazer e convivência sem barreiras.</Text>
          <Text>Deve ter acesso a lazer e convivência sem barreiras.</Text>
          <Text>Está protegido por lei contra qualquer tipo de violência ou exclusão.</Text>
        </View>
        <View>
          <Text>Referências: </Text>
          <Text>
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
  container: {
    flex: 1,
    width: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});