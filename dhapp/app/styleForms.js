import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  corEscura: {
    flexGrow: 1,
    backgroundColor: "#FAFAFF",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FAFAFF",
  },
  contInicial: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  telaInicio: {
    flex: 1,
    backgroundColor: "#FAFAFF",
    width: "90%",
    position: "static",
  },
  containerForm: {
    justifyContent: "flex-start",
    gap: 10,
    width: "90%",
    paddingTop: 10,
  },
  dropdownContainer: {
    backgroundColor: "#FAFAFF",
  },
  input: {
    backgroundColor: "#FAFAFF",
    color: "#231F20",
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: "#231F20",
    width: "100%",
    fontSize: 16,
    height: 32,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    fontFamily: "Roboto",
  },
  containerTeclado: {
    justifyContent: "center",
    alignItems: "center",
  },
  textForm: {
    color: "#231F20",
    fontSize: 16,
    fontFamily: "Roboto",
  },
  titulo: {
    color: "#231F20",
    fontSize: 20,
    fontFamily: "Raleway-700",
  },
  subTitulo: {
    color: "#231F20",
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Roboto-500",
  },
  textoPequeno: {
    color: "#231F20",
    fontSize: 16,
    fontFamily: "Raleway",
  },
  exemplo: {
    color: "grey",
    fontFamily: "Roboto",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 12,
    bottom: 35,
    borderCurve: 30,
    backgroundColor: "#2261C1",
  },
  telaExames: {
    flex: 1,
    width: "90%",
    position: "static",
  },
  textFormErro: {
    fontFamily: "Roboto-500",
    color: "red",
  },
  headerCadastro: {
    fontFamily: "Raleway-700",
    color: "#231F20",
    fontSize: 20,
  },
});

export default styles;
