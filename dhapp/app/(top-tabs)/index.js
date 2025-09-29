// app/(top-tabs)/index.tsx
import { StyleSheet, Text, View } from "react-native";

export default function telaDesenvolvimento() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informações</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});