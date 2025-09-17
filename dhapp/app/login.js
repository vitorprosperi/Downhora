import ButtonP from '@/components/ButtonP';
import { Image } from 'expo-image';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import MaskInput from 'react-native-mask-input';
import { telaInicial } from '../routes/rotas';

const LogoImage = require('@/assets/images/logodhredondotrans.png');

export default function Login() {
  // Controle das variáveis cpf e senha
  const [cpf, setCpf] = useState("");
  const [cpfMasked, setCpfMasked] = useState('');
  const [senha, Setsenha] = useState("");
  const cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  const db = useSQLiteContext();

  const login = async () => {
    if (cpf === '' || senha === '') {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const result = await db.getAllAsync(
        'SELECT * FROM Profissional WHERE cpf = ? AND senha_hash = ?',
        [cpf, senha]
      );

      if (result.length > 0) {
        const usuario = result[0];
        console.log('Login bem-sucedido:', usuario);
        telaInicial();
      } else {
        alert('CPF ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <View style={styles.loginEstilo}>
      <View style={{ flex: 1, width: '80%', justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.imageContainer}>
          <Image source={LogoImage} style={styles.image} />
        </View>
        <View>
          <Text style={styles.titulo}>Login</Text>
        </View>
        <View style={styles.containerForm}>
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
                setCpf(unmasked);
              }}
            />
          </View>
          <View>
            <Text style={styles.textForm}>Senha</Text>
            <TextInput
              value={senha}
              onChangeText={Setsenha}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFF',
  },
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
  },
  imageContainer: {
    width: 350,
    height: 350,
    paddingBottom: 400,
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 100,
    paddingBottom: 0,
    marginBottom: 0,
  },
  titulo: {
    color: '#231F20',
    fontSize: 20,
    fontWeight: 700,
  },
})