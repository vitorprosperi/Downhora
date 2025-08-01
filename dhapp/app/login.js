import ButtonP from '@/components/ButtonP';
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useSQLiteContext } from 'expo-sqlite';
import { telaInicial } from '../routes/rotas';

export default function Login (){  
    {/* Controle das variáveis cpf e senha */}
const[cpf, Setcpf] = useState("");
const[senha, Setsenha] = useState("");

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
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <View>
                    <Text style={styles.textForm}>CPF</Text>
                    <TextInput value={cpf} onChangeText={Setcpf} style={styles.input} maxLength={11} keyboardType={"numeric"} placeholder="123.456.789-10"/>
                </View>
                <View>
                    <Text style={styles.textForm}>Senha</Text>
                    <TextInput value={senha} onChangeText={Setsenha} style={styles.input} placeholder="123456" secureTextEntry={true}/>
                </View>
                <ButtonP label='Entrar' onPress={login}></ButtonP>
            </View>
        </View>
    )
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
        gap: 9,
        width: 350,
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
    },
    textForm: {
        color: '#fff',
    }
})