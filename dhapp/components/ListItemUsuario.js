import { Pressable, Text, View } from "react-native"

export const ListItemUsuario = ({data}) => {
    return (
        <Pressable>
            <View>
                <Text>{data.nome}</Text>
                <Text>{data.cpf}</Text>
            </View>
        </Pressable>
    )
}