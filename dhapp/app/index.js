import ButtonP from '@/components/ButtonP';
import { Text, View } from 'react-native';
import { cadastroprof, login } from './rotas';
import styles from './style';

export default function App (){
    

    return (
        <View style={styles.container}>
            <Text style={styles.textForm}>Projeto Downhora </Text>  
            <View style={styles.containerBotoes}>
                <ButtonP label='Entrar' onPress={login}></ButtonP>
                <ButtonP label='Cadastre-se' onPress={cadastroprof}></ButtonP>
            </View>     
        </View>
    )
}

