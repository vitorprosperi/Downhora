import { Pressable, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { exames, prontuario, vacina } from "../routes/rotas";
import styles from './styleForms';


export default function telaInicial() {

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
            <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280} enableOnAndroid={true}>
                <View style={styles.contInicial}>
                    <View >
                        <Pressable style={btstyle.button} onPress={prontuario}>
                            <Text style={btstyle.text}>Prontuário</Text>
                        </Pressable>
                    </View>
                    <View >
                        <Pressable style={btstyle.button} onPress={exames}>
                            <Text style={btstyle.text}>Exames</Text>
                        </Pressable>
                    </View>
                    <View >
                        <Pressable style={btstyle.button} onPress={vacina}>
                            <Text style={btstyle.text}>Vacinação</Text>
                        </Pressable>
                    </View>
                    <View >
                        <Pressable style={btstyle.button} onPress={prontuario}>
                            <Text style={btstyle.text}>Informações</Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>

    );
}

const btstyle = StyleSheet.create({
    button: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#FBEC3B',
        width: 350,
        height: 100,
        borderRadius: 10,
    },
    text: {
        color: '#081221',
        fontSize: 30,
    },
})
