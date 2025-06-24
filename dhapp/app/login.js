import { View, Text, TextInput } from "react-native";



export default function Login (){
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>CPF</Text>
            <TextInput placeholder="123.456.789-10"/>
            <Text>Senha</Text>
            <TextInput placeholder="123456" secureTextEntry={true}/>
        </View>
    )
}