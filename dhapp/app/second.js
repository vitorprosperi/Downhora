import { View, Text, Button } from 'react-native';
import {useRouter} from 'expo-router';

export default function App (){
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Nova Tela</Text>
            <Button title="Voltar" onPress={router.back} />
        </View>
    )
} 