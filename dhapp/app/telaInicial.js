import { View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { prontuario, exames, vacina } from "../routes/rotas";
import ButtonP from '@/components/ButtonP';
import styles from './styleForms';


export default function telaInicial() {

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
            <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280} enableOnAndroid={true}>
                <View>
                    <ButtonP label='Prontuário' onPress={prontuario}/>
                    <ButtonP label='Exames' onPress={exames}/>
                    <ButtonP label='Vacinação' onPress={vacina}/>
                    <ButtonP label='Informações' onPress={prontuario}/>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>

    );
}
