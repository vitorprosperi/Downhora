import ButtonP from '@/components/ButtonP';
import { usePaciente } from '@/context/context';
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaskInput from 'react-native-mask-input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cadastropacQuatro } from "../routes/rotas";
import styles from './styleForms';

export default function CadastroPacTres() {

    const dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

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

    const [valorFisio, setValorFisio] = useState(null);
    const [dataFisio, setDataFisio] = useState('');

    const [valorTerapia, setValorTerapia] = useState(null);
    const [dataTerapia, setDataTerapia] = useState('');

    const [valorPsico, setValorPsico] = useState(null);
    const [dataPsico, setDataPsico] = useState('');


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
                                activeColor='#F5F5FF'
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
                                    <MaskInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        value={dataCariotipo}
                                        mask={dateMask}
                                        maxLength={10}
                                        onChangeText={(masked, unmasked) => {
                                            setDataCariotipo(masked);
                                            setPacientedados(prev => ({ ...prev, dataCariotipo: unmasked }));
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
                                activeColor='#F5F5FF'
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
                                    <MaskInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        maxLength={10}
                                        mask={dateMask}
                                        value={dataAuditivo}
                                        onChangeText={(masked, unmasked) => {
                                            setDataAuditivo(masked);
                                            setPacientedados(prev => ({ ...prev, dataAuditivo: unmasked }));
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
                                activeColor='#F5F5FF'
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
                                    <MaskInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        value={dataEco}
                                        maxLength={10}
                                        mask={dateMask}
                                        onChangeText={(masked, unmasked) => {
                                            setDataEco(masked);
                                            setPacientedados(prev => ({ ...prev, dataCard: unmasked }));
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
                                activeColor='#F5F5FF'
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
                                    <MaskInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        maxLength={10}
                                        mask={dateMask}
                                        value={dataOrtopedica}
                                        onChangeText={(masked, unmasked) => {
                                            setDataOrtopedica(masked);
                                            setPacientedados(prev => ({ ...prev, dataPe: unmasked }));
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
                                activeColor='#F5F5FF'
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
                                    <MaskInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        maxLength={10}
                                        mask={dateMask}
                                        value={dataNeuro}
                                        onChangeText={(masked, unmasked) => {
                                            setDataNeuro(masked);
                                            setPacientedados(prev => ({ ...prev, dataOftal: unmasked }));
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
                                activeColor='#F5F5FF'
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
                                    <MaskInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        value={dataFono}
                                        maxLength={10}
                                        mask={dateMask}
                                        onChangeText={(masked, unmasked) => {
                                            setDataFono(masked);
                                            setPacientedados(prev => ({ ...prev, dataFono: unmasked}));
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
                                activeColor='#F5F5FF'
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
                                    <MaskInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        value={dataOdonto}
                                        maxLength={10}
                                        mask={dateMask}
                                        onChangeText={(masked, unmasked) => {
                                            setDataOdonto(masked);
                                            setPacientedados(prev => ({ ...prev, dataOdonto: unmasked }));
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
                                activeColor='#F5F5FF'
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
                                    <MaskInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        value={dataEndocrino}
                                        maxLength={10}
                                        mask={dateMask}
                                        onChangeText={(masked, unmasked) => {
                                            setDataEndocrino(masked);
                                            setPacientedados(prev => ({ ...prev, dataEndocrino: unmasked }));
                                        }}
                                    />
                                </View>
                            )}
                        </View>

                        <View>
                            <Text style={styles.textForm}>Consulta Fisioterapia*</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#F5F5FF'
                                data={itensSimNao}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={valorFisio}
                                onChange={item => {
                                    setValorFisio(item.value);
                                    setPacientedados(prev => ({ ...prev, consultaFisio: item.value }));
                                }}
                            />
                            {valorFisio === 'sim' && (
                                <View style={{marginTop: 10}}>
                                    <Text style={styles.textForm}>Data da consulta</Text>
                                    <MaskInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        value={dataFisio}
                                        maxLength={10}
                                        mask={dateMask}
                                        onChangeText={(masked, unmasked) => {
                                            setDataFisio(masked);
                                            setPacientedados(prev => ({ ...prev, dataFisio: unmasked }));
                                        }}
                                    />
                                </View>
                            )}
                        </View>

                        <View>
                            <Text style={styles.textForm}>Consulta Terapia Ocupacional*</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#F5F5FF'
                                data={itensSimNao}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={valorTerapia}
                                onChange={item => {
                                    setValorTerapia(item.value);
                                    setPacientedados(prev => ({ ...prev, consultaTerapia: item.value }));
                                }}
                            />
                            {valorTerapia === 'sim' && (
                                <View style={{marginTop: 10}}>
                                    <Text style={styles.textForm}>Data da consulta</Text>
                                    <MaskInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        value={dataTerapia}
                                        maxLength={10}
                                        mask={dateMask}
                                        onChangeText={(masked, unmasked) => {
                                            setDataTerapia(masked);
                                            setPacientedados(prev => ({ ...prev, dataTerapia: unmasked }));
                                        }}
                                    />
                                </View>
                            )}
                        </View>

                        <View>
                            <Text style={styles.textForm}>Consulta Psicopedagogo</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#F5F5FF'
                                data={itensSimNao}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={valorPsico}
                                onChange={item => {
                                    setValorPsico(item.value);
                                    setPacientedados(prev => ({ ...prev, consultaPsico: item.value }));
                                }}
                            />
                            {valorPsico === 'sim' && (
                                <View style={{marginTop: 10}}>
                                    <Text style={styles.textForm}>Data da consulta</Text>
                                    <MaskInput
                                        style={styles.input}
                                        placeholder="ex: 01/01/2023"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        value={dataPsico}
                                        maxLength={10}
                                        mask={dateMask}
                                        onChangeText={(masked, unmasked) => {
                                            setDataPsico(masked);
                                            setPacientedados(prev => ({ ...prev, dataPsico: unmasked }));
                                        }}
                                    />
                                </View>
                            )}
                        </View>

                        {/* Tipo de comorbidade */}
                        <View>
                            <Text style={styles.textForm}>Doenças relacionadas</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='ex: Cardíaca, Tireoidiana'
                                placeholderTextColor={'grey'}
                                onChangeText={(text) => setPacientedados(prev => ({ ...prev, comorbidades: text }))}
                            />
                        </View>

                        {/* Medicamento em uso */}
                        <View>
                            <Text style={styles.textForm}>Medicamentos em uso</Text>
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
                                activeColor='#F5F5FF'
                                data={itensSimNao}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={valor6}
                                onChange={item => {
                                    setValor6(item.value);
                                    setPacientedados(prev => ({
                                        ...prev,
                                        possuiAlergia: item.value,
                                        alergia: item.value === 'sim' ? prev.alergia || '' : 'não'
                                    }));
                                }}
                            />
                            {valor6 === 'sim' && (
                                <View>
                                    <Text style={styles.textForm}>Quais?</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='ex: Rinite alérgica'
                                        placeholderTextColor={'grey'}
                                        value={pacientedados.alergia === 'não' ? '' : pacientedados.alergia || ''}
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
                                activeColor='#F5F5FF'
                                data={itensTipoSangue}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                dropdownPosition='top'
                                value={valor7}
                                onChange={item => {
                                    setValor7(item.value);
                                    setPacientedados(prev => ({ ...prev, tiposangue: item.value }));
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 10, marginTop: 10, width: 200 }}>
                        <ButtonP label="Próximo" onPress={cadastropacQuatro} />
                    </View>

                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}