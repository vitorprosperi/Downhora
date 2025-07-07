import ButtonP from '@/components/ButtonP';
import { Text, View } from 'react-native';
import { cadastropac, login } from '@/routes/rotas';
import styles from './style';

export default function App (){
    

    return (
        <View style={styles.container}>
            <Text style={styles.textForm}>Projeto Downhora </Text>  
            <View style={styles.containerBotoes}>
                <ButtonP label='Entrar' onPress={login}></ButtonP>
                {/* Eu só to usando o botão cadastre-se para checar a tela que to fazendo, só mudar o onPress pra tela correta quando for mexer*/}
                <ButtonP label='Cadastre-se' onPress={cadastropac}></ButtonP>
            </View>     
        </View>
    )
}

