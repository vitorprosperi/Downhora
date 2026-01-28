import dayjs from 'dayjs';
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaskedText } from 'react-native-mask-text';
import { Icon } from 'react-native-paper';

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export const ListItemUsuario = ({ data }) => {
    const dataAniversario = new Date(data.data_nascimento);
    const idade = dayjs().diff(dataAniversario, 'y');
    return (
        <Pressable>
            <View style={styles.container}>
                <Icon
                    source={'account-circle-outline'}
                    size={45}
                />
                <View>
                    <View style={styles.infoView}>
                        <Text>{data.nome}, {idade} anos</Text>
                    </View>
                    <View style={styles.infoView}>
                        <MaskedText mask="999.999.999-99">{data.cpf}</MaskedText>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#2261c1',
        alignItems: 'center',
        paddingLeft: 20,
    },
    infoView: {
        flexDirection: 'row',
        marginLeft: 10,
    }
})