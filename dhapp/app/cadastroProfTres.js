import { useState } from "react";
import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import { finalizarCadastro } from "../routes/rotas";
import ButtonP from "../components/ButtonP";

export default function CadastroProfissionalTres() {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  return (
    <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.container}>
      <View style={styles.containerForm}>
        <View style={{ marginBottom: 16 }}>
          <Text style={[styles.textForm, { fontSize: 18, fontWeight: "bold" }]}>
            Cadastro de Profissional
          </Text>
          <Text style={styles.textForm}>Senha do aplicativo DownHora</Text>
        </View>

        <Text style={styles.textForm}>Senha*</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <Text style={styles.textForm}>Confirmar senha*</Text>
        <TextInput
          style={styles.input}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        <View style={{ marginTop: 16 }}>
          <ButtonP label="Finalizar cadastro" onPress={finalizarCadastro} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#081221',
    paddingVertical: 50,
  },
  containerForm: {
    justifyContent: 'flex-start',
    gap: 5,
    width: 210,
  },
  input: {
    backgroundColor: '#081221',
    color: '#fff',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 2,
    width: '100%',
    marginBottom: 8,
  },
  textForm: {
    color: '#fff',
  }
});