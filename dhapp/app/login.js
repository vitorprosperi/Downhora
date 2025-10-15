import ButtonP from '@/components/ButtonP';
import { MyInput } from '@/components/MyInput';
import { MyMaskInput } from '@/components/MyMaskInput';
import { useUsuario } from '@/context/context';
import { Checkbox } from 'expo-checkbox';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as SQLite from 'expo-sqlite';
import NetInfo from '@react-native-community/netinfo';
import { useRef, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { supabase } from "../supabaseserver";

const LogoImage = require('@/assets/images/logodhredondotrans.png');

export default function Login() {
  const [isChecked, setChecked] = useState(false);
  const [cpf, setCpf] = useState("");
  const [cpfMasked, setCpfMasked] = useState('');
  const [senha, setSenha] = useState("");
  const cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  const router = useRouter();
  const { setUserId } = useUsuario();
  const ref_senha = useRef();

  const login = async () => {
    if (!cpf || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const emailFake = `${cpf}@meuapp.com`;
      const netInfo = await NetInfo.fetch();
      const isOnline = false;

      const db = await SQLite.openDatabaseAsync('downhora.db');
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id TEXT PRIMARY KEY NOT NULL,
          nome TEXT,
          access_token TEXT,
          refresh_token TEXT
        );
      `);

      //
      // MODO ONLINE
      //
      if (isOnline) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailFake,
          password: senha,
        });

        if (error) {
          console.error("Erro no login:", error.message);
          Alert.alert("Erro", "CPF ou senha inválidos");
          return;
        }

        const user = data.user;
        console.log("Usuário logado (online):", user);

        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData?.session) {
          const { access_token, refresh_token } = sessionData.session;

          // Se marcar "Manter login", salva a sessão
          if (isChecked) {
            await SecureStore.setItemAsync(
              'supabase_session',
              JSON.stringify(sessionData.session)
            );
            console.log("Sessão salva no SecureStore");
          }

          // Sempre salva no SQLite (para login offline)
          await db.runAsync(
            `INSERT OR REPLACE INTO usuarios (id, nome, access_token, refresh_token)
             VALUES (?, ?, ?, ?)`,
            [user.id, user.user_metadata?.nome || 'Usuário', access_token, refresh_token]
          );

          console.log("Sessão salva no SQLite");
        }

        setUserId(user.id);
        Alert.alert("Sucesso", "Login realizado com sucesso!");
        router.dismissAll();
        router.replace("/telaInicial");
      }
      //
      // MODO OFFLINE
      //
      else {
        const row = await db.getFirstAsync(
          "SELECT id, nome FROM usuarios LIMIT 1"
        );

        if (row?.id) {
          setUserId(row.id);
          console.log("Login offline bem-sucedido:", row.nome);
          Alert.alert("Modo Offline", `Bem-vindo de volta, ${row.nome}!`);
          router.dismissAll();
          router.replace("/telaInicial");
        } else {
          Alert.alert(
            "Sem conexão",
            "Nenhum login anterior encontrado. Conecte-se à internet para fazer login pela primeira vez."
          );
        }
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      Alert.alert("Erro", "Não foi possível realizar o login.");
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280} enableOnAndroid={true}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#FAFAFF' },
          headerTintColor: '#231F20',
          headerTitle: '',
          headerShadowVisible: false,
        }}
      />
      <View style={styles.loginEstilo}>
        <View style={{ flex: 1, width: '80%', justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.imageContainer}>
            <Image source={LogoImage} style={styles.image} />
          </View>

          <Text style={styles.titulo}>Login</Text>

          <View style={styles.containerForm}>
            {/* CPF */}
            <View>
              <Text style={styles.textForm}>CPF</Text>
              <MyMaskInput
                style={styles.input}
                mask={cpfMask}
                value={cpfMasked}
                maxLength={14}
                placeholder="Digite o CPF cadastrado no aplicativo"
                placeholderTextColor="grey"
                keyboardType="numeric"
                onSubmitEditing={() => ref_senha.current.focus()}
                returnKeyType="next"
                submitBehavior='submit'
                onChangeText={(masked, unmasked) => {
                  setCpfMasked(masked);
                  setCpf(unmasked);
                }}
              />
            </View>

            {/* Senha */}
            <View>
              <Text style={styles.textForm}>Senha</Text>
              <MyInput
                ref={ref_senha}
                value={senha}
                onChangeText={setSenha}
                autoComplete='current-password'
                style={styles.input}
                placeholder="Digite a senha"
                placeholderTextColor={'grey'}
                secureTextEntry={true}
              />
            </View>

            {/* Checkbox "Manter login" */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Checkbox color={'#3A7ADC'} value={isChecked} onValueChange={setChecked} />
              <Text style={styles.textForm}>Manter login</Text>
            </View>

            {/* Botão */}
            <View style={{ width: 200, alignSelf: 'center', marginTop: 10 }}>
              <ButtonP label='Entrar' onPress={login} />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  containerForm: {
    justifyContent: 'flex-start',
    gap: 9,
    width: '100%',
    flex: 1,
  },
  input: {
    backgroundColor: '#FAFAFF',
    color: '#231F20',
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: '#231F20',
    borderRadius: 2,
    width: '100%',
    fontSize: 16,
    height: 35,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    fontFamily: 'Roboto',
  },
  loginEstilo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFF',
    width: '100%',
  },
  textForm: {
    color: '#231F20',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  imageContainer: {
    width: 350,
    height: 350,
    marginBottom: 50,
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 100,
  },
  titulo: {
    color: '#231F20',
    fontSize: 20,
    fontWeight: "700",
    fontFamily: 'Raleway-700',
  },
  corEscura: {
    flexGrow: 1,
    backgroundColor: '#FAFAFF',
  },
});
