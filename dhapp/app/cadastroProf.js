import ButtonP from '@/components/ButtonP';
import { useProfissional } from '@/context/context';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { finalizarCadastro, telaInicial } from '../routes/rotas';
import { unidades } from "../unidades/unidades";
import styles from "./styleForms";
import MaskInput from 'react-native-mask-input';

export default function CadastroProfissional() {
  const cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  const dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const db = useSQLiteContext();
  const { profissionaldados, setProfissionaldados } = useProfissional();
  const [unidadeSelecionada, setUnidadeSelecionada] = useState();
  const [funcaoSelecionada, setFuncaoSelecionada] = useState();
  const [valorGenero, setValorGenero] = useState();
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const generos = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
    { label: 'Outro', value: 'outro' },
  ];

  const funcoes = [
    { label: "ACS", value: "ACS" },
    { label: "Enfermeira(o)", value: "Enfermeira(o)" },
    { label: "Assistente de Enfermagem", value: "Assistente de Enfermagem" },
    { label: "Administrativo", value: "Administrativo" },
  ];

  async function salvarProfissional() {
    const { nomeCompleto, cpf, nomeSocial, dataNascimento, genero, unidadeSaude, funcao } = profissionaldados;

    if (!nomeCompleto || !cpf || !dataNascimento || !genero || !unidadeSaude || !funcao || !senha || !confirmarSenha) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const senhaHash = senha;

      await db.runAsync(
        `INSERT INTO Profissional 
          (nome_completo, cpf, nome_social, data_nascimento, genero, unidadeSaude, funcao, senha_Hash) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          nomeCompleto,
          cpf,
          nomeSocial || null,
          dataNascimento,
          genero,
          unidadeSaude,
          funcao,
          senhaHash
        ]
      );

      alert("Cadastrado concluído!");
      telaInicial();

    } catch (error) {
      console.error("Erro ao salvar no banco:", error);
      alert("Erro ao salvar profissional. Verifique se o CPF já está cadastrado.");
    }
  }

  async function listarProfissionais() {
    try {
      const result = await db.getAllAsync(`SELECT * FROM Profissional`);
      console.log("Profissionais cadastrados:", result);
      alert("Dados listados no console.");
    } catch (error) {
      console.error("Erro ao listar profissionais:", error);
      alert("Erro ao buscar dados.");
    }
  }

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
      <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={281} enableOnAndroid={true}>
        <View style={styles.container}>
          <View style={styles.containerForm}>

            <Text style={styles.titulo}>Cadastro de Profissional</Text>

            <Text style={styles.textoPequeno}>Campos com * são obrigatórios</Text>

            <View>
              <Text style={styles.textForm}>Nome completo*</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: Rene Vitor França de Melo'
                placeholderTextColor={'lightgrey'}
                onChangeText={(text) => setProfissionaldados(prev => ({ ...prev, nomeCompleto: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>CPF* (Será o método de login)</Text>
              <MaskInput
                style={styles.input}
                mask={cpfMask}
                value={cpf}
                maxLength={14}
                placeholder='ex: 123.456.789-00'
                placeholderTextColor={'lightgrey'}
                keyboardType="numeric"
                onChangeText={(masked, unmasked) => {
                setCpf(masked); // mostra formatado
                setProfissionaldados(prev => ({ ...prev, cpf: unmasked })); // salva limpo no contexto
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Nome social</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: Rene Vitor França de Melo'
                placeholderTextColor={'lightgrey'}
                onChangeText={(text) =>
                  setProfissionaldados(prev => ({ ...prev, nomeSocial: text }))
                }
              />
            </View>

            <View>
              <Text style={styles.textForm}>Data de nascimento</Text>
              <MaskInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={10}
                mask={dateMask}
                value={dataNascimento}
                placeholder="ex: 15/04/1993"
                placeholderTextColor="lightgrey"
                onChangeText={(masked, unmasked) => {
                  setDataNascimento(masked); // mostra com a máscara
                  setProfissionaldados(prev => ({
                    ...prev,
                    dataNascimento: unmasked
                  })); // salva sem a máscara
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Gênero</Text>
              <Dropdown
                style={styles.input}
                placeholderStyle={styles.exemplo}
                selectedTextStyle={styles.textForm}
                containerStyle={styles.dropdownContainer}
                itemTextStyle={styles.textForm}
                activeColor='#081221'
                data={generos}
                labelField="label"
                valueField="value"
                placeholder="Selecione"
                value={valorGenero}
                onChange={item => {
                  setValorGenero(item.value);
                  setProfissionaldados(prev => ({
                    ...prev,
                    genero: item.value
                  }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Unidade de saúde*</Text>
              <Dropdown
                style={styles.input}
                placeholderStyle={styles.exemplo}
                selectedTextStyle={styles.textForm}
                containerStyle={styles.dropdownContainer}
                itemTextStyle={styles.textForm}
                activeColor='#081221'
                data={unidades}
                labelField="label"
                valueField="value"
                placeholder="Listagem aqui"
                value={unidadeSelecionada}
                onChange={(item) => {
                  setUnidadeSelecionada(item.value);
                  setProfissionaldados((prev) => ({
                    ...prev,
                    unidadeSaude: item.value,
                  }));
                }}
              />
            </View>


            <View>
              <Text style={styles.textForm}>Função/Cargo</Text>
              <Dropdown
                style={styles.input}
                placeholderStyle={styles.exemplo}
                selectedTextStyle={styles.textForm}
                containerStyle={styles.dropdownContainer}
                itemTextStyle={styles.textForm}
                activeColor='#081221'
                data={funcoes}
                labelField="label"
                valueField="value"
                placeholder="Selecione"
                value={funcaoSelecionada}
                onChange={(item) => {
                  setFuncaoSelecionada(item.value);
                  setProfissionaldados((prev) => ({
                    ...prev,
                    funcao: item.value,
                  }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Senha*</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: senh@123'
                placeholderTextColor={'lightgrey'}
                secureTextEntry
                onChangeText={(text) => setSenha(text)}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Confirmar senha*</Text>
              <TextInput
                style={styles.input}
                placeholder='ex: senh@123'
                placeholderTextColor={'lightgrey'}
                secureTextEntry
                onChangeText={(text) => setConfirmarSenha(text)}
              />
            </View>
          </View>

          <View style={{ marginBottom: 20, width: 200 }}>
            <ButtonP label="Continuar" onPress={salvarProfissional} />
            <ButtonP label="Profissionais Cadastrados" onPress={listarProfissionais} />
          </View>

        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}