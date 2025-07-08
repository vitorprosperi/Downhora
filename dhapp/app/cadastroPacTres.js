import { View, Text, TextInput, ScrollView } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from "react";
import ButtonP from '@/components/ButtonP';
import { CadastroPacQuatro } from "../routes/rotas";

export default function CadastroPacTres() {
const [aberto1, setAberto1] = useState(false);
const [valor1, setValor1] = useState(null);

const [aberto2, setAberto2] = useState(false);
const [valor2, setValor2] = useState(null);

const [aberto3, setAberto3] = useState(false);
const [valor3, setValor3] = useState(null);

const [aberto4, setAberto4] = useState(false);
const [valor4, setValor4] = useState(null);

const [aberto5, setAberto5] = useState(false);
const [valor5, setValor5] = useState(null);

// Itens dos 3 primeiros dropdowns
const[items1, setItems1] = useState([
    {label: 'Sim', value: 'sim'},
    {label: 'Não', value: 'nao'},
]);
// Itens das comorbidades
const[items2, setItems2] = useState([
    {label: 'Cardiáca', value: 'cardiaca'},
    {label: 'Tireoidiana', value: 'tireoidiana'},
    {label: 'Outra', value: 'outra'},
]);
// Itens do tipo sanguíneo
const[items3, setItems3] = useState([
    {label: 'A+', value: 'apositivo'},
    {label: 'A-', value: 'anegativo'},
    {label: 'B+', value: 'bpositivo'},
    {label: 'B-', value: 'bnegativo'},
    {label: 'AB+', value: 'abpositivo'},
    {label: 'AB-', value: 'abnegativo'},
    {label: 'O+', value: 'opositivo'},
    {label: 'O-', value: 'onegativo'},
]);

    return(
    <ScrollView nestedScrollEnabled={true}>
        <View style={{ padding: 16 }}>
            {/* View da header*/}
            <View>
                <Text>Cadastro de Pessoas com SD. Down</Text>
                <Text>Histórico Médico</Text>
            </View>
            {/* View do Form*/}
            <View>
                <Text>Diagnóstico confirmado de Sindrome de Down</Text>
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

                <Text>Acompanhamento Médico</Text>
                <DropDownPicker
                    open={aberto2}
                    value={valor2}
                    items={items1}
                    setOpen={setAberto2}
                    setValue={setValor2}
                    setItems={setItems1}
                    placeholder="Selecione"
                    listMode="SCROLLVIEW"
                    style={{ marginBottom: aberto2 ? 150 : 8 }} // espaço extra quando aberto
                />

                <Text>Comorbidades</Text>
                <DropDownPicker
                    open={aberto3}
                    value={valor3}
                    items={items1}
                    setOpen={setAberto3}
                    setValue={setValor3}
                    setItems={setItems1}
                    placeholder="Selecione"
                    listMode="SCROLLVIEW"
                    style={{ marginBottom: aberto3 ? 150 : 8 }} // espaço extra quando aberto
                />

                <Text>Tipo de comorbidade</Text>
                <DropDownPicker
                    open={aberto4}
                    value={valor4}
                    items={items2}
                    setOpen={setAberto4}
                    setValue={setValor4}
                    setItems={setItems2}
                    placeholder="Selecione"
                    listMode="SCROLLVIEW"
                    style={{ marginBottom: aberto4 ? 150 : 8 }} // espaço extra quando aberto
                />

                <Text>Medicamento em uso</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

                <Text>Alergias</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

                <Text>Tipo sanguíneo</Text>
                <DropDownPicker
                    open={aberto5}
                    value={valor5}
                    items={items3}
                    setOpen={setAberto5}
                    setValue={setValor5}
                    setItems={setItems3}
                    placeholder="Selecione"
                    listMode="SCROLLVIEW"
                    style={{ marginBottom: aberto5 ? 150 : 8 }} // espaço extra quando aberto
                />
            </View>
            <ButtonP label="Continuar" onPress={CadastroPacQuatro}/>
        </View>
    </ScrollView>    
    )
}