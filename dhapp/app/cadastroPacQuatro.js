import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

export default function CadastroPacQuatro() {
const [aberto1, setAberto1] = useState(false);
const [valor1, setValor1] = useState(null);

const [aberto2, setAberto2] = useState(false);
const [valor2, setValor2] = useState(null);

const [aberto3, setAberto3] = useState(false);
const [valor3, setValor3] = useState(null);

const[items2, setItems2] = useState([
    {label: 'Total', value: 'total'},
    {label: 'Parcial', value: 'parcial'},
    {label: 'Não', value: 'nao'},
]);

    return(
        <View>
            {/* View da header*/}
            <View>
                <Text>Cadastro de Pessoas com SD. Down</Text>
                <Text>Informações Complementares</Text>
            </View>
            {/* View do form*/}
            <View>
                <Text>Escolaridade</Text>

                <Text>Nome da escola</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

                <Text>Unidade APAE</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

                <Text>Autonomia de comunicação</Text>
                <DropDownPicker
                    open={aberto2}
                    value={valor2}
                    items={items2}
                    setOpen={setAberto2}
                    setValue={setValor2}
                    setItems={setItems2}
                    placeholder="Selecione"
                    listMode="SCROLLVIEW"
                    style={{ marginBottom: aberto2 ? 150 : 8 }} // espaço extra quando aberto
                />

                <Text>Acompanhamento multiprofissional</Text>
            </View>
        </View>
    )
}