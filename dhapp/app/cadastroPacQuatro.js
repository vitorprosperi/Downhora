import ButtonP from '@/components/ButtonP';
import { usePaciente } from '@/context/context';
import NetInfo from '@react-native-community/netinfo'; // para checar internet
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
                options: {
                    data: { cpf: cpf },
                },
            });

            if (error) {
                console.error("Erro no Auth:", error.message);
                Alert.alert("Erro", "Não foi possível criar o usuário no Supabase Auth");
                return null;
            }

            console.log("Usuário Auth criado:", data.user);
            return data.user;
        } catch (err) {
            console.error("Erro inesperado:", err);
            return null;
        }
    };

    const salvarPaciente = async () => {
        try {
            //Salva localmente no SQLite
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

            const usuarioId = result.lastInsertRowId;

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

            console.log("Paciente salvo no SQLite");

            // Cria usuário também no Supabase Auth
            if (pacientedados.cpf && pacientedados.senha) {
                await registrarAuth(pacientedados.cpf, pacientedados.senha);
            }

            // Checa conexão e tenta sincronizar com Supabase
            const netState = await NetInfo.fetch();
            if (netState.isConnected) {
                const { error } = await supabase
                    .from("usuarios") // nome da tabela no Supabase
                    .insert([{
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

                if (error) {
                    console.error("Erro ao sincronizar com Supabase:", error);
                } else {
                    console.log("Paciente também salvo no Supabase");
                }
            } else {
                console.log("Sem internet: paciente será sincronizado depois");
            }

        } catch (error) {
            console.error("Erro ao salvar paciente:", error);
        }
    };

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
            <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280} enableOnAndroid={true}>
                <View style={styles.container}>
                    <View className={styles.containerForm}>
                        <Text style={styles.titulo}>Cadastro de Pessoa com Sd. Down</Text>
                        <Text style={styles.subTitulo}>Informações complementares</Text>

                        {/* Escolaridade */}
                        <View>
                            <Text style={styles.textForm}>Escolaridade</Text>
                            <Dropdown
                                style={styles.input}
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
                    </View>

                    <View style={{ marginBottom: 10, width: 200 }}>
                        <ButtonP label="Finalizar cadastro" onPress={salvarPaciente} />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}