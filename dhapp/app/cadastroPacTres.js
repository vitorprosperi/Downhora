import ButtonP from '@/components/ButtonP';
import { usePaciente } from '@/context/context';
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cadastropacQuatro } from "../routes/rotas";
import styles from './styleForms';

export default function CadastroPacTres() {

    const { pacientedados, setPacientedados } = usePaciente();
    const [valor1, setValor1] = useState(null);

    const [valor2, setValor2] = useState(null);

    const [valor3, setValor3] = useState(null);

    const [valor4, setValor4] = useState(null);

    const [valor5, setValor5] = useState(null);

    // Itens dos 3 primeiros dropdowns
    const itens1 = [
        { label: 'Sim', value: 'sim' },
        { label: 'Não', value: 'nao' },
    ];
    // Itens das comorbidades
    const itens2 = [
        { label: 'Cardiáca', value: 'cardiaca' },
        { label: 'Tireoidiana', value: 'tireoidiana' },
        { label: 'Outra', value: 'outra' },
    ];
    // Itens do tipo sanguíneo
    const itens3 = [
        { label: 'A+', value: 'apositivo' },
        { label: 'A-', value: 'anegativo' },
        { label: 'B+', value: 'bpositivo' },
        { label: 'B-', value: 'bnegativo' },
        { label: 'AB+', value: 'abpositivo' },
        { label: 'AB-', value: 'abnegativo' },
        { label: 'O+', value: 'opositivo' },
        { label: 'O-', value: 'onegativo' },
    ];

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
            <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280} enableOnAndroid={true}>
                <View style={styles.container}>
                    <View style={styles.containerForm}>

                        <View>
                            <Text style={styles.titulo}>Cadastro de Pessoa com Sd. Down</Text>
                            <Text style={styles.subTitulo}>Histórico médico</Text>
                        </View>

                        <View>
                            <Text style={styles.textForm}>Diagnóstico confirmado de Sindrome de Down</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#081221'
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
                        </View>

                        <View>
                            <Text style={styles.textForm}>Acompanhamento Médico</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#081221'
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
                        </View>

                        <View>
                            <Text style={styles.textForm}>Comorbidades</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#081221'
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
                        </View>

                        <View>
                            <Text style={styles.textForm}>Tipo de comorbidade</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#081221'
                                data={itens2}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={pacientedados.tipocom}
                                onChange={item => setPacientedados(prev => ({ ...prev, tipocom: item.value }))} />
                        </View>

                        <View>
                            <Text style={styles.textForm}>Medicamento em uso</Text>
                            <TextInput style={styles.input}
                                placeholder='ex: Losartana'
                                placeholderTextColor={'lightgrey'}
                                onChangeText={(text) => setPacientedados(prev => ({ ...prev, medicamento: text }))} />
                        </View>

                        <View>
                            <Text style={styles.textForm}>Alergias</Text>
                            <TextInput style={styles.input}
                            placeholder='ex: Rinite alérgica'
                placeholderTextColor={'lightgrey'}
                                onChangeText={(text) => setPacientedados(prev => ({ ...prev, alergia: text }))} />
                        </View>

                        <View>
                            <Text style={styles.textForm}>Tipo sanguíneo</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#081221'
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
                    </View>

                    <View style={{ marginBottom: 20, width: 200 }}>
                        <ButtonP label="Próximo" onPress={cadastropacQuatro} />
                    </View>

                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}