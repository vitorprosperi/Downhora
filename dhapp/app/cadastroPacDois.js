import { View, Text, TextInput } from "react-native"
import { useState } from "react";

export default function CadastroPacDois() {
const [aberto, Setaberto] = useState(false);
const [valor, setValor] = useState(null);
  const [items, setItems] = useState([
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
  ]);

    return(
        <View>
            {/* View da header*/}
            <View>
                <Text>Cadastro de Pessoas com SD. Down</Text>
                <Text>Endereço</Text>
            </View>
            {/* View do formulário*/}
            <View>
                <Text>CEP*</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />
                
                <Text>Rua*</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />
                
                <Text>Número*</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />
                
                <Text>Complemento*</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />
                
                <Text>Bairro*</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

                <Text>Cidade*</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

                <Text>Estado*</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

                <Text>Unidade de Saúde*</Text>
            </View>
        </View>
    )
}