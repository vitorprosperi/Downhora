import { View, Text } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from "react";

export default function CadastroPacTres() {
const [aberto, Setaberto] = useState(false);
const [valor, setValor] = useState(null);
const[items, setItems] = useState([
    {label: 'Sim', value: 'sim'},
    {label: 'Não', value: 'nao'},
]);

    return(
        <View>
            {/* View da header*/}
            <View>
                <Text>Cadastro de Pessoas com SD. Down</Text>
                <Text>Histórico Médico</Text>
            </View>
            {/* View do Form*/}
            <View>
                <Text>Diagnóstico confirmado de Sindrome de Down</Text>
                <DropDownPicker
                    open={aberto}
                    value={valor}
                    items={items}
                    setOpen={Setaberto}
                    setValue={setValor}
                    setItems={setItems}
                    placeholder="Selecione"
                    listMode="SCROLLVIEW"
                    style={{ marginBottom: aberto ? 150 : 8 }} // espaço extra quando aberto
                />

                <Text>Acompanhamento Médico</Text>

                <Text>Comorbidades</Text>

                <Text>Tipo de comorbidade</Text>

                <Text>Medicamento em uso</Text>

                <Text>Alergias</Text>

                <Text>Tipo sanguíneo</Text>
            </View>
        </View>
    )
}