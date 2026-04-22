import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const trabalhador = require("@/assets/images/trabalhador.png");

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 10,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
      }}
    >
      <Text>Página em manutenção</Text>
      <Image source={trabalhador} style={styles.image}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
