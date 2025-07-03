import ButtonP from '@/components/ButtonP';
import { Text, View } from 'react-native';
import { cadastropac, login } from './rotas';
import styles from './style';
import CadastroPac from './cadastroPac';

export default function App (){
    

    return (
        <View style={styles.container}>
            <Text style={styles.textForm}>Projeto Downhora </Text>  
            <View style={styles.containerBotoes}>
                <ButtonP label='Entrar' onPress={login}></ButtonP>
                <ButtonP label='Cadastre-se' onPress={cadastropac}></ButtonP>
            </View>     
        </View>
    )
}

