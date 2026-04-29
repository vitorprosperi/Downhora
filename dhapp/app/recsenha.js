import { ButtonP } from "@/components/ButtonP";
import { MyInput } from "@/components/MyInput";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, Image } from "react-native";
import { supabase } from "../supabaseserver";
import { ActivityIndicator } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

const LogoImage = require("@/assets/images/logodhredondotrans.png");

const CHAVE_COOLDOWN_RECUPERACAO = "cooldown_recuperacao_senha";
const TEMPO_COOLDOWN_SEGUNDOS = 60;

export default function RecuperacaoSenha() {
  const [email, setEmail] = useState("");
  const [emailCarregando, setEmailCarregando] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(0);

  useEffect(() => {
    carregarCooldownSalvo();
  }, []);

  useEffect(() => {
    if (tempoRestante <= 0) return;

    const interval = setInterval(() => {
      setTempoRestante((valorAtual) => {
        if (valorAtual <= 1) {
          clearInterval(interval);
          return 0;
        }
        return valorAtual - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tempoRestante]);

  const carregarCooldownSalvo = async () => {
    try {
      const expiracaoSalva = await SecureStore.getItemAsync(
        CHAVE_COOLDOWN_RECUPERACAO
      );

      if (!expiracaoSalva) return;

      const expiracaoEmMs = Number(expiracaoSalva);
      const agora = Date.now();
      const diferencaEmSegundos = Math.ceil((expiracaoEmMs - agora) / 1000);

      if (diferencaEmSegundos > 0) {
        setTempoRestante(diferencaEmSegundos);
      } else {
        await SecureStore.deleteItemAsync(CHAVE_COOLDOWN_RECUPERACAO);
        setTempoRestante(0);
      }
    } catch (error) {
      console.error("Erro ao carregar cooldown salvo:", error);
    }
  };

  const iniciarCooldown = async () => {
    const expiracaoEmMs = Date.now() + TEMPO_COOLDOWN_SEGUNDOS * 1000;

    try {
      await SecureStore.setItemAsync(
        CHAVE_COOLDOWN_RECUPERACAO,
        String(expiracaoEmMs)
      );
      setTempoRestante(TEMPO_COOLDOWN_SEGUNDOS);
    } catch (error) {
      console.error("Erro ao salvar cooldown:", error);
      setTempoRestante(TEMPO_COOLDOWN_SEGUNDOS);
    }
  };

  const enviarRecuperacaoSenha = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira o e-mail.");
      return;
    }

    if (tempoRestante > 0 || emailCarregando) {
      return;
    }

    setEmailCarregando(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase()
      );

      if (error) {
        Alert.alert(
          "Erro",
          "Falha ao enviar o e-mail de recuperação. Verifique se o e-mail está correto."
        );
      } else {
        Alert.alert("Sucesso", "E-mail de recuperação enviado!");
        await iniciarCooldown();
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      Alert.alert(
        "Erro",
        "Ocorreu um erro inesperado. Tente novamente mais tarde."
      );
    } finally {
      setEmailCarregando(false);
    }
  };

  const formatarTempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.view}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
        }}
      />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={LogoImage}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.titulo}>Recuperar conta</Text>

        <View style={styles.containerForm}>
          <Text style={styles.textForm}>
            Insira o e-mail associado à sua conta.
          </Text>

          <MyInput
            placeholder="Digite seu e-mail"
            placeholderTextColor="grey"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <ButtonP
              onPress={enviarRecuperacaoSenha}
              disabled={emailCarregando || tempoRestante > 0}
              label={
                emailCarregando ? (
                  <ActivityIndicator color="#FAFAFF" />
                ) : tempoRestante > 0 ? (
                  `Reenviar em ${formatarTempo(tempoRestante)}`
                ) : (
                  "Enviar"
                )
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#FAFAFF",
    width: "100%",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  logoContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },

  logo: {
    width: 200,
    height: 200,
  },

  titulo: {
    color: "#231F20",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Raleway-700",
    textAlign: "center",
    marginBottom: 10,
  },

  containerForm: {
    width: "100%",
    maxWidth: 360,
    marginTop: 8,
  },

  textForm: {
    color: "#231F20",
    fontSize: 16,
    fontFamily: "Roboto",
    textAlign: "center",
    marginBottom: 16,
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
    height: 42,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    lineHeight: 24,
    fontFamily: "Roboto",
  },
  buttonContainer: {
    width: 220,
    alignSelf: "center",
    marginTop: 22,
  },
});