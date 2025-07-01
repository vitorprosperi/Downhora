import { Pressable, StyleSheet, Text, View } from 'react-native';

// O jeito que eu fiz esse botao foi com o app tutorial do expo + stackoverflow entao talvez esteja errado.
// Até o momento funciona mas se vc souber fazer mais bonito pode mexer a vontade
// dou o bumbum

type Props = {
    label: string;
    onPress(): void;
};


export default function ButtonP({label, onPress}: Props) {

    
    return (
        <View>
            <Pressable style={styles.button} onPress={onPress}>
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