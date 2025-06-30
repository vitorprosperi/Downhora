import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#081221',
    },
    containerForm: {
        justifyContent: 'flex-start',
        gap: 5,
        width: 200,
    },
    input: {
        backgroundColor: '#081221',
        color: '#fff',
        paddingVertical: '0.3em',
        paddingHorizontal: '0.6em',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 2,
        width: '100%',
    },
    textForm: {
        color: '#fff',
    }
})

export default styles;