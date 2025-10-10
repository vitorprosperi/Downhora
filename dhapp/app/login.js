import ButtonP from '@/components/ButtonP';
import { useUsuario } from '@/context/context';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaskInput from 'react-native-mask-input';
import { supabase } from "../supabaseserver";

const LogoImage = require('@/assets/images/logodhredondotrans.png');

export default function Login() {
  // Controle das variáveis cpf e senha
  const [cpf, setCpf] = useState("");
  const [cpfMasked, setCpfMasked] = useState('');
  const [senha, setSenha] = useState("");
  const cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  const router = useRouter();

  const { setUserId } = useUsuario();

  const login = async () => {
    if (cpf === '' || senha === '') {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const emailFake = `${cpf}@meuapp.com`;

      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailFake,
        password: senha,
      });

      if (error) {
        console.error("Erro no login:", error.message);
        Alert.alert("Erro", "CPF ou senha inválidos");
        return;
      }

      setUserId(data.user.id); // salva o id do usuário logado no contexto
      console.log("ID do usuário logado:", data.user.id);

      console.log("Usuário logado:", data.user);
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      router.dismissAll();
      router.replace("/telaInicial");
    } catch (err) {
      console.error("Erro inesperado:", err);
      Alert.alert("Erro", "Não foi possível realizar o login");
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
        <View>
          <Text style={styles.titulo}>Login</Text>
        </View>
        <View style={styles.containerForm}>
          {/* CPF */}
          <View>
            <Text style={styles.textForm}>CPF</Text>
            <MaskInput
              style={styles.input}
              mask={cpfMask}
              value={cpfMasked}
              maxLength={14}
              placeholder="123.456.789-10"
              placeholderTextColor="grey"
              keyboardType="numeric"
              onChangeText={(masked, unmasked) => {
                setCpfMasked(masked);
                setCpf(unmasked); // cpf "limpo" sem pontos e traço
              }}
            />
          </View>

          {/* Senha */}
          <View>
            <Text style={styles.textForm}>Senha</Text>
            <TextInput
              value={senha}
              onChangeText={setSenha}
              style={styles.input}
              placeholder="ex: senh@123"
              placeholderTextColor={'grey'}
              secureTextEntry={true}
            />
          </View>

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