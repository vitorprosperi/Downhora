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

    // Estados para cada exame/avaliação
    const [valor1, setValor1] = useState(null); // Cariótipo
    const [dataCariotipo, setDataCariotipo] = useState('');

    const [valor2, setValor2] = useState(null); // Exame Auditivo
    const [dataAuditivo, setDataAuditivo] = useState('');

    const [valor3, setValor3] = useState(null); // Exame Ecocardiograma
    const [dataEco, setDataEco] = useState('');

    const [valor4, setValor4] = useState(null); // Teste do pezinho
    const [dataOrtopedica, setDataOrtopedica] = useState('');

    const [valor5, setValor5] = useState(null); // Consulta Oftalmologista
    const [dataNeuro, setDataNeuro] = useState('');

    // Consultas adicionadas
    const [valorFono, setValorFono] = useState(null);
    const [dataFono, setDataFono] = useState('');

    const [valorOdonto, setValorOdonto] = useState(null);
    const [dataOdonto, setDataOdonto] = useState('');

    const [valorEndocrino, setValorEndocrino] = useState(null);
    const [dataEndocrino, setDataEndocrino] = useState('');

    // Outros campos já existentes
    const [valor6, setValor6] = useState(null); // Alergias
    const [valor7, setValor7] = useState(null); // Tipo sanguíneo

    // Itens dos dropdowns (sim/não)
    const itensSimNao = [
        { label: 'Sim', value: 'sim' },
        { label: 'Não', value: 'nao' },
    ];
    // Itens das comorbidades
    const itensComorbidades = [
        { label: 'Cardíaca', value: 'cardiaca' },
        { label: 'Tireoidiana', value: 'tireoidiana' },
        { label: 'Outra', value: 'outra' },
    ];
    // Itens do tipo sanguíneo
    const itensTipoSangue = [
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

                        {/* EXAMES */}
                        <View>
                            <Text style={styles.textForm}>Exame Cariótipo*</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#081221'
                                data={itensSimNao}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={valor1}
                                onChange={item => {
                                    setValor1(item.value);
                                    setPacientedados(prev => ({ ...prev, cariotipo: item.value }));
                                }}
                            />
                            {valor1 === 'sim' && (
                                <View style={{marginTop: 10}}>
                                    <Text style={styles.textForm}>Data do exame</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        value={dataCariotipo}
                                        onChangeText={text => {
                                            setDataCariotipo(text);
                                            setPacientedados(prev => ({ ...prev, dataCariotipo: text }));
                                        }}
                                    />
                                </View>
                            )}
                        </View>

                        <View>
                            <Text style={styles.textForm}>Triagem Auditiva*</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#081221'
                                data={itensSimNao}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={valor2}
                                onChange={item => {
                                    setValor2(item.value);
                                    setPacientedados(prev => ({ ...prev, exameAuditivo: item.value }));
                                }}
                            />
                            {valor2 === 'sim' && (
                                <View style={{marginTop: 10}}>
                                    <Text style={styles.textForm}>Data do exame</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        value={dataAuditivo}
                                        onChangeText={text => {
                                            setDataAuditivo(text);
                                            setPacientedados(prev => ({ ...prev, dataAuditivo: text }));
                                        }}
                                    />
                                </View>
                            )}
                        </View>

                        <View>
                            <Text style={styles.textForm}>Consulta Cardiologista*</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#081221'
                                data={itensSimNao}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={valor3}
                                onChange={item => {
                                    setValor3(item.value);
                                    setPacientedados(prev => ({ ...prev, consultCardio: item.value }));
                                }}
                            />
                            {valor3 === 'sim' && (
                                <View style={{marginTop: 10}}>
                                    <Text style={styles.textForm}>Data do exame</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        value={dataEco}
                                        onChangeText={text => {
                                            setDataEco(text);
                                            setPacientedados(prev => ({ ...prev, dataCard: text }));
                                        }}
                                    />
                                </View>
                            )}
                        </View>

                        <View>
                            <Text style={styles.textForm}>Teste do pezinho*</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#081221'
                                data={itensSimNao}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={valor4}
                                onChange={item => {
                                    setValor4(item.value);
                                    setPacientedados(prev => ({ ...prev, testePe: item.value }));
                                }}
                            />
                            {valor4 === 'sim' && (
                                <View style={{marginTop: 10}}>
                                    <Text style={styles.textForm}>Data da avaliação</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        value={dataOrtopedica}
                                        onChangeText={text => {
                                            setDataOrtopedica(text);
                                            setPacientedados(prev => ({ ...prev, dataPe: text }));
                                        }}
                                    />
                                </View>
                            )}
                        </View>

                        <View>
                            <Text style={styles.textForm}>Consulta Oftalmologista*</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#081221'
                                data={itensSimNao}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={valor5}
                                onChange={item => {
                                    setValor5(item.value);
                                    setPacientedados(prev => ({ ...prev, oftalmo: item.value }));
                                }}
                            />
                            {valor5 === 'sim' && (
                                <View style={{marginTop: 10}}> 
                                    <Text style={styles.textForm}>Data da avaliação</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        value={dataNeuro}
                                        onChangeText={text => {
                                            setDataNeuro(text);
                                            setPacientedados(prev => ({ ...prev, dataOftal: text }));
                                        }}
                                    />
                                </View>
                            )}
                        </View>

                        {/* CONSULTAS */}
                        <View>
                            <Text style={styles.textForm}>Consulta Fonoaudiologia*</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#081221'
                                data={itensSimNao}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={valorFono}
                                onChange={item => {
                                    setValorFono(item.value);
                                    setPacientedados(prev => ({ ...prev, consultaFono: item.value }));
                                }}
                            />
                            {valorFono === 'sim' && (
                                <View style={{marginTop: 10}}>
                                    <Text style={styles.textForm}>Data da consulta</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        value={dataFono}
                                        onChangeText={text => {
                                            setDataFono(text);
                                            setPacientedados(prev => ({ ...prev, dataFono: text }));
                                        }}
                                    />
                                </View>
                            )}
                        </View>

                        <View>
                            <Text style={styles.textForm}>Consulta Odontologia*</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#081221'
                                data={itensSimNao}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={valorOdonto}
                                onChange={item => {
                                    setValorOdonto(item.value);
                                    setPacientedados(prev => ({ ...prev, consultaOdonto: item.value }));
                                }}
                            />
                            {valorOdonto === 'sim' && (
                                <View style={{marginTop: 10}}>
                                    <Text style={styles.textForm}>Data da consulta</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        value={dataOdonto}
                                        onChangeText={text => {
                                            setDataOdonto(text);
                                            setPacientedados(prev => ({ ...prev, dataOdonto: text }));
                                        }}
                                    />
                                </View>
                            )}
                        </View>

                        <View>
                            <Text style={styles.textForm}>Consulta Endocrinologia*</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#081221'
                                data={itensSimNao}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={valorEndocrino}
                                onChange={item => {
                                    setValorEndocrino(item.value);
                                    setPacientedados(prev => ({ ...prev, consultaEndocrino: item.value }));
                                }}
                            />
                            {valorEndocrino === 'sim' && (
                                <View style={{marginTop: 10}}>
                                    <Text style={styles.textForm}>Data da consulta</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        value={dataEndocrino}
                                        onChangeText={text => {
                                            setDataEndocrino(text);
                                            setPacientedados(prev => ({ ...prev, dataEndocrino: text }));
                                        }}
                                    />
                                </View>
                            )}
                        </View>

                        {/* Tipo de comorbidade */}
                        <View>
                            <Text style={styles.textForm}>Comorbidades</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='ex: Cardíaca, Tireoidiana'
                                placeholderTextColor={'grey'}
                                onChangeText={(text) => setPacientedados(prev => ({ ...prev, comorbidades: text }))}
                            />
                        </View>

                        {/* Medicamento em uso */}
                        <View>
                            <Text style={styles.textForm}>Medicamento em uso</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='ex: Losartana'
                                placeholderTextColor={'grey'}
                                onChangeText={(text) => setPacientedados(prev => ({ ...prev, medicamento: text }))}
                            />
                        </View>

                        {/* Alergias */}
                        <View>
                            <Text style={styles.textForm}>Alergias</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#081221'
                                data={itensSimNao}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={valor6}
                                onChange={item => {
                                    setValor6(item.value);
                                    setPacientedados(prev => ({ ...prev, possuiAlergia: item.value }));
                                    // Limpa o campo de alergia se marcar "não"
                                    if (item.value !== 'sim') {
                                        setPacientedados(prev => ({ ...prev, alergia: '' }));
                                    }
                                }}
                            />
                            {valor6 === 'sim' && (
                                <View>
                                    <Text style={styles.textForm}>Quais?</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='ex: Rinite alérgica'
                                        placeholderTextColor={'grey'}
                                        onChangeText={text => setPacientedados(prev => ({ ...prev, alergia: text }))}
                                    />
                                </View>
                            )}
                        </View>

                        {/* Tipo sanguíneo */}
                        <View>
                            <Text style={styles.textForm}>Tipo sanguíneo</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#081221'
                                data={itensTipoSangue}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={valor7}
                                onChange={item => {
                                    setValor7(item.value);
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