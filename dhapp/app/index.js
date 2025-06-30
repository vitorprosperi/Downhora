import { View, Text, Button} from 'react-native';
import { login, cadastroprof } from './rotas';
import styles from './style';

export default function App (){
    

    return (
        <View style={styles.container}>
            <Text style={styles.textForm}>Projeto Downhora </Text>       
            <Button title='Entrar' onPress={login}/>
            <Button title='Cadastre-se' onPress={cadastroprof}/>
        </View>
    )
}

