import ButtonP from '@/components/ButtonP';
import { useProfissional } from '@/context/context';
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfissional } from '@/context/context';
import { cadastroprofdois, proximoPasso } from '../routes/rotas';
import { useSQLiteContext } from 'expo-sqlite';

export default function CadastroProfissional() {
  const db = useSQLiteContext();

  async function salvarProfissional() {
    const { nomeCompleto, cpf, nomeSocial, dataNascimento, genero } = profissionaldados;

    if (!cpf) {
      alert("CPF obrigatório.");
      return;
    }

    try {
      await db.runAsync(
        `INSERT INTO Profissional 
        (nome_completo, cpf, nome_social, data_nascimento, genero) 
       VALUES (?, ?, ?, ?, ?)`,
        [
          nomeCompleto,
          cpf,
          nomeSocial || null,
          dataNascimento,
          genero
        ]
      );
      alert("Profissional cadastrado com sucesso!");
      cadastroprofdois();
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
  const { profissionaldados, setProfissionaldados } = useProfissional();

  const [valorGenero, setValorGenero] = useState(null);

  const generos = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
    { label: 'Outro', value: 'outro' },
  ];

  return (
    <KeyboardAwareScrollView extraHeight={280} enableOnAndroid={true}>
      <SafeAreaView style={styles.container}>
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

          <ButtonP label="Continuar" onPress={salvarProfissional} />
          <ButtonP label="Profissionais Cadastrados" onPress={listarProfissionais} />

        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

