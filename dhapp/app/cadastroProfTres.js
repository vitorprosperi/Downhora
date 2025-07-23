import ButtonP from "@/components/ButtonP";
import { useProfissional } from "@/context/context";
import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { finalizarCadastro } from "../routes/rotas";
import styles from "./styleForms";

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
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
      <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280} enableOnAndroid={true}>
        <View style={styles.container}>
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
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
