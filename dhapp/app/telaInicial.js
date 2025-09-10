import { Pressable, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { exames, prontuario, vacina } from "../routes/rotas";
import styles from './styleForms';


export default function telaInicial() {

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
            <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280} enableOnAndroid={true}>
                <View style={styles.contInicial}>
                    <View style={btstyle.botoesContainer}>
                        <View >
                            <Pressable style={btstyle.button} onPress={prontuario}>
                                <Icon
                                    source="content-paste"
                                    color='#2261c1'
                                    size={45}
                                />
                                <Text style={btstyle.text}>Prontuário</Text>
                            </Pressable>
                        </View>
                        <View >
                            <Pressable style={btstyle.button} onPress={exames}>
                                <Icon
                                    source="calendar-multiselect"
                                    color='#2261c1'
                                    size={45}
                                />
                                <Text style={btstyle.text}>Exames</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={btstyle.botoesContainer}>
                        <View >
                            <Pressable style={btstyle.button} onPress={vacina}>
                                <Icon
                                    source="needle"
                                    color='#2261c1'
                                    size={45}
                                />
                                <Text style={btstyle.text}>Vacinação</Text>
                            </Pressable>
                        </View>
                        <View >
                            <Pressable style={btstyle.button} onPress={prontuario}>
                                <Icon
                                    source="information-outline"
                                    color='#2261c1'
                                    size={45}
                                />
                                <Text style={btstyle.text}>Informações</Text>
                            </Pressable>
                        </View>
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
        backgroundColor: '#FFFFFF',
        width: 'auto',
        aspectRatio: '1/1',
        height: 160,
        borderRadius: 10,
    },
    text: {
        color: '#2261C1',
        fontSize: 25,
    },
    botoesContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    }
})
