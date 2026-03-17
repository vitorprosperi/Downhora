import * as React from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { SafeAreaView } from "react-native-safe-area-context";

// ── Yellow palette ──────────────────────────────────────────────
const YELLOW_BG = "#FFF8E1"; // very light warm yellow background
const YELLOW_DARK = "#7A5000"; // deep amber – titles, accents
const YELLOW_MID = "#F59E0B"; // vivid amber – interactive elements
const YELLOW_SOFT = "#FDE68A"; // pale yellow – borders, dividers
const WHITE = "#FFFFFF";
const TEXT_DARK = "#1A1208";
const TEXT_MED = "#4B3800";

// ── Reusable components ─────────────────────────────────────────
function CollapsibleSection({
  image,
  title,
  children,
  accentColor = YELLOW_MID,
}) {
  const [collapsed, setCollapsed] = React.useState(true);
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  const toggle = () => {
    Animated.timing(rotateAnim, {
      toValue: collapsed ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setCollapsed(!collapsed);
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <View style={styles.sectionWrapper}>
      <Pressable
        onPress={toggle}
        style={({ pressed }) => [
          styles.sectionHeader,
          { backgroundColor: collapsed ? WHITE : accentColor },
          pressed && { opacity: 0.85 },
        ]}
      >
        <View style={styles.sectionHeaderLeft}>
          {image && (
            <Image
              source={image}
              style={styles.sectionImage}
              resizeMode="contain"
            />
          )}
          <Text
            style={[
              styles.sectionTitle,
              { color: collapsed ? YELLOW_DARK : WHITE },
            ]}
          >
            {title}
          </Text>
        </View>
        <Animated.Text
          style={[
            styles.chevron,
            {
              color: collapsed ? YELLOW_MID : WHITE,
              transform: [{ rotate }],
            },
          ]}
        >
          ›
        </Animated.Text>
      </Pressable>

      <Collapsible collapsed={collapsed}>
        <View style={styles.sectionBody}>{children}</View>
      </Collapsible>
    </View>
  );
}

function NumberedItem({ number, children }) {
  return (
    <View style={styles.numberedRow}>
      <View style={styles.numberBadge}>
        <Text style={styles.numberBadgeText}>{number}</Text>
      </View>
      <Text style={styles.numberedText}>{children}</Text>
    </View>
  );
}

function TipItem({ text }) {
  return (
    <View style={styles.tipRow}>
      <Text style={styles.tipCheck}>✓</Text>
      <Text style={styles.tipText}>{text}</Text>
    </View>
  );
}

// ── Screen ───────────────────────────────────────────────────────
export default function TelaAlimentacao() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HEADER CARD ── */}
        <View style={styles.headerCard}>
          {/* TODO: replace with nutrition-themed image */}
          <Image
            source={require("../../assets/images/salad.png")}
            style={styles.imageTitle}
          ></Image>
          <View style={styles.headerTextBlock}>
            <Text style={styles.headerSub}>
              Avaliação nutricional de crianças e adolescentes com
            </Text>
            <Text style={styles.headerTitle}>Síndrome de Down</Text>
          </View>
        </View>

        {/* ── INTRO ── */}
        <View style={styles.introCard}>
          <Text style={styles.introText}>
            É fundamental utilizar{" "}
            <Text style={styles.introTextBold}>
              curvas de crescimento específicas para crianças e adolescentes com
              Síndrome de Down
            </Text>
            , pois quando usamos as curvas da população geral podemos ter
            interpretações equivocadas, como achar que a criança está{" "}
            <Text style={styles.introTextBold}>menor do que deveria</Text> ou
            que está com{" "}
            <Text style={styles.introTextBold}>peso acima do esperado</Text>.
          </Text>
          <Text style={[styles.introText, { marginTop: 10 }]}>
            As curvas específicas levam em conta as{" "}
            <Text style={styles.introTextBold}>
              características próprias do crescimento
            </Text>{" "}
            de pessoas com Síndrome de Down, permitindo uma avaliação adequada
            da estatura, do peso e do desenvolvimento ao longo dos anos.
          </Text>
        </View>

        {/* ── COLLAPSIBLE SECTIONS ── */}
        <View style={styles.sectionGroup}>
          <Text style={styles.groupLabel}>
            Passos para alimentação saudável
          </Text>

          {/* Section 1 – Crianças */}
          <CollapsibleSection
            image={require("../../assets/images/passos-pequenos.png")}
            title="15 passos – Crianças com Síndrome de Down"
            accentColor="#E8A000"
          >
            {[
              {
                n: 1,
                body: (
                  <>
                    <Text style={styles.bold}>
                      Aleitamento materno exclusivo
                    </Text>{" "}
                    até os <Text style={styles.bold}>6 meses de idade</Text>.
                  </>
                ),
              },
              {
                n: 2,
                body: (
                  <>
                    Oferecer o{" "}
                    <Text style={styles.bold}>
                      leite materno como complemento até 2 anos ou mais
                    </Text>
                    .
                  </>
                ),
              },
              {
                n: 3,
                body: (
                  <>
                    A <Text style={styles.bold}>introdução dos alimentos</Text>{" "}
                    deve começar quando o pediatra orientar e quando a{" "}
                    <Text style={styles.bold}>
                      criança mostrar que está pronta
                    </Text>
                    .
                  </>
                ),
              },
              {
                n: 4,
                body: (
                  <>
                    A <Text style={styles.bold}>alimentação da família</Text>{" "}
                    deve ser introduzida respeitando o{" "}
                    <Text style={styles.bold}>desenvolvimento da criança</Text>.
                  </>
                ),
              },
              {
                n: 5,
                body: (
                  <>
                    <Text style={styles.bold}>Não é necessário</Text> adicionar{" "}
                    <Text style={styles.bold}>sal até 1 ano</Text> e{" "}
                    <Text style={styles.bold}>açúcar até 2 anos</Text>.
                  </>
                ),
              },
              {
                n: 6,
                body: (
                  <>
                    É <Text style={styles.bold}>PROIBIDO</Text> o consumo de{" "}
                    <Text style={styles.bold}>mel</Text> até os dois anos de
                    idade.
                  </>
                ),
              },
              {
                n: 7,
                body: (
                  <>
                    Oferecer{" "}
                    <Text style={styles.bold}>
                      legumes, frutas e verduras diariamente
                    </Text>
                    .
                  </>
                ),
              },
              {
                n: 8,
                body: (
                  <>
                    Oferecer{" "}
                    <Text style={styles.bold}>água várias vezes ao dia</Text>.
                  </>
                ),
              },
              {
                n: 9,
                body: (
                  <>
                    <Text style={styles.bold}>Não oferecer sucos</Text> aos{" "}
                    <Text style={styles.bold}>menores de 1 ano</Text>. Limitar a{" "}
                    <Text style={styles.bold}>120 mL/dia</Text> (1–3 anos),{" "}
                    <Text style={styles.bold}>175 mL/dia</Text> (4–6 anos) e{" "}
                    <Text style={styles.bold}>250 mL</Text> a partir dos 7 anos.
                  </>
                ),
              },
              {
                n: 10,
                body: (
                  <>
                    <Text style={styles.bold}>Evitar embutidos</Text>, bebidas
                    açucaradas e{" "}
                    <Text style={styles.bold}>ultraprocessados</Text>.
                  </>
                ),
              },
              {
                n: 11,
                body: (
                  <>
                    Não permitir{" "}
                    <Text style={styles.bold}>telas durante as refeições</Text>.
                  </>
                ),
              },
              {
                n: 12,
                body: (
                  <>
                    Atentar aos{" "}
                    <Text style={styles.bold}>sinais de fome e saciedade</Text>{" "}
                    e conversar com a criança durante a refeição.
                  </>
                ),
              },
              {
                n: 13,
                body: (
                  <>
                    Os <Text style={styles.bold}>bons hábitos da família</Text>{" "}
                    são fundamentais para que a criança se alimente bem.
                  </>
                ),
              },
              {
                n: 14,
                body: (
                  <>
                    <Text style={styles.bold}>
                      Permita que a criança explore
                    </Text>{" "}
                    os alimentos: tocar, apertar e cheirar faz parte da
                    experiência de comer.
                  </>
                ),
              },
              {
                n: 15,
                body: <>Proteja as crianças da publicidade de alimentos.</>,
              },
            ].map((item) => (
              <NumberedItem key={item.n} number={item.n}>
                {item.body}
              </NumberedItem>
            ))}
          </CollapsibleSection>

          {/* Section 2 – Adolescentes */}
          <CollapsibleSection
            image={require("../../assets/images/passos-grandes.png")}
            title="15 passos – Adolescentes com Síndrome de Down"
            accentColor="#C97B00"
          >
            {[
              {
                n: 1,
                body: (
                  <>
                    Coma{" "}
                    <Text style={styles.bold}>
                      frutas, legumes e verduras diariamente
                    </Text>
                    .
                  </>
                ),
              },
              {
                n: 2,
                body: (
                  <>
                    Tome <Text style={styles.bold}>água</Text> várias vezes ao
                    dia.
                  </>
                ),
              },
              {
                n: 3,
                body: (
                  <>
                    <Text style={styles.bold}>Evite</Text> embutidos, bebidas
                    açucaradas e{" "}
                    <Text style={styles.bold}>ultraprocessados</Text>.
                  </>
                ),
              },
              {
                n: 4,
                body: (
                  <>
                    <Text style={styles.bold}>Não pule refeições</Text>! Café da
                    manhã, almoço, jantar e lanches intermediários são
                    importantes.
                  </>
                ),
              },
              {
                n: 5,
                body: (
                  <>
                    Tome <Text style={styles.bold}>café da manhã</Text> — uma
                    das refeições mais importantes do dia.
                  </>
                ),
              },
              {
                n: 6,
                body: (
                  <>
                    <Text style={styles.bold}>Evite</Text> comidas com{" "}
                    <Text style={styles.bold}>baixo valor nutricional</Text>.
                  </>
                ),
              },
              {
                n: 7,
                body: (
                  <>
                    Limite sucos, mesmo naturais, a{" "}
                    <Text style={styles.bold}>240 mL por dia</Text>.
                  </>
                ),
              },
              {
                n: 8,
                body: (
                  <>Evite frituras; prefira cozidos, assados e grelhados.</>
                ),
              },
              {
                n: 9,
                body: (
                  <>
                    Consuma fontes de <Text style={styles.bold}>cálcio</Text>{" "}
                    (leite, derivados, vegetais verdes escuros) para{" "}
                    <Text style={styles.bold}>ossos e dentes</Text> saudáveis.
                  </>
                ),
              },
              {
                n: 10,
                body: (
                  <>
                    Consuma <Text style={styles.bold}>carboidratos</Text>{" "}
                    adequadamente — são a{" "}
                    <Text style={styles.bold}>principal fonte de energia</Text>{" "}
                    do corpo.
                  </>
                ),
              },
              {
                n: 11,
                body: (
                  <>
                    Consuma <Text style={styles.bold}>proteínas</Text> (feijão,
                    ovos, carnes, peixes) para{" "}
                    <Text style={styles.bold}>
                      crescimento e fortalecimento muscular
                    </Text>
                    .
                  </>
                ),
              },
              {
                n: 12,
                body: (
                  <>
                    Consuma{" "}
                    <Text style={styles.bold}>
                      sal, açúcar, óleos e gorduras
                    </Text>{" "}
                    com <Text style={styles.bold}>moderação</Text>.
                  </>
                ),
              },
              {
                n: 13,
                body: (
                  <>
                    <Text style={styles.bold}>Não troque a refeição</Text> por
                    lanches.
                  </>
                ),
              },
              {
                n: 14,
                body: (
                  <>
                    <Text style={styles.bold}>Durma bem</Text>.
                  </>
                ),
              },
              {
                n: 15,
                body: (
                  <>
                    Leia o <Text style={styles.bold}>rótulo dos alimentos</Text>{" "}
                    sempre!
                  </>
                ),
              },
            ].map((item) => (
              <NumberedItem key={item.n} number={item.n}>
                {item.body}
              </NumberedItem>
            ))}
          </CollapsibleSection>
        </View>

        {/* ── CLASSIFICAÇÃO + SEMÁFORO (unified card) ── */}
        <View style={styles.tipsCard}>
          <View style={styles.classificationHeader}>
            {/* TODO: replace with food-classification image */}
            <Image
              source={require("../../assets/images/semaforo.png")}
              style={styles.imageSubTitle}
            ></Image>
            <Text style={styles.classificationTitle}>
              Classificação e semáforo dos alimentos
            </Text>
          </View>

          <Text style={styles.classificationIntro}>
            Os alimentos são divididos em quatro grupos conforme seu grau de
            processamento. Pense neles como um{" "}
            <Text style={styles.bold}>semáforo</Text>: quanto mais processado,
            mais atenção é necessária.
          </Text>

          {/* Verde */}
          <View style={styles.classificationRow}>
            <View style={styles.classificationTextBlock}>
              <Text style={styles.classificationLabel}>
                🟢 In natura e minimamente processados
              </Text>
              <Text style={styles.classificationDesc}>
                Folhas, frutos, ovos, leite, arroz, feijão, farinhas —{" "}
                <Text style={styles.bold}>consuma à vontade</Text>.
              </Text>
            </View>
          </View>

          {/* Amarelo */}
          <View style={styles.classificationRow}>
            <View style={styles.classificationTextBlock}>
              <Text style={styles.classificationLabel}>🟡 Processados</Text>
              <Text style={styles.classificationDesc}>
                Conservas, pães, queijos —{" "}
                <Text style={styles.bold}>consumo moderado</Text>.
              </Text>
            </View>
          </View>

          {/* Vermelho */}
          <View style={[styles.classificationRow, { marginBottom: 0 }]}>
            <View style={styles.classificationTextBlock}>
              <Text style={styles.classificationLabel}>
                🔴 Ultraprocessados
              </Text>
              <Text style={styles.classificationDesc}>
                Salgadinhos, bolachas, macarrão instantâneo —{" "}
                <Text style={styles.bold}>evitar sempre que possível</Text>.
                Listas de ingredientes longas com nomes difíceis são um sinal de
                alerta.
              </Text>
            </View>
          </View>
        </View>

        {/* ── ROTULO TIPS CARD ── */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Como ler o rótulo dos alimentos?</Text>
          <TipItem text="A lista de ingredientes vai da maior para a menor quantidade." />
          <TipItem text="Listas longas com nomes difíceis indicam alimento ultraprocessado." />
          <TipItem
            text={`Evite produtos com avisos frontais: "alto em açúcares", "alto em sódio" ou "alto em gordura saturada".`}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: YELLOW_BG,
  },
  scrollContent: {
    paddingBottom: 32,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  /* ── HEADER ── */
  headerCard: {
    backgroundColor: WHITE,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#7A5000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    gap: 12,
  },
  headerTextBlock: {
    flex: 1,
  },
  headerSub: {
    fontSize: 14,
    color: TEXT_MED,
    fontFamily: "Roboto",
    lineHeight: 18,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Roboto-700",
    color: YELLOW_DARK,
    lineHeight: 28,
  },
  imageTitle: {
    height: 55,
    width: 55,
  },
  imageSubTitle: {
    height: 40,
    width: 40,
  },

  /* ── INTRO ── */
  introCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#7A5000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
    color: TEXT_MED,
    fontFamily: "Roboto",
  },
  introTextBold: {
    fontFamily: "Roboto-700",
    color: YELLOW_DARK,
  },

  /* ── SECTION GROUP ── */
  sectionGroup: {
    marginBottom: 12,
  },
  groupLabel: {
    fontSize: 12,
    fontFamily: "Roboto-500",
    color: YELLOW_DARK,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
    paddingLeft: 4,
    opacity: 0.7,
  },

  /* ── COLLAPSIBLE SECTION ── */
  sectionWrapper: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 8,
    shadowColor: "#7A5000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 68,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  sectionImage: {
    width: 54,
    height: 54,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: "Roboto-600",
    flex: 1,
  },
  chevron: {
    fontSize: 26,
    lineHeight: 28,
    marginLeft: 8,
  },
  sectionBody: {
    backgroundColor: WHITE,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },

  /* ── NUMBERED LIST ── */
  numberedRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  numberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: YELLOW_SOFT,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 1,
    flexShrink: 0,
  },
  numberBadgeText: {
    fontSize: 12,
    fontFamily: "Roboto-700",
    color: YELLOW_DARK,
  },
  numberedText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: TEXT_MED,
    fontFamily: "Roboto",
  },
  bold: {
    fontFamily: "Roboto-600",
    color: TEXT_DARK,
  },

  /* ── BULLET ── */
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: YELLOW_MID,
    marginTop: 6,
    marginRight: 10,
    flexShrink: 0,
  },
  bulletLabel: {
    fontFamily: "Roboto-600",
    color: TEXT_DARK,
    fontSize: 15,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: TEXT_MED,
    fontFamily: "Roboto",
  },

  /* ── CLASSIFICATION CARD INTERNALS ── */
  classificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: YELLOW_SOFT,
  },
  classificationTitle: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    fontSize: 16,
    fontFamily: "Roboto-600",
    color: YELLOW_DARK,
  },
  classificationIntro: {
    fontSize: 14,
    lineHeight: 20,
    color: TEXT_MED,
    fontFamily: "Roboto",
    marginBottom: 14,
  },
  classificationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 10,
  },
  trafficDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 5,
    flexShrink: 0,
  },
  classificationTextBlock: {
    flex: 1,
  },
  classificationLabel: {
    fontSize: 14,
    fontFamily: "Roboto-600",
    color: TEXT_DARK,
    marginBottom: 2,
  },
  classificationDesc: {
    fontSize: 14,
    lineHeight: 20,
    color: TEXT_MED,
    fontFamily: "Roboto",
  },

  /* ── TIPS ── */
  tipsCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    shadowColor: "#7A5000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  tipsTitle: {
    fontSize: 16,
    fontFamily: "Roboto-600",
    color: YELLOW_DARK,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: YELLOW_SOFT,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  tipCheck: {
    fontSize: 14,
    color: YELLOW_MID,
    fontFamily: "Roboto-700",
    marginRight: 10,
    marginTop: 3,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: TEXT_MED,
    fontFamily: "Roboto",
  },

  /* ── IMAGE PLACEHOLDER ── */
  imagePlaceholder: {
    width: 58,
    height: 58,
    borderRadius: 12,
    backgroundColor: YELLOW_SOFT,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: YELLOW_MID,
    borderStyle: "dashed",
    flexShrink: 0,
  },
  placeholderImg: {
    width: 36,
    height: 36,
    opacity: 0.4,
  },
  placeholderLabel: {
    fontSize: 8,
    fontFamily: "Roboto-500",
    color: YELLOW_DARK,
    marginTop: 2,
    opacity: 0.7,
  },
});
