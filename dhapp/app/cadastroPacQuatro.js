import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import ButtonP from '@/components/ButtonP';

export default function CadastroPacQuatro() {
const [aberto1, setAberto1] = useState(false);
const [valor1, setValor1] = useState(null);

const [aberto2, setAberto2] = useState(false);
const [valor2, setValor2] = useState(null);

const [aberto3, setAberto3] = useState(false);
const [valor3, setValor3] = useState(null);

const[items1, setItems1] = useState([
    {label: 'Ensino fundamental incompleto', value: 'ensino_fundamental_incompleto'},
    {label: 'Ensino fundamental completo', value: 'ensino_fundamental_completo'},
    {label: 'Ensino médio incompleto', value: 'ensino_medio_incompleto'},
    {label: 'Ensino médio completo', value: 'ensino_medio_completo'},
    {label: 'Ensino superior incompleto', value: 'ensino_superior_incompleto'},
    {label: 'Ensino superior completo', value: 'ensino_medio_completo'},
    {label: 'Pós graduação', value: 'pos_graduacao'},
]);

const[items2, setItems2] = useState([
    {label: 'Total', value: 'total'},
    {label: 'Parcial', value: 'parcial'},
    {label: 'Não', value: 'nao'},
]);

const[items3, setItems3] = useState([
    {label: 'Sim', value: 'sim'},
    {label: 'Não', value: 'nao'},
]);

    return(
        <View style={{ padding: 16 }}>
            {/* View da header*/}
            <View>
                <Text>Cadastro de Pessoas com SD. Down</Text>
                <Text>Informações Complementares</Text>
            </View>
            {/* View do form*/}
            <View>
                <Text>Escolaridade</Text>
                <DropDownPicker
                    open={aberto1}
                    value={valor1}
                    items={items1}
                    setOpen={setAberto1}
                    setValue={setValor1}
                    setItems={setItems1}
                    placeholder="Selecione"
                    listMode="SCROLLVIEW"
                    style={{ marginBottom: aberto1 ? 150 : 8 }} // espaço extra quando aberto
                />

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
                <DropDownPicker
                    open={aberto3}
                    value={valor3}
                    items={items3}
                    setOpen={setAberto3}
                    setValue={setValor3}
                    setItems={setItems3}
                    placeholder="Selecione"
                    listMode="SCROLLVIEW"
                    style={{ marginBottom: aberto3 ? 150 : 8 }} // espaço extra quando aberto
                />
            </View>
            <ButtonP label="FInalizar cadastro" onPress={console.log("Finalizado")}/>
        </View>
    )
}