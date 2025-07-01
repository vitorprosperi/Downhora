import ButtonP from '@/components/ButtonP';
import { Text, View } from 'react-native';
import styles from './style';

export default function App (){
    

    return (
        <View style={styles.container}>
            <Text style={styles.textForm}>Projeto Downhora </Text>  
            <View style={styles.containerBotoes}>
                {/* <Button title='Entrar' onPress={login}/> */}
                <ButtonP label='Entrar' redirect='login'></ButtonP>
                <ButtonP label='Cadastre-se' redirect='second'></ButtonP>
                {/* <Button title='Cadastre-se' onPress={cadastroprof}/> */}
            </View>     
        </View>
    )
}

