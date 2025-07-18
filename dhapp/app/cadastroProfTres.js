import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProfissional } from "@/context/context";
import ButtonP from "@/components/ButtonP";
import { finalizarCadastro } from "../routes/rotas";

export default function CadastroProfissionalSenha() {
  const { setProfissionaldados } = useProfissional();
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleFinalizar = () => {
    if (!senha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha os dois campos de senha.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    setProfissionaldados((prev) => ({
      ...prev,
      senha: senha, 
    }));

    finalizarCadastro(); 
  };

  return (
    <KeyboardAwareScrollView extraHeight={200} enableOnAndroid={true}>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerForm}>
          <View>
            <Text style={styles.textForm}>Senha*</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              onChangeText={setSenha}
              value={senha}
            />
          </View>

          <View>
            <Text style={styles.textForm}>Confirmar senha*</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              onChangeText={setConfirmarSenha}
              value={confirmarSenha}
            />
          </View>

          <ButtonP label="Finalizar cadastro" onPress={handleFinalizar} />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#081221',
  },
  containerForm: {
    justifyContent: 'flex-start',
    gap: 10,
    width: '90%',
  },
  input: {
    backgroundColor: '#081221',
    color: '#fff',
    paddingVertical: 0,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 2,
    width: '100%',
    fontSize: 16,
    height: 35,
  },
  textForm: {
    color: '#fff',
    fontSize: 16,
  },
});