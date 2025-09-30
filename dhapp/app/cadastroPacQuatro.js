import ButtonP from '@/components/ButtonP';
import { usePaciente } from '@/context/context';
import NetInfo from '@react-native-community/netinfo';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from "../supabaseserver";
import styles from './styleForms';

export default function CadastroPacQuatro() {
    const { pacientedados, setPacientedados } = usePaciente();
    const db = useSQLiteContext();

    const [valor1, setValor1] = useState(null);
    const [valor2, setValor2] = useState(null);
    const [valor3, setValor3] = useState(null);

    // Função para registrar usuário no Supabase Auth
    const registrarAuth = async (cpf, senha) => {
        try {
            const emailFake = `${cpf}@meuapp.com`;

            const { data, error } = await supabase.auth.signUp({
                email: emailFake,
                password: senha,
                options: { data: { cpf } }
            });

            if (error) {
                console.error("Erro no Auth:", error.message);
                Alert.alert("Erro", "Não foi possível criar o usuário no Supabase Auth");
                return null;
            }

            const authUserId = data.user.id;

            const { error: errorUsuario } = await supabase
                .from("usuarios")
                .insert([{
                    id: authUserId,
                    nome: pacientedados.nome,
                    data_nascimento: pacientedados.data_nascimento,
                    genero: pacientedados.genero,
                    cpf: pacientedados.cpf,
                    cns: pacientedados.cns,
                    nome_mae: pacientedados.nome_mae,
                    nome_responsavel: pacientedados.nome_responsavel,
                    telefone_responsavel: pacientedados.telefone_responsavel,
                    email_responsavel: pacientedados.email_responsavel,
                    n_prontuario: pacientedados.n_prontuario,
                    unidade_prontuario: pacientedados.unidade_prontuario,
                }]);

            if (errorUsuario) {
                console.error("Erro ao sincronizar com Supabase (usuarios):", errorUsuario);
            } else {
                console.log("Paciente salvo no Supabase (usuarios)");
            }

            const { error: errorEndereco } = await supabase
                .from("endereco")
                .insert([{
                    usuario_id: authUserId,
                    cep: pacientedados.cep,
                    rua: pacientedados.rua,
                    estado: pacientedados.estado,
                    cidade: pacientedados.cidade,
                    bairro: pacientedados.bairro,
                    numero: pacientedados.numero,
                    complemento: pacientedados.complemento,
                    unidade_saude: pacientedados.unidadeSaude
                }]);

            if (errorEndereco) {
                console.error("Erro ao sincronizar com Supabase (endereco):", errorEndereco);
            } else {
                console.log("Endereço salvo no Supabase (endereco)");
            }

            const { error: errorHistorico } = await supabase
                .from("historico_medico")
                .insert([{
                    usuario_id: authUserId,
                    exame_cariotipo: pacientedados.cariotipo,
                    data_cariotipo: pacientedados.dataCariotipo,
                    triagem_auditiva: pacientedados.exameAuditivo,
                    data_triagem: pacientedados.dataAuditivo,
                    consulta_cardiologista: pacientedados.consultCardio,
                    data_cardiologista: pacientedados.dataCard,
                    teste_pezinho: pacientedados.testePe,
                    data_pezinho: pacientedados.dataPe,
                    consulta_oftalmo: pacientedados.oftalmo,
                    data_oftalmo: pacientedados.dataOftal,
                    consulta_fono: pacientedados.consultaFono,
                    data_fono: pacientedados.dataFono,
                    consulta_odonto: pacientedados.consultaOdonto,
                    data_odonto: pacientedados.dataOdonto,
                    consulta_endocrinologia: pacientedados.consultaEndocrino,
                    data_endocrinologia: pacientedados.dataEndocrino,
                    comorbidades: pacientedados.comorbidades,
                    medicamentos: pacientedados.medicamento,
                    alergias: pacientedados.alergia,
                    tipo_sanguineo: pacientedados.tiposangue
                }]);

            if (errorHistorico) {
                console.error("Erro ao sincronizar com Supabase (historico):", errorHistorico);
            } else {
                console.log("Histórico salvo no Supabase (historico)");
            }

            const { error: errorComplementar } = await supabase
                .from("complementares")
                .insert([{
                    usuario_id: authUserId,
                    escolaridade: pacientedados.escolaridade,
                    nome_escola: pacientedados.escola,
                    unidade_apae: pacientedados.uniapae,
                    autonomia_comunicacao: pacientedados.comunicacao,
                    acompanhamento_prof: pacientedados.acompanhamento_prof
                }]);

            if (errorComplementar) {
                console.error("Erro ao sincronizar com Supabase (complementar):", errorComplementar);
            } else {
                console.log("Complementar salvo no Supabase (complementar)");
            }

        } catch (err) {
            console.error("Erro inesperado:", err);
            return null;
        }
    };

    const salvarPaciente = async () => {
        let usuarioId = null;

        try {
            await db.execAsync('BEGIN TRANSACTION');

            const result = await db.runAsync(
                `INSERT INTO PessoaSindromeDeDown 
                  (nome_completo, data_nascimento, genero, cpf, cns, nome_mae, nome_responsavel, telefone_responsavel, email_responsavel, numero_prontuario, unidade_saude)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    pacientedados.nome,
                    pacientedados.data_nascimento,
                    pacientedados.genero,
                    pacientedados.cpf,
                    pacientedados.cns,
                    pacientedados.nome_mae,
                    pacientedados.nome_responsavel,
                    pacientedados.telefone_responsavel,
                    pacientedados.email_responsavel,
                    pacientedados.n_prontuario,
                    pacientedados.unidade_prontuario
                ]
            );
            usuarioId = result.lastInsertRowId;

            await db.runAsync(
                `INSERT INTO Endereco (pessoa_id, cep, rua, estado, cidade, bairro, numero, complemento, unidade_saude)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    usuarioId,
                    pacientedados.cep,
                    pacientedados.rua,
                    pacientedados.estado,
                    pacientedados.cidade,
                    pacientedados.bairro,
                    pacientedados.numero,
                    pacientedados.complemento,
                    pacientedados.unidadeSaude
                ]
            );

            await db.runAsync(
                `INSERT INTO HistoricoMedico 
                  (pessoa_id, exame_cariotipo, data_cariotipo, triagem_auditiva, data_triagem, consulta_cardiologista, data_cardiologista, teste_pezinho, data_pezinho, consulta_oftalmologista, data_oftalmo, consulta_fonoaudiologia, data_fono, consulta_odontologia, data_odonto, consulta_endocrinologia, data_endocrinologia, comorbidades, medicamento_em_uso, alergias, tipo_sanguineo)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    usuarioId,
                    pacientedados.cariotipo,
                    pacientedados.dataCariotipo,
                    pacientedados.exameAuditivo,
                    pacientedados.dataAuditivo,
                    pacientedados.consultCardio,
                    pacientedados.dataCard,
                    pacientedados.testePe,
                    pacientedados.dataPe,
                    pacientedados.oftalmo,
                    pacientedados.dataOftal,
                    pacientedados.consultaFono,
                    pacientedados.dataFono,
                    pacientedados.consultaOdonto,
                    pacientedados.dataOdonto,
                    pacientedados.consultaEndocrino,
                    pacientedados.dataEndocrino,
                    pacientedados.comorbidades,
                    pacientedados.medicamento,
                    pacientedados.alergia,
                    pacientedados.tiposangue
                ]
            );

            await db.runAsync(
                `INSERT INTO InformacoesComplementares (pessoa_id, escolaridade, nome_escola, unidade_apae, autonomia_comunicacao, acompanhamento_multiprofissional)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    usuarioId,
                    pacientedados.escolaridade,
                    pacientedados.escola,
                    pacientedados.uniapae,
                    pacientedados.comunicacao,
                    pacientedados.acompanhamento_prof
                ]
            );

            await db.execAsync('COMMIT');
            console.log("Paciente salvo no SQLite");

            if (pacientedados.cpf && pacientedados.senha) {
                await registrarAuth(pacientedados.cpf, pacientedados.senha);
            }

            const netState = await NetInfo.fetch();
            if (netState.isConnected) {
                console.log("Tem internet, dados enviados ao Supabase");
            } else {
                console.log("Sem internet: paciente será sincronizado depois");
            }
            Alert.alert("Cadastro concluído!");
        } catch (error) {
            await db.execAsync('ROLLBACK');
            console.error("Erro ao salvar paciente:", error);
        }
    };

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
            <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280} enableOnAndroid={true}>
                <View style={styles.container}>
                    <View style={styles.containerForm}>
                        <View>
                            <Text style={styles.titulo}>Cadastro de Pessoa com Sd. Down</Text>
                            <Text style={styles.subTitulo}>Informações complementares</Text>
                        </View>

                        {/* Escolaridade */}
                        <View>
                            <Text style={styles.textForm}>Escolaridade</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#F5F5FF'
                                data={[
                                    { label: 'Ensino fundamental incompleto', value: 'ensino_fundamental_incompleto' },
                                    { label: 'Ensino fundamental completo', value: 'ensino_fundamental_completo' },
                                    { label: 'Ensino médio incompleto', value: 'ensino_medio_incompleto' },
                                    { label: 'Ensino médio completo', value: 'ensino_medio_completo' },
                                    { label: 'Ensino superior incompleto', value: 'ensino_superior_incompleto' },
                                    { label: 'Ensino superior completo', value: 'ensino_superior_completo' },
                                    { label: 'Pós graduação', value: 'pos_graduacao' },
                                ]}
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

                        {/* Escola */}
                        <View>
                            <Text style={styles.textForm}>Nome da escola</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='ex: Colégio Cora Coralina'
                                placeholderTextColor={'grey'}
                                onChangeText={(text) => setPacientedados(prev => ({ ...prev, escola: text }))}
                            />
                        </View>

                        {/* APAE */}
                        <View>
                            <Text style={styles.textForm}>Unidade APAE</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='ex: APAE Botucatu'
                                placeholderTextColor={'grey'}
                                onChangeText={(text) => setPacientedados(prev => ({ ...prev, uniapae: text }))}
                            />
                        </View>

                        {/* Comunicação */}
                        <View>
                            <Text style={styles.textForm}>Autonomia de comunicação</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#F5F5FF'
                                data={[
                                    { label: 'Total', value: 'total' },
                                    { label: 'Parcial', value: 'parcial' },
                                    { label: 'Não', value: 'nao' },
                                ]}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={valor2}
                                onChange={item => {
                                    setValor2(item.value);
                                    setPacientedados(prev => ({ ...prev, comunicacao: item.value }));
                                }}
                            />
                        </View>

                        {/* Multiprofissional */}
                        <View>
                            <Text style={styles.textForm}>Acompanhamento multiprofissional</Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.exemplo}
                                selectedTextStyle={styles.textForm}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.textForm}
                                activeColor='#F5F5FF'
                                data={[
                                    { label: 'Sim', value: 'sim' },
                                    { label: 'Não', value: 'nao' },
                                ]}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecione"
                                value={valor3}
                                onChange={item => {
                                    setValor3(item.value);
                                    setPacientedados(prev => ({ ...prev, acompanhamento_prof: item.value }));
                                }}
                            />
                        </View>

                        <ButtonP onPress={salvarPaciente} label="Finalizar"/>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
