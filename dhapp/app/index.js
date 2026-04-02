import { ButtonP } from "@/components/ButtonP";
import { cadastropac, login } from "@/routes/rotas";
import { supabase } from "@/supabaseserver";
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const LogoImage = require("@/assets/images/logodhredondotrans.png");
export default function App() {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  useEffect(() => {
    const checkSavedSession = async () => {
      try {
        console.log(
          "[Pronto] Iniciando verificação de sessão no SecureStore...",
        );
        const savedSession = await SecureStore.getItemAsync("supabase_session");
        if (savedSession) {
          const session = JSON.parse(savedSession);
          const { data, error } = await supabase.auth.setSession(session);
          if (!error && data.session) {
            console.log(
              "[SecureStore] Sessão restaurada com sucesso:",
              data.session.user?.id,
            );
            router.replace("/telaInicial");
            return;
          } else {
            console.log(
              "[SecureStore] Sessão inválida ou expirada, removendo...",
            );
            await SecureStore.deleteItemAsync("supabase_session");
          }
        } else {
          console.log("[SecureStore] Nenhuma sessão salva.");
        }
      } catch (err) {
        console.error("[Erro] ao restaurar sessão:", err);
      } finally {
        setCheckingSession(false);
      }
    };
    checkSavedSession();
  }, [router]);
  return (
    <View style={styles.indexEstilo}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.logoContainer}>
        <View style={styles.imageContainer}>
          <Image source={LogoImage} style={styles.image} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.textDown}>Down</Text>
          <Text style={styles.textHora}>Hora</Text>
        </View>
      </View>
      <View style={styles.containerBotoes}>
        {checkingSession ? (
          <View style={{ alignItems: "center", padding: 16 }}>
            <ActivityIndicator size="large" />
            <Text style={{ color: "#231F20", marginTop: 8 }}>
              Verificando sessão...
            </Text>
          </View>
        ) : (
          <>
            <ButtonP label="Login" theme="yellow" onPress={login} />
            <ButtonP label="Cadastro" onPress={cadastropac} />
            <TouchableOpacity onPress={() => router.push("/recsenha")}>
              <Text
                style={{ color: "#231F20", textAlign: "center", marginTop: 8 }}
              >
                Esqueci minha senha
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <TouchableOpacity
        onPress={() => Linking.openURL("mailto:downhorarecovery@gmail.com")}
      >
        <Text style={styles.contactText}>
          Contato: downhorarecovery@gmail.com
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  containerBotoes: {
    gap: 10,
    width: "80%",
  },
  textDown: {
    color: "#2261c1",
    fontSize: 40,
    fontFamily: "Raleway-700",
  },
  textHora: {
    color: "#f2aa08",
    fontSize: 40,
    fontFamily: "Raleway-700",
  },
  indexEstilo: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FAFAFF",
  },
  imageContainer: {
    width: 350,
    height: 350,
    marginBottom: 0,
    paddingBottom: 0,
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 100,
    paddingBottom: 0,
    marginBottom: 0,
  },
  logoContainer: {
    marginTop: 50,
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  contactText: {
    color: "#888",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 16,
  },
});
