import { ButtonP } from "@/components/ButtonP";
import { MyInput } from "@/components/MyInput";
import { Stack } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { supabase } from "../supabaseserver";

export default function RecuperacaoSenha() {
  const [email, setEmail] = useState("");

  const RecuperacaoSenha = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira o e-mail.");
      return;
    }

    try {
      // Envia o e-mail de recuperação de senha
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        Alert.alert(
          "Erro",
          "Falha ao enviar o e-mail de recuperação. Verifique se o e-mail está correto.",
        );
      } else {
        Alert.alert("Sucesso", "E-mail de recuperação enviado!");
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      Alert.alert(
        "Erro",
        "Ocorreu um erro inesperado. Tente novamente mais tarde.",
      );
    }
  };

  return (
    <View style={styles.view}>
      <Stack.Screen
        options={{
          title: "Esqueci minha senha",
          headerShadowVisible: true,
        }}
      />
      <Text style={styles.titulo}>Recuperar conta</Text>
      <View style={styles.containerForm}>
        <Text style={styles.textForm}>
          Por favor insira o e-mail associado a sua conta.
        </Text>
        <MyInput
          placeholder="Digite seu e-mail"
          placeholderTextColor="grey"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        <View style={{ width: 200, alignSelf: "center", marginTop: 10 }}>
          <ButtonP label="Enviar" onPress={RecuperacaoSenha} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerForm: {
    width: "100%",
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textForm: {
    color: "#231F20",
    fontSize: 16,
    fontFamily: "Roboto",
  },
  view: {
    flex: 1,
    backgroundColor: "#FAFAFF",
    width: "100%",
  },
  input: {
    backgroundColor: "#FAFAFF",
    color: "#231F20",
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: "#231F20",
    borderRadius: 2,
    width: "100%",
    fontSize: 16,
    height: 35,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    lineHeight: 24,
    fontFamily: "Roboto",
  },
  titulo: {
    color: "#231F20",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Raleway-700",
    paddingLeft: 10,
  },
});
