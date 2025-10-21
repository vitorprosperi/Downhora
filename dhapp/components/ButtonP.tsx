import { Pressable, StyleSheet, Text, View } from 'react-native';

// O jeito que eu fiz esse botao foi com o app tutorial do expo + stackoverflow entao talvez esteja errado.
// Até o momento funciona mas se vc souber fazer mais bonito pode mexer a vontade
// dou o bumbum

export const ButtonP = (props: any) => {

    return (
        <View style={{ width: '100%' }}>
            {props.theme === 'yellow' ?
                <Pressable style={({ pressed }) => (pressed ? styles.yellowHighlight : styles.yellow)} onPress={props.onPress}>
                    <Text style={styles.textTrans}>{props.label}</Text>
                </Pressable>
                :
                <Pressable style={({ pressed }) => (pressed ? styles.buttonHighlight : styles.button)} onPress={props.onPress}>
                    <Text style={styles.text}>{props.label}</Text>
                </Pressable>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#2261C1',
        width: '100%',
        height: 50,
        borderRadius: 10,
    },
    buttonHighlight: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'hsl(216, 70%, 40%)',
        width: '100%',
        height: 50,
        borderRadius: 10,
    },
    yellow: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2AA08',
        width: '100%',
        height: 50,
        borderRadius: 10,
    },
    yellowHighlight: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'hsl(42, 94%, 55%)',
        width: '100%',
        height: 50,
        borderRadius: 10,
    },
    text: {
        color: '#FAFAFF',
        fontSize: 16,
        fontFamily: 'Raleway-500',
    },
    textTrans: {
        color: '#231F20',
        fontSize: 16,
        fontFamily: 'Raleway-500',
    }
})