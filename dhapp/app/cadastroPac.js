import ButtonP from '@/components/ButtonP';
import { useState } from "react";
import { View, Text, TextInput, ScrollView, Button, StyleSheet, Alert } from "react-native";
import { RadioButton } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';
import { cadastropacDois } from '../routes/rotas';
import { useSQLiteContext } from 'expo-sqlite';

export default function CadastroPac() {
  const db = useSQLiteContext();

  const [form, setForm] = useState({
    nomeCompleto: '',
    dataNascimento: '',
    genero: '',
    cpf: '',
    cns: '',
    nomeMae: '',
    nomeResponsavel: '',
    telefoneResponsavel: '',
    emailResponsavel: '',
    prontuario: '',
    unidadeAtendimento: '',
  });

  const [valor, Setvalor] = useState();
  const [aberto, Setaberto] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
  ]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      if (
        !form.nomeCompleto ||
        !form.dataNascimento ||
        !value || 
        !form.cpf ||
        !form.nomeResponsavel ||
        !form.telefoneResponsavel ||
        !form.emailResponsavel ||
        !form.prontuario ||
        !valor 
      ) {
        throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
      }

      await db.runAsync(
        `INSERT INTO PessoaSindromeDeDown 
        (nome_completo, data_nascimento, genero, cpf, cns, nome_mae, nome_responsavel, telefone_responsavel, email_responsavel, numero_prontuario, unidade_saude)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          form.nomeCompleto,
          form.dataNascimento,
          value,
          form.cpf,
          form.cns,
          form.nomeMae,
          form.nomeResponsavel,
          form.telefoneResponsavel,
          form.emailResponsavel,
          form.prontuario,
          valor
        ]
      );

      Alert.alert("Sucesso", "Paciente cadastrado com sucesso!");
    } catch (error) {
      console.error(error.message);
      Alert.alert("Erro", error.message);
    }
  };

  const checkPacientes = async () => {
    try {
      const results = await db.getAllAsync(
        'SELECT * FROM PessoaSindromeDeDown'
      );
      console.log('Pacientes cadastrados:', results);
    } catch (error) {
      console.error('Erro ao consultar pacientes:', error.message);
    }
  };

  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={{ padding: 16 }}>
        {/* Cabeçalho */}
        <Text>Cadastro de Pessoas com SD. Down</Text>
        <Text>Dados Pessoais</Text>
        <Text>Campos com * são obrigatórios</Text>

        {/* Formulário */}
        <Text>Nome Completo*</Text>
        <TextInput style={{ borderWidth: 1, marginBottom: 8 }} onChangeText={text => handleChange('nomeCompleto', text)} />

        <Text>Data de Nascimento*</Text>
        <TextInput style={{ borderWidth: 1, marginBottom: 8 }} onChangeText={text => handleChange('dataNascimento', text)} />

        <Text>Gênero*</Text>
        <DropDownPicker
          open={aberto}
          value={value}
          items={items}
          setOpen={Setaberto}
          setValue={setValue}
          setItems={setItems}
          placeholder="Selecione o gênero"
          listMode="SCROLLVIEW"
          style={{ marginBottom: aberto ? 150 : 8 }}
        />

        <Text>CPF*</Text>
        <TextInput style={{ borderWidth: 1, marginBottom: 8 }} onChangeText={text => handleChange('cpf', text)} />

        <Text>CNS*</Text>
        <TextInput style={{ borderWidth: 1, marginBottom: 8 }} onChangeText={text => handleChange('cns', text)} />

        <Text>Nome da mãe*</Text>
        <TextInput style={{ borderWidth: 1, marginBottom: 8 }} onChangeText={text => handleChange('nomeMae', text)} />

        <Text>Nome do responsável*</Text>
        <TextInput style={{ borderWidth: 1, marginBottom: 8 }} onChangeText={text => handleChange('nomeResponsavel', text)} />

        <Text>Telefone do responsável*</Text>
        <TextInput style={{ borderWidth: 1, marginBottom: 8 }} onChangeText={text => handleChange('telefoneResponsavel', text)} />

        <Text>E-mail do responsável*</Text>
        <TextInput style={{ borderWidth: 1, marginBottom: 8 }} onChangeText={text => handleChange('emailResponsavel', text)} />

        <Text>Nº do Prontuário*</Text>
        <TextInput style={{ borderWidth: 1, marginBottom: 8 }} onChangeText={text => handleChange('prontuario', text)} />

        {/* Unidade de atendimento */}
        <View style={{ marginBottom: 16 }}>
          <RadioButton.Group onValueChange={Setvalor} value={valor}>
            <RadioButton.Item label="UBS" value="UBS" />
            <RadioButton.Item label="Unesp" value="Unesp" />
          </RadioButton.Group>
        </View>

        {/* Botões */}
        <ButtonP label="Salvar Paciente" onPress={handleSubmit} />
        <ButtonP label="Próximo" onPress={cadastropacDois} />
        <ButtonP label="Ver pacientes" onPress={checkPacientes} />
      </View>
    </ScrollView>
  );
}