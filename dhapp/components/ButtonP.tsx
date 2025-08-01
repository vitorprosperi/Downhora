import { Pressable, StyleSheet, Text, View } from 'react-native';

// O jeito que eu fiz esse botao foi com o app tutorial do expo + stackoverflow entao talvez esteja errado.
// Até o momento funciona mas se vc souber fazer mais bonito pode mexer a vontade
// dou o bumbum

type Props = {
    label: string;
    onPress(): void;
    theme: string;
};


export default function ButtonP({label, onPress, theme}: Props) {

    
    return (
        <View style={{width: '100%'}}>
            <Pressable style={[theme === 'transparent' ? styles.transparent : styles.button]} onPress={onPress}>
                <Text style={[theme === 'transparent' ? styles.textTrans : styles.text]}>{label}</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#FBEC3B',
        width: '100%',
        height: 50,
        borderRadius: 10,
    },
    transparent: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#081221',
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderColor: 'lightgrey',
        borderStyle: 'solid',
        borderWidth: 2,
    },
    text: {
        color: '#081221',
        fontSize: 16,
    },
    textTrans: {
        color: 'white',
        fontSize: 16,
    }
})