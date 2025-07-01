import ButtonP from '@/components/ButtonP';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import styles from './style';

export default function App (){
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.textForm}>Nova Tela</Text>
            <ButtonP label='Voltar' onPress={router.back}></ButtonP>
            {/* <Button title="Voltar" onPress={router.back} /> */}
        </View>
    )
} 