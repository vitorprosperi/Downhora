import { ButtonP } from '@/components/ButtonP';
import { MyInput } from '@/components/MyInput';
import { MyMaskInput } from '@/components/MyMaskInput';
import { useUsuario } from '@/context/context';
import NetInfo from '@react-native-community/netinfo';
import { Checkbox } from 'expo-checkbox';
import { Image } from 'expo-image';
import {sincronizarFila} from '../Initializer/appinitializer';
import { Stack, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useRef, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native-paper';
import { getDB } from '../database';
import { SupabaseSinc } from '../supabaseSinc/supabaseSinc';
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
  const [loginCarregando, setLoginCarregando] = useState(false);

  const login = async () => {
    if (!cpf || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    setLoginCarregando(true);

    try {
      const emailFake = `${cpf}@meuapp.com`;
      const netInfo = await NetInfo.fetch();
      const isOnline = netInfo.isConnected;

      // Garante inicialização segura do banco
      const db = await getDB().catch((err) => {
        console.error("Erro ao abrir o banco:", err);
        return null;
      });

      if (!db) {
        setLoginCarregando(false);
        Alert.alert("Erro", "Falha ao inicializar o banco de dados local.");
        return;
      }

      // MODO ONLINE
      if (isOnline) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailFake,
          password: senha,
        });

        if (error) {
          setLoginCarregando(false);
          Alert.alert("Erro", "CPF ou senha inválidos.");
          return;
        }

        const user = data.user;

        // Verifica se o perfil existe
        const { data: perfil } = await supabase
          .from("usuarios")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (!perfil) {
          setLoginCarregando(false);
          Alert.alert("Erro", "CPF ou senha inválidos.");
          return;
        }

        // Obtém a sessão do Supabase
        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData?.session) {
          const { access_token, refresh_token } = sessionData.session;

          // Salvar sessão no SecureStore (se marcado)
          if (isChecked) {
            await SecureStore.setItemAsync(
              'supabase_session',
              JSON.stringify(sessionData.session)
            );
          }

          // Salvar sessão no SQLite
          await db.withTransactionAsync(async () => {
            await db.runAsync(
              `INSERT OR REPLACE INTO sessoes (usuario_id, cpf, access_token, refresh_token)
               VALUES (?, ?, ?, ?)`,
              [user.id, cpf, access_token, refresh_token]
            );
          });
        }

        setUserId(user.id);
        Alert.alert("Sucesso", "Login realizado com sucesso!");
        router.dismissAll();
        router.replace("/telaInicial");

        // **Aqui** chamamos a sincronização após o login bem-sucedido
        console.log("Sincronizando dados após login...");
        const db2 = await getDB();
        await sincronizarFila(db2); // push pendentes
        await SupabaseSinc(db2, user.id); // pull / merge
      }

      // MODO OFFLINE 
      else {
        // Busca sessão no SQLite
        const sessao = await db.getFirstAsync(
          "SELECT usuario_id AS id, access_token, refresh_token FROM sessoes WHERE cpf = ?",
          [cpf]
        );

        if (!sessao?.id) {
          setLoginCarregando(false);
          Alert.alert(
            "Sem conexão",
            "Nenhum login anterior encontrado. Faça login uma vez com internet."
          );
          return;
        }

        // Verifica se o usuário existe no SQLite
        const usuarioLocal = await db.getFirstAsync(
          "SELECT * FROM usuarios WHERE id = ?",
          [sessao.id]
        );

        if (!usuarioLocal) {
          setLoginCarregando(false);
          Alert.alert("Erro", "Sessão inválida. Faça login online novamente.");
          return;
        }

        setUserId(sessao.id);
        Alert.alert("Modo Offline", "Bem-vindo de volta!");
        router.dismissAll();
        router.replace("/telaInicial");
      }

    } catch (err) {
      console.error("Erro inesperado:", err);
      Alert.alert("Erro", "Não foi possível realizar o login.");
    }

    setLoginCarregando(false);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280}>
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

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Checkbox 
                color={'#3A7ADC'} 
                value={isChecked} 
                onValueChange={() => setChecked(!isChecked)} 
              />
              <Text style={styles.textForm}>Manter login</Text>
            </View>

            <View style={{ width: 200, alignSelf: 'center', marginTop: 10 }}>
              {loginCarregando ? (
                <ButtonP onPress={login} label={<ActivityIndicator color='#FAFAFF' />} />
              ) : (
                <ButtonP label='Entrar' onPress={login} />
              )}
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
    gap: 10,
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
    lineHeight: 24,
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
    lineHeight: 20,
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