import { Text, View, Image} from "react-native";


export default function Vacina() {
  
  const Trabalho = require('@/assets/images/trabalhador.png');
  
    return (
    <View>
      <Image source={Trabalho} style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 50 }} />
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{color:'blue'}} >Em Construção</Text>
      </View>
    </View>
  );
}