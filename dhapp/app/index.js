import ButtonP from '@/components/ButtonP';
import { login } from '@/routes/rotas';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { cadastropac } from '../routes/rotas';

const LogoImage = require('@/assets/images/logodhredondotrans.png')

export default function App() {


    return (
        <View style={styles.indexEstilo}>
            <View style={styles.logoContainer}>
                <View style={styles.imageContainer}>
                    <Image source={LogoImage} style={styles.image}></Image>
                </View>
                <View style={styles.titleContainer}>
                <Text style={styles.textDown}>Down</Text>
                <Text style={styles.textHora}>Hora</Text>
                </View>
            </View>
            <View style={styles.containerBotoes}>
                <ButtonP label='Login' theme='yellow' onPress={login}></ButtonP>
                <ButtonP label='Cadastro' onPress={cadastropac}></ButtonP>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFF',
    },
    containerBotoes: {
        gap: 10,
        width: '80%',
    },
    textDown: {
        color: '#2261c1',
        fontSize: 40,
        fontFamily: 'Raleway-700'
    },
    textHora:{
        color: '#f2aa08',
        fontSize: 40,
        fontFamily: 'Raleway-700'
    },
    indexEstilo: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FAFAFF',
    },
    imageContainer: {
        width: 350,
        height: 350,
        marginBottom: 0,
        paddingBottom: 0,
    },
    image: {
        width: 350,
        height: 350,
        borderRadius: 100,
        paddingBottom: 0,
        marginBottom: 0,
    },
    logoContainer: {
        justifyContent: 'center'
    },
    titleContainer:{
        flexDirection: 'row',
        alignSelf: 'center',
    },
});