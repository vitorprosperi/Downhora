import { View, Text, TextInput, ScrollView } from "react-native"
import { useState } from "react";
import { unidades } from "../unidades/unidades";
import { cadastropacTres } from "../routes/rotas";
import DropDownPicker from 'react-native-dropdown-picker';
import ButtonP from '@/components/ButtonP';

export default function CadastroPacDois() {
//Variáveis para o funcionamento do dropdown
const [aberto, Setaberto] = useState(false);
const [valor, setValor] = useState(null);
const [items, setItems] = useState(unidades);

    return(
    <ScrollView nestedScrollEnabled={true}>
        <View style={{ padding: 16 }}>
            {/* View da header*/}
            <View>
                <Text>Cadastro de Pessoas com SD. Down</Text>
                <Text>Endereço</Text>
            </View>
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
                <DropDownPicker
                 open={aberto}
                 value={valor}
                 items={items}
                 setOpen={Setaberto}
                 setValue={setValor}
                 setItems={setItems}
                 placeholder="Selecione a unidade de saúde"
                 listMode="SCROLLVIEW"
                 style={{ marginBottom: aberto ? 150 : 8 }} // espaço extra quando aberto
                />
            </View>
            <ButtonP label="Continuar" onPress={cadastropacTres}/>
        </View>
    </ScrollView>
    )
}