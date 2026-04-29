import { ButtonP } from "@/components/ButtonP";
import { Modal, StyleSheet, Text, View } from "react-native";

export function CadastroWarningModal({ visible, onContinue }) {
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
          <Text style={styles.title}>Atenção</Text>
          <Text style={styles.body}>
            Este cadastro se refere à pessoa com síndrome de Down. Os dados dos
            responsáveis devem ser preenchidos apenas nos campos específicos.
          </Text>
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
    paddingHorizontal: 16,
  },
  card: {
    width: "92%",
    maxWidth: 560,
    backgroundColor: "#F7F8FB",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#CDD5E4",
  },
  title: {
    fontFamily: "Raleway-700",
    fontSize: 22,
    color: "#1F2530",
    marginBottom: 10,
  },
  body: {
    fontFamily: "Roboto",
    fontSize: 15,
    lineHeight: 24,
    color: "#2B2F39",
  },
  buttonWrap: {
    marginTop: 16,
  },
});
