import ButtonP from '@/components/ButtonP';
import { login } from '@/routes/rotas';
import { StyleSheet, Text, View } from 'react-native';
import { cadastropac, cadastroprof } from '../routes/rotas';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#081221',
    },
    containerBotoes: {
        gap: 10,
        width: '80%',
    },
    textForm: {
        color: '#fff',
    },
});