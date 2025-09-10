import { View } from "react-native";
import { FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cadastropac } from "../routes/rotas";
import styles from './styleForms';

export default function Vacina(){
    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
        <View style={styles.telaInicio}>

         <FAB
            icon="upload"
            color="#FAFAFF"
            style={styles.fab}
            customSize={76}
            onPress={cadastropac}
            mode="flat"
        />
        </View>
        </SafeAreaView>
    );
} 