import { View, Text, TextInput, ScrollView } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from "react";
import ButtonP from '@/components/ButtonP';
import { CadastroPacQuatro } from "../routes/rotas";

export default function CadastroPacTres() {
// Variáveis para o funcionamento dos dropdowns
const [valor1, setValor1] = useState(null);

const [valor2, setValor2] = useState(null);

const [valor3, setValor3] = useState(null);

const [valor4, setValor4] = useState(null);

const [valor5, setValor5] = useState(null);

// Itens dos 3 primeiros dropdowns
const itens1 = [
    {label: 'Sim', value: 'sim'},
    {label: 'Não', value: 'nao'},
];
// Itens das comorbidades
const itens2 = [
    {label: 'Cardiáca', value: 'cardiaca'},
    {label: 'Tireoidiana', value: 'tireoidiana'},
    {label: 'Outra', value: 'outra'},
];
// Itens do tipo sanguíneo
const itens3 = [
    {label: 'A+', value: 'apositivo'},
    {label: 'A-', value: 'anegativo'},
    {label: 'B+', value: 'bpositivo'},
    {label: 'B-', value: 'bnegativo'},
    {label: 'AB+', value: 'abpositivo'},
    {label: 'AB-', value: 'abnegativo'},
    {label: 'O+', value: 'opositivo'},
    {label: 'O-', value: 'onegativo'},
];

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
                <Dropdown
                 style={{ borderWidth: 1, marginBottom: 8 }}
                 data={itens1}
                 labelField="label"
                 valueField="value"
                 placeholder="Selecione"
                 value={valor1}
                 onChange={item => setValor1(item.value)}         
                />

                <Text>Acompanhamento Médico</Text>
                <Dropdown
                 style={{ borderWidth: 1, marginBottom: 8 }}
                 data={itens1}
                 labelField="label"
                 valueField="value"
                 placeholder="Selecione"
                 value={valor2}
                 onChange={item => setValor2(item.value)}         
                />

                <Text>Comorbidades</Text>
                <Dropdown
                 style={{ borderWidth: 1, marginBottom: 8 }}
                 data={itens1}
                 labelField="label"
                 valueField="value"
                 placeholder="Selecione"
                 value={valor3}
                 onChange={item => setValor3(item.value)}         
                />

                <Text>Tipo de comorbidade</Text>
                <Dropdown
                 style={{ borderWidth: 1, marginBottom: 8 }}
                 data={itens2}
                 labelField="label"
                 valueField="value"
                 placeholder="Selecione"
                 value={valor4}
                 onChange={item => setValor4(item.value)}         
                />

                <Text>Medicamento em uso</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

                <Text>Alergias</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

                <Text>Tipo sanguíneo</Text>
                <Dropdown
                 style={{ borderWidth: 1, marginBottom: 8 }}
                 data={itens3}
                 labelField="label"
                 valueField="value"
                 placeholder="Selecione"
                 value={valor5}
                 onChange={item => setValor5(item.value)}         
                />
            </View>
            <ButtonP label="Continuar" onPress={CadastroPacQuatro}/>
        </View>
    </ScrollView>    
    )
}