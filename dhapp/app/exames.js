import { View } from "react-native"
import { FAB } from 'react-native-paper';
import styles from './styleForms';
import { cadastropac } from "../routes/rotas";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Exames(){
    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
        <View style={styles.telaInicio}>

         <FAB
            icon="pencil"
            style={styles.fab}
            customSize={76}
            onPress={cadastropac}
        />
        </View>
        </SafeAreaView>
    );
} 