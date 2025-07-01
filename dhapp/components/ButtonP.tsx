import React from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';

// O jeito que eu fiz esse botao foi com o app tutorial do expo + google entao talvez esteja errado.
// E a linha gigante definindo o tipo do props foi um quick fix do vscode.
// Ainda não sei react sinto mto pode mudar essa lógica se vc souber um modo mais bonito. (mas ta funcionando por enquanto)

type Props = {
    label: string;
};


export default function ButtonP(props: { onPress: ((event: GestureResponderEvent) => void) | null | undefined; label: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) {

    
    return (
        <View>
            <Pressable style={styles.button} onPress={props.onPress}>
                <Text style={styles.text}>{props.label}</Text>
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