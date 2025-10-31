import { ButtonP } from '@/components/ButtonP';
import { MyDropdown } from '@/components/MyDropdown';
import { MyMaskInput } from '@/components/MyMaskInput';
import { usePaciente } from '@/context/context';
import { Stack } from 'expo-router';
import { useState } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cadastropacQuatro } from "../routes/rotas";
import styles from './styleForms';

export default function CadastroPacDois() {

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


    // Itens dos dropdowns (Sim/não)
    const itensSimNao = [
        { label: 'Sim', value: 'Sim' },
        { label: 'Não', value: 'Não' },
    ];


    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
            <Stack.Screen
                options={{
                    title: 'Cadastro de pessoa com síndrome de Down',
                    headerShadowVisible: true,
                    headerTitle: ({ children: title }) => {
                        return (
                            <Text style={styles.headerCadastro} numberOfLines={2}>{title}</Text>
                        )
                    },
                }}
            />
            <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280}>
                <View style={styles.container}>
                    <View style={styles.containerForm}>

                        <View>
                            <Text style={styles.subTitulo}>Consultas e exames já realizados (Passo 3 de 4)</Text>
                        </View>

                        {/* EXAMES */}
                        <View>
                            <Text style={styles.textForm}>Exame cariótipo</Text>
                            <MyDropdown
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
                            {valor1 === 'Sim' && (
                                <View style={{ marginTop: 10 }}>
                                    <Text style={styles.textForm}>Data do exame</Text>
                                    <MyMaskInput
                                        style={styles.input}
                                        placeholder="Ex: DD/MM/YYYY"
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
                            <Text style={styles.textForm}>Triagem auditiva</Text>
                            <MyDropdown
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
                            {valor2 === 'Sim' && (
                                <View style={{ marginTop: 10 }}>
                                    <Text style={styles.textForm}>Data do exame</Text>
                                    <MyMaskInput
                                        style={styles.input}
                                        placeholder="Ex: DD/MM/YYYY"
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
                            <Text style={styles.textForm}>Consulta cardiologista</Text>
                            <MyDropdown
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
                            {valor3 === 'Sim' && (
                                <View style={{ marginTop: 10 }}>
                                    <Text style={styles.textForm}>Data do exame</Text>
                                    <MyMaskInput
                                        style={styles.input}
                                        placeholder="Ex: DD/MM/YYYY"
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
                            <Text style={styles.textForm}>Teste do pezinho</Text>
                            <MyDropdown
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
                            {valor4 === 'Sim' && (
                                <View style={{ marginTop: 10 }}>
                                    <Text style={styles.textForm}>Data da avaliação</Text>
                                    <MyMaskInput
                                        style={styles.input}
                                        placeholder="Ex: DD/MM/YYYY"
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
                            <Text style={styles.textForm}>Consulta oftalmologista</Text>
                            <MyDropdown
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
                            {valor5 === 'Sim' && (
                                <View style={{ marginTop: 10 }}>
                                    <Text style={styles.textForm}>Data da avaliação</Text>
                                    <MyMaskInput
                                        style={styles.input}
                                        placeholder="Ex: DD/MM/YYYY"
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
                            <Text style={styles.textForm}>Consulta fonoaudiologia</Text>
                            <MyDropdown
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
                            {valorFono === 'Sim' && (
                                <View style={{ marginTop: 10 }}>
                                    <Text style={styles.textForm}>Data da consulta</Text>
                                    <MyMaskInput
                                        style={styles.input}
                                        placeholder="Ex: DD/MM/YYYY"
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        value={dataFono}
                                        maxLength={10}
                                        mask={dateMask}
                                        onChangeText={(masked, unmasked) => {
                                            setDataFono(masked);
                                            setPacientedados(prev => ({ ...prev, dataFono: unmasked }));
                                        }}
                                    />
                                </View>
                            )}
                        </View>

                        <View>
                            <Text style={styles.textForm}>Consulta odontologia</Text>
                            <MyDropdown
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
                            {valorOdonto === 'Sim' && (
                                <View style={{ marginTop: 10 }}>
                                    <Text style={styles.textForm}>Data da consulta</Text>
                                    <MyMaskInput
                                        style={styles.input}
                                        placeholder="Ex: DD/MM/YYYY"
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
                            <Text style={styles.textForm}>Consulta endocrinologia</Text>
                            <MyDropdown
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
                            {valorEndocrino === 'Sim' && (
                                <View style={{ marginTop: 10 }}>
                                    <Text style={styles.textForm}>Data da consulta</Text>
                                    <MyMaskInput
                                        style={styles.input}
                                        placeholder="Ex: DD/MM/YYYY"
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
                            <Text style={styles.textForm}>Consulta fisioterapia</Text>
                            <MyDropdown
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
                            {valorFisio === 'Sim' && (
                                <View style={{ marginTop: 10 }}>
                                    <Text style={styles.textForm}>Data da consulta</Text>
                                    <MyMaskInput
                                        style={styles.input}
                                        placeholder="Ex: DD/MM/YYYY"
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
                            <Text style={styles.textForm}>Consulta terapia ocupacional</Text>
                            <MyDropdown
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
                            {valorTerapia === 'Sim' && (
                                <View style={{ marginTop: 10 }}>
                                    <Text style={styles.textForm}>Data da consulta</Text>
                                    <MyMaskInput
                                        style={styles.input}
                                        placeholder="Ex: DD/MM/YYYY"
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
                            <Text style={styles.textForm}>Consulta psicopedagogo</Text>
                            <MyDropdown
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
                            {valorPsico === 'Sim' && (
                                <View style={{ marginTop: 10 }}>
                                    <Text style={styles.textForm}>Data da consulta</Text>
                                    <MyMaskInput
                                        style={styles.input}
                                        placeholder="Ex: DD/MM/YYYY"
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
                    </View>

                    <View style={{ marginBottom: 10, marginTop: 10, width: 200 }}>
                        <ButtonP label="Próximo" onPress={cadastropacQuatro} />
                    </View>

                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}