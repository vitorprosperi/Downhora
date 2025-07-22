import ButtonP from '@/components/ButtonP';
import { usePaciente } from '@/context/context';
import { useState } from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styleForms';

export default function CadastroPacQuatro() {

    const { pacientedados, setPacientedados } = usePaciente();

    const [valor1, setValor1] = useState(null);

    const [valor2, setValor2] = useState(null);

    const [valor3, setValor3] = useState(null);

    const verTodos = () => {
        console.log('Dados do paciente até agora:', pacientedados);
        console.log('Cadastro finalizado com sucesso!');
    };

    const itens1 = [
        { label: 'Ensino fundamental incompleto', value: 'ensino_fundamental_incompleto' },
        { label: 'Ensino fundamental completo', value: 'ensino_fundamental_completo' },
        { label: 'Ensino médio incompleto', value: 'ensino_medio_incompleto' },
        { label: 'Ensino médio completo', value: 'ensino_medio_completo' },
        { label: 'Ensino superior incompleto', value: 'ensino_superior_incompleto' },
        { label: 'Ensino superior completo', value: 'ensino_superior_completo' },
        { label: 'Pós graduação', value: 'pos_graduacao' },
    ];

    const itens2 = [
        { label: 'Total', value: 'total' },
        { label: 'Parcial', value: 'parcial' },
        { label: 'Não', value: 'nao' },
    ];

    const itens3 = [
        { label: 'Sim', value: 'sim' },
        { label: 'Não', value: 'nao' },
    ];

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
            <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280} enableOnAndroid={true}>
                <View style={styles.container}>
                    <View style={styles.containerForm}>
                        
                        <View>
                            <Text style={styles.textForm}>Escolaridade</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.textForm}
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
                                    setPacientedados(prev => ({ ...prev, escolaridade: item.value }));
                                }}
                            />
                        </View>

                        <View>
                            <Text style={styles.textForm}>Nome da escola</Text>
                            <TextInput style={styles.input}
                                onChangeText={(text) => setPacientedados(prev => ({ ...prev, escola: text }))} />
                        </View>

                        <View>
                            <Text style={styles.textForm}>Unidade APAE</Text>
                            <TextInput style={styles.input}
                                onChangeText={(text) => setPacientedados(prev => ({ ...prev, uniapae: text }))} />
                        </View>

                        <View>
                            <Text style={styles.textForm}>Autonomia de comunicação</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.textForm}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#081221'
                                data={itens2}
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
                            <Text style={styles.textForm}>Acompanhamento multiprofissional</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.textForm}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#081221'
                                data={itens3}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={valor3}
                                onChange={item => {
                                    setValor3(item.value);
                                    setPacientedados(prev => ({ ...prev, acompanhamento: item.value }));
                                }}
                            />
                        </View>

                        <ButtonP label="FInalizar cadastro" onPress={verTodos} />

                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}