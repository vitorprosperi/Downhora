import { View, Text, Button} from 'react-native';
import { login, cadastroprof } from './rotas';


export default function App (){
    

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Projeto Downhora </Text>       
            <Button title='Entrar' onPress={login}/>
            <Button title='Cadastre-se' onPress={cadastroprof}/>
        </View>
    )
} 