import { View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cadastropac } from "../routes/rotas";
import styles from './styleForms';


export default function telaInicial() {

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
            <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280} enableOnAndroid={true}>
                <View style={styles.telaInicio}>

                    <FAB
                        icon="plus"
                        style={styles.fab}
                        customSize={76}
                        onPress={cadastropac}
                    />

                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>

    );
}
