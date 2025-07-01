import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// O jeito que eu fiz pro onPress funcionar foi pegar o nome da página pelo atributo(prop) redirect
// que eu criei aqui embaixo e passar pra um router.push no onPress do Pressable. 
// Deve ter uma solução melhor mas não sei react então sinta-se livre pra mudar isso.

type Props = {
    label: string;
    redirect: string;
};


export default function ButtonP({ label, redirect }: Props) {

    return (
        <View>
            <Pressable style={styles.button} onPress={() => router.push(`./${redirect}`)}>
                <Text style={styles.text}>{label}</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FBEC3B',
        width: 200,
        height: 50,
        borderRadius: 2,
    },
    text: {
        color: '#081221',
        fontSize: 16,
    }
})