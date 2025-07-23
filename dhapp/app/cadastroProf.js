import ButtonP from '@/components/ButtonP';
import { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfissional } from '@/context/context';
import { cadastroprofdois, testecadastroprof, testeCadastroProf } from '../routes/rotas';
import { useSQLiteContext } from 'expo-sqlite';
import styles from "./styleForms";

export default function CadastroProfissional() {
  const db = useSQLiteContext();
  const { profissionaldados, setProfissionaldados } = useProfissional();

  const [valorGenero, setValorGenero] = useState(null);
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const generos = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
    { label: 'Outro', value: 'outro' },
  ];

  async function salvarProfissional() {
    const { nomeCompleto, cpf, nomeSocial, dataNascimento, genero } = profissionaldados;

    if (!nomeCompleto || !cpf || !senha || !confirmarSenha) {
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
          (nome_completo, cpf, nome_social, data_nascimento, genero, senha_hash) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          nomeCompleto,
          cpf,
          nomeSocial || null,
          dataNascimento || null,
          genero || null,
          senhaHash
        ]
      );

      alert("Profissional cadastrado com sucesso!");
      testecadastroprof();

    } catch (error) {
      console.error("Erro ao salvar no banco:", error);
      alert("Erro ao salvar profissional. Verifique se o CPF já está cadastrado.");
    }
  }

  async function listarProfissionais() {
    try {
      const result = await db.getAllAsync(`SELECT * FROM Profissional`);
      console.log("Profissionais cadastrados:", result);
      alert("Dados listados");
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

            <View>
              <Text style={styles.textForm}>Nome completo*</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setProfissionaldados(prev => ({ ...prev, nomeCompleto: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>CPF* (Será o método de login)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => setProfissionaldados(prev => ({ ...prev, cpf: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Nome social</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setProfissionaldados(prev => ({ ...prev, nomeSocial: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Data de nascimento</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => setProfissionaldados(prev => ({ ...prev, dataNascimento: text }))}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Gênero</Text>
              <Dropdown
                style={styles.input}
                placeholderStyle={styles.textForm}
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
                  setProfissionaldados(prev => ({ ...prev, genero: item.value }));
                }}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Senha*</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                onChangeText={(text) => setSenha(text)}
              />
            </View>

            <View>
              <Text style={styles.textForm}>Confirmar senha*</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                onChangeText={(text) => setConfirmarSenha(text)}
              />
            </View>

            <ButtonP label="Continuar" onPress={salvarProfissional} />
            <ButtonP label="Profissionais Cadastrados" onPress={listarProfissionais} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}