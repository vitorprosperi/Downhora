import * as React from "react";
import {
  Animated,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { SafeAreaView } from "react-native-safe-area-context";

const BLUE_BG = "#D6E8F7";
const BLUE_DARK = "#0055AA";
const BLUE_MID = "#0077CC";
const WHITE = "#FFFFFF";
const TEXT_DARK = "#1A1A2E";
const TEXT_MED = "#333355";

function CollapsibleSection({ image, title, children, accentColor = BLUE_MID }) {
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
          <Text style={[styles.sectionTitle, { color: collapsed ? BLUE_DARK : WHITE }]}>
            {title}
          </Text>
        </View>
        <Animated.Text
          style={[
            styles.chevron,
            { color: collapsed ? BLUE_MID : WHITE, transform: [{ rotate }] },
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

function BulletItem({ label, text }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.bulletDot} />
      <Text style={styles.bulletText}>
        {label ? <Text style={styles.bulletLabel}>{label} </Text> : null}
        {text}
      </Text>
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

export default function TelaDesenvolvimento() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER CARD */}
        <View style={styles.headerCard}>
          <Image
            source={require("../../assets/images/Cabeca de bebe.png")}
            style={styles.headerImage}
          />
          <View style={styles.headerTextBlock}>
            <Text style={styles.headerSub}>Desenvolvimento da criança com</Text>
            <Text style={styles.headerTitle}>Síndrome de Down</Text>
          </View>
        </View>

        {/* INTRO */}
        <View style={styles.introCard}>
          <Text style={styles.introText}>
            Toda criança com{" "}
            <Text style={styles.introTextBold}>Síndrome de Down</Text> tem seu próprio
            ritmo de desenvolvimento. Todos os marcos de desenvolvimento vão acontecer na
            vida da criança com síndrome de Down. O importante é acompanhar as conquistas,
            estimular no dia a dia e contar com o apoio de profissionais de saúde.
          </Text>
        </View>

        {/* MARCOS */}
        <View style={styles.sectionGroup}>
          <Text style={styles.groupLabel}>Marcos de desenvolvimento</Text>

          <CollapsibleSection
            image={require("../../assets/images/Bebe engatinhando.png")}
            title="Até 1 ano"
            accentColor="#0077CC"
          >
            <BulletItem label="Sorriso social:" text="entre 1,5 e 5 meses." />
            <BulletItem
              label="Sentar sozinho:"
              text="pode acontecer a partir de 6 meses, mas pode levar até 2 anos e meio."
            />
            <BulletItem
              label="Engatinhar ou se deslocar:"
              text="geralmente entre 8 meses e quase 2 anos."
            />
            <BulletItem
              label="Comer com os dedos:"
              text="pode iniciar entre 10 meses e 2 anos."
            />
          </CollapsibleSection>

          <CollapsibleSection
            image={require("../../assets/images/Bebe bebendo agua.png")}
            title="De 1 a 3 anos"
            accentColor="#0066BB"
          >
            <BulletItem text="Andar sem ajuda." />
            <BulletItem text="Beber no copo." />
            <BulletItem text="Usar colher." />
            <BulletItem text="Primeiras palavras." />
          </CollapsibleSection>

          <CollapsibleSection
            image={require("../../assets/images/Bebe falando.png")}
            title="A partir de 3 anos"
            accentColor="#0055AA"
          >
            <BulletItem
              label="Frases de duas palavras:"
              text="podem aparecer a partir dos 2 anos, mas podem levar até 7 anos e meio."
            />
            <BulletItem
              label="Controle de esfíncteres:"
              text="pode ocorrer entre 2 e 7 anos."
            />
            <BulletItem
              label="Vestir-se com ajuda:"
              text="entre 3 anos e meio e 8 anos e meio."
            />
          </CollapsibleSection>
        </View>

        {/* COMO ESTIMULAR */}
        <View style={styles.stimulateCard}>
          <Image
            source={require("../../assets/images/Balao interrogacao.png")}
            style={styles.stimulateImage}
            resizeMode="contain"
          />
          <View style={styles.stimulateTextBlock}>
            <Text style={styles.stimulateTitle}>Como estimular o desenvolvimento?</Text>
            <Text style={styles.stimulateText}>
              Planejar brincadeiras em grupo, contar histórias, desenhar e pintar, oferecer
              jogos simples de encaixe e memória, incentivar a participação da criança nas
              pequenas tarefas do dia a dia.
            </Text>
          </View>
        </View>

        {/* DICAS */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Dicas importantes</Text>
          <TipItem text="Cada criança tem seu próprio ritmo, respeite o tempo dela." />
          <TipItem text="Estimule com paciência, brincadeiras e carinho." />
          <TipItem text="O acompanhamento com pediatra, fonoaudiólogo, fisioterapeuta e terapeuta ocupacional ajuda no desenvolvimento." />
          <TipItem text="Valorize sempre as conquistas do seu filho." />
        </View>

        {/* REFERÊNCIAS */}
        <View style={styles.refsCard}>
          <Text style={styles.refsTitle}>Referências</Text>
          <Text style={styles.refsText}>National Down Syndrome Society (NDSS)</Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://saut.org.sa/page-developmental-milestones%26lang%3DEnglish"
              )
            }
          >
            <Text style={styles.refsLink}>Saut – The Voice of Down Syndrome Society</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.growthcharts.com/")}
          >
            <Text style={styles.refsLink}>Growth Charts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE_BG,
  },
  scrollContent: {
    paddingBottom: 32,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  /* HEADER */
  headerCard: {
    backgroundColor: WHITE,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#0055AA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    gap: 10,
  },
  headerImage: {
    width: 50,
    height: 50,
  },
  headerTextBlock: {
    flex: 1,
  },
  headerSub: {
    fontSize: 16,
    color: TEXT_MED,
    fontFamily: "Roboto",
    lineHeight: 18,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Roboto-700",
    color: BLUE_DARK,
    lineHeight: 28,
  },

  /* INTRO */
  introCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#0055AA",
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
    color: BLUE_DARK,
  },

  /* SECTION GROUP */
  sectionGroup: {
    marginBottom: 12,
  },
  groupLabel: {
    fontSize: 12,
    fontFamily: "Roboto-500",
    color: BLUE_DARK,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
    paddingLeft: 4,
    opacity: 0.7,
  },

  /* COLLAPSIBLE SECTION */
  sectionWrapper: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 8,
    shadowColor: "#0055AA",
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
    fontSize: 16,
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

  /* BULLET */
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: BLUE_MID,
    marginTop: 7,
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

  /* STIMULATE */
  stimulateCard: {
    backgroundColor: BLUE_DARK,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#0033AA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  stimulateImage: {
    width: 58,
    height: 58,
    marginRight: 14,
    flexShrink: 0,
  },
  stimulateTextBlock: {
    flex: 1,
  },
  stimulateTitle: {
    fontSize: 15,
    fontFamily: "Roboto-600",
    color: WHITE,
    marginBottom: 6,
  },
  stimulateText: {
    fontSize: 13,
    lineHeight: 19,
    color: "rgba(255,255,255,0.85)",
    fontFamily: "Roboto",
  },

  /* TIPS */
  tipsCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    shadowColor: "#0055AA",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  tipsTitle: {
    fontSize: 16,
    fontFamily: "Roboto-600",
    color: BLUE_DARK,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: BLUE_BG,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  tipCheck: {
    fontSize: 14,
    color: BLUE_MID,
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

  /* REFS */
  refsCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#0055AA",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  refsTitle: {
    fontSize: 14,
    fontFamily: "Roboto-600",
    color: TEXT_MED,
    marginBottom: 6,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: BLUE_BG,
  },
  refsText: {
    fontSize: 13,
    color: TEXT_MED,
    fontFamily: "Roboto",
    marginBottom: 2,
  },
  refsLink: {
    fontSize: 13,
    color: BLUE_MID,
    fontFamily: "Roboto",
    marginBottom: 2,
    textDecorationLine: "underline",
  },
});