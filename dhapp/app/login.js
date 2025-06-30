import { View, Text, TextInput } from "react-native";
import styles from "./style";


export default function Login (){
    return (
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <View>
                    <Text style={styles.textForm}>CPF</Text>
                    <TextInput maxLength={11} keyboardType={"numeric"} placeholder="123.456.789-10"/>
                </View>
                <View>
                    <Text style={styles.textForm}>Senha</Text>
                    <TextInput style={styles.input} placeholder="123456" secureTextEntry={true}/>
                </View>
            </View>
        </View>
    )
}