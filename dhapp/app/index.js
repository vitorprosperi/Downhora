import { View, Text, Button, TextInput } from 'react-native';
import {useRouter} from 'expo-router';


export default function App (){
    const router = useRouter();

    const novapagina = () => {
        router.push('/second');
    };


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hello World</Text>
            <TextInput placeholder="Digite algo"/>       
            <Button title='Próximo' onPress={novapagina}/>
        </View>
    )
} 