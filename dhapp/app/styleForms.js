import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  corEscura: {
    flexGrow: 1,
    backgroundColor: '#081221',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#081221',
  },
  telaInicio: {
    flex: 1,
    backgroundColor: '#081221',
    width: '80%',
    position: 'static',
  },
  containerForm: {
    justifyContent: 'flex-start',
    gap: 10,
    width: '80%',
  },
  dropdownContainer: {
    backgroundColor: '#081221',
  },
  input: {
    backgroundColor: '#081221',
    color: '#fff',
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 2,
    width: '100%',
    fontSize: 16,
    height: 35,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  containerTeclado: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textForm: {
    color: '#fff',
    fontSize: 16,
  },
  titulo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 700,
  },
  subTitulo: {
    color: '#FFDCDC',
    fontSize: 18,
  },
  textoPequeno: {
    color: '#FFDCDC',
    fontSize: 14,
  },
  exemplo: {
    color: 'lightgrey'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 30,
    bottom: 20,
    borderCurve: 30,
    backgroundColor: '#FBEC3B',
  },
})

export default styles;