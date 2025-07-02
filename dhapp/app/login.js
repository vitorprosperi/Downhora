import ButtonP from '@/components/ButtonP';
import { View, Text, TextInput } from "react-native";
import { useState } from "react";
import styles from "./style";

export default function Login (){  
    {/* Controle das variáveis cpf e senha */}
const[cpf, Setcpf] = useState("");
const[senha, Setsenha] = useState("");

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
                <ButtonP label='Entrar' onPress={() => console.log (cpf, senha)}></ButtonP>
            </View>
        </View>
    )
}