import { ButtonP } from "@/components/ButtonP";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

function renderFormattedLegalText(content) {
  return content
    .split("\n\n")
    .map((bloco) => bloco.trim())
    .filter(Boolean)
    .map((bloco, index) => {
      const primeiraLinha = bloco.split("\n")[0]?.trim() || "";
      const ehTituloSecao =
        /^\d+\.\s/.test(primeiraLinha) ||
        /^[A-ZÁÀÃÂÉÊÍÓÔÕÚÇ\s]{4,}$/.test(primeiraLinha) ||
        primeiraLinha.endsWith(":");

      return (
        <Text key={`${primeiraLinha}-${index}`} style={ehTituloSecao ? styles.sectionTitle : styles.body}>
          {bloco}
        </Text>
      );
    });
}

export function LegalConsentModal({
  visible,
  title,
  subtitle,
  content,
  accepted,
  onToggleAccepted,
  showError,
  errorMessage,
  checkboxLabel,
  onContinue,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <View style={styles.textContainer}>
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator
            >
              {renderFormattedLegalText(content)}
            </ScrollView>
          </View>

          <Pressable onPress={onToggleAccepted} style={styles.checkboxRow}>
            <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
              {accepted && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>{checkboxLabel}</Text>
          </Pressable>

          {showError && <Text style={styles.error}>{errorMessage}</Text>}

          <View style={styles.buttonWrap}>
            <ButtonP label="Continuar" onPress={onContinue} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(23,27,35,0.58)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  card: {
    backgroundColor: "#F7F8FB",
    width: "94%",
    maxWidth: 620,
    maxHeight: "92%",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#CDD5E4",
  },
  title: {
    fontFamily: "Raleway-700",
    fontSize: 22,
    color: "#231F20",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Roboto-500",
    fontSize: 14,
    color: "#3F4757",
    marginBottom: 14,
  },
  textContainer: {
    borderWidth: 1,
    borderColor: "#CDD5E4",
    borderRadius: 12,
    backgroundColor: "#F7F8FB",
  },
  scroll: {
    maxHeight: 500,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 20,
  },
  body: {
    fontFamily: "Roboto",
    lineHeight: 24,
    fontSize: 14,
    color: "#2B2F39",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "Roboto-700",
    lineHeight: 24,
    fontSize: 14,
    color: "#1F2530",
    marginTop: 4,
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#4F596C",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "transparent",
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: "#2F3645",
    borderColor: "#2F3645",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  checkboxLabel: {
    flex: 1,
    fontFamily: "Roboto-500",
    fontSize: 14,
    lineHeight: 20,
    color: "#232936",
  },
  error: {
    color: "red",
    marginTop: 8,
    fontSize: 13,
    fontFamily: "Roboto-500",
  },
  buttonWrap: {
    marginTop: 16,
  },
});
