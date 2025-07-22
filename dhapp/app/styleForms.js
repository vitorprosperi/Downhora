import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    corEscura: {
      flexGrow: 1,
      backgroundColor: '#081221',
    },
    container: {
      flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#081221',
    },
    containerForm: {
        justifyContent: 'flex-start',
        gap: 10,
        width: '90%',
    },
    dropdownContainer: {
      backgroundColor: '#081221',
    },
    input: {
        backgroundColor: '#081221',
        color: '#fff',
        paddingVertical: 0,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 2,
        width: '100%',
        fontSize: 16,
        height: 35,
    },
    containerTeclado: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    textForm: {
        color: '#fff',
        fontSize: 16,
    },

})

export default styles;