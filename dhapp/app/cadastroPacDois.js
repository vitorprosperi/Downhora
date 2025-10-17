import ButtonP from '@/components/ButtonP';
import { MyDropdown } from '@/components/MyDropdown';
import { MyInput } from '@/components/MyInput';
import { usePaciente } from '@/context/context';
import { useState } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cadastropacTres } from "../routes/rotas";
import styles from './styleForms';

export default function CadastroPacDois() {

    const { pacientedados, setPacientedados } = usePaciente();

    // Outros campos já existentes
    const [valor6, setValor6] = useState(null); // Alergias
    const [valor7, setValor7] = useState(null); // Tipo sanguíneo

    // Itens dos dropdowns (Sim/não)
    const itensSimNao = [
        { label: 'Sim', value: 'Sim' },
        { label: 'Não', value: 'Não' },
    ];
    // Itens das comorbidades
    const itensComorbidades = [
        { label: 'Cardíaca', value: 'Cardíaca' },
        { label: 'Tireoidiana', value: 'Tireoidiana' },
        { label: 'Outra', value: 'Outro' },
    ];
    // Itens do tipo sanguíneo
    const itensTipoSangue = [
        { label: 'A+', value: 'A+' },
        { label: 'A-', value: 'A-' },
        { label: 'B+', value: 'B+' },
        { label: 'B-', value: 'B-' },
        { label: 'AB+', value: 'AB+' },
        { label: 'AB-', value: 'AB-' },
        { label: 'O+', value: 'O+' },
        { label: 'O-', value: 'O-' },
    ];

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
            <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280}>
                <View style={styles.container}>
                    <View style={styles.containerForm}>

                        <View>
                            <Text style={styles.titulo}>Cadastro de pessoa com síndrome de Down</Text>
                            <Text style={styles.subTitulo}>Histórico médico</Text>
                        </View>
                        
                        {/* Tipo de comorbidade */}
                        <View>
                            <Text style={styles.textForm}>Doenças relacionadas</Text>
                            <MyInput
                                style={styles.input}
                                placeholder='Ex: Cardíaca, Tireoidiana'
                                placeholderTextColor={'grey'}
                                onChangeText={(text) => setPacientedados(prev => ({ ...prev, comorbidades: text }))}
                            />
                        </View>

                        {/* Medicamento em uso */}
                        <View>
                            <Text style={styles.textForm}>Medicamentos em uso</Text>
                            <MyInput
                                style={styles.input}
                                placeholder='Ex: Losartana'
                                placeholderTextColor={'grey'}
                                onChangeText={(text) => setPacientedados(prev => ({ ...prev, medicamento: text }))}
                            />
                        </View>

                        {/* Alergias */}
                        <View>
                            <Text style={styles.textForm}>Alergias</Text>
                            <MyDropdown
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
                                        alergia: item.value === 'Sim' ? prev.alergia || '' : 'não'
                                    }));
                                }}
                            />
                        </View>
                        {valor6 === 'Sim' && (
                                <View>
                                    <Text style={styles.textForm}>Quais alergias?</Text>
                                    <MyInput
                                        style={styles.input}
                                        placeholder='Ex: Rinite alérgica'
                                        placeholderTextColor={'grey'}
                                        value={pacientedados.alergia === 'não' ? '' : pacientedados.alergia || ''}
                                        onChangeText={text => setPacientedados(prev => ({ ...prev, alergia: text }))}
                                    />
                                </View>
                            )}

                        {/* Tipo sanguíneo */}
                        <View>
                            <Text style={styles.textForm}>Tipo sanguíneo</Text>
                            <MyDropdown
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
                        <ButtonP label="Próximo" onPress={cadastropacTres} />
                    </View>

                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}