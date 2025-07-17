import { View, Text, TextInput, ScrollView } from "react-native";
import { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import ButtonP from '@/components/ButtonP';
import { CadastroPacQuatro } from "../routes/rotas";
import { usePaciente } from '@/context/context';

export default function CadastroPacTres() {

const {pacientedados, setPacientedados} = usePaciente();
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
                 onChange={item => {
                 setValor1(item.value);
                 setPacientedados(prev => ({ ...prev, diagnostico: item.value }));
                }}          
                />         

                <Text>Acompanhamento Médico</Text>
                <Dropdown
                 style={{ borderWidth: 1, marginBottom: 8 }}
                 data={itens1}
                 labelField="label"
                 valueField="value"
                 placeholder="Selecione"
                 value={valor2}
                 onChange={item => {
                 setValor2(item.value);
                 setPacientedados(prev => ({ ...prev, acompanhamento: item.value }));
                }}         
                />

                <Text>Comorbidades</Text>
                <Dropdown
                 style={{ borderWidth: 1, marginBottom: 8 }}
                 data={itens1}
                 labelField="label"
                 valueField="value"
                 placeholder="Selecione"
                 value={valor3}
                 onChange={item => {
                 setValor3(item.value);
                 setPacientedados(prev => ({ ...prev, comorbidades: item.value }));
                }}          
                />

                <Text>Tipo de comorbidade</Text>
                <Dropdown
                 style={{ borderWidth: 1, marginBottom: 8 }}
                 data={itens2}
                 labelField="label"
                 valueField="value"
                 placeholder="Selecione"
                 value={pacientedados.tipocom}
                 onChange={item => setPacientedados(prev => ({ ...prev, tipocom: item.value }))}/>

                <Text>Medicamento em uso</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }}
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, medicamento: text }))}/>
                

                <Text>Alergias</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} 
                onChangeText={(text) => setPacientedados(prev => ({ ...prev, alergia: text }))}/>

                <Text>Tipo sanguíneo</Text>
                <Dropdown
                 style={{ borderWidth: 1, marginBottom: 8 }}
                 data={itens3}
                 labelField="label"
                 valueField="value"
                 placeholder="Selecione"
                 value={valor4}
                 onChange={item => {
                 setValor4(item.value);
                 setPacientedados(prev => ({ ...prev, tiposangue: item.value }));
                }}         
                />
            </View>
            <ButtonP label="Próximo" onPress={CadastroPacQuatro}/>
        </View>
    </ScrollView>    
    )
}