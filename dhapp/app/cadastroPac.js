import ButtonP from '@/components/ButtonP';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from "react-native-paper";
import { cadastropacDois } from '../routes/rotas';

export default function CadastroPac() {
  const db = useSQLiteContext();

  const [form, setForm] = useState({
  nomeCompleto: '',
  dataNascimento: '',
  cpf: '',
  cns: '',
  nomeMae: '',
  nomeResponsavel: '',
  telefoneResponsavel: '',
  emailResponsavel: '',
  prontuario: '',
});

  //Variáveis para o funcionamento do dropdown
  const [valor, setValor] = useState(null);
  const [value, setValue] = useState(null);
  const itens = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
    { label: 'Outro', value: 'outro' },
  ];

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

      console.log("Sucesso", "Paciente cadastrado com sucesso!");
    } catch (error) {
      console.error(error.message);
      console.log("Erro", error.message);
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
      <View style={styles.container}>
        
        {/* View do formulário */}
          <View style={styles.containerForm}>
        
            <View>
              <Text style={styles.textForm}>Nome Completo*</Text>
              <TextInput style={styles.input} onChangeText={text => handleChange('nomeCompleto', text)} />
            </View>

            <View>
              <Text style={styles.textForm}>Data de Nascimento*</Text>
              <TextInput style={styles.input} onChangeText={text => handleChange('dataNascimento', text)} />
            </View>

            <View>
            <Text style={styles.textForm}>Gênero*</Text>
            <Dropdown
                 style={styles.input}
                 placeholderStyle={styles.textForm}
                 data={itens}
                 labelField="label"
                 valueField="value"
                 placeholder="Selecione"
                 value={value}
                 onChange={item => setValue(item.value)}         
             />
            </View>

            <View>
              <Text style={styles.textForm}>CPF*</Text>
              <TextInput style={styles.input} onChangeText={text => handleChange('cpf', text)} />
            </View>

            <View>
            <Text style={styles.textForm}>CNS*</Text>
            <TextInput style={styles.input}onChangeText={text => handleChange('cns', text)} />
            </View>

            <View>
              <Text style={styles.textForm}>Nome da mãe*</Text>
              <TextInput style={styles.input} onChangeText={text => handleChange('nomeMae', text)} />
            </View>

            <View>
              <Text style={styles.textForm}>Nome do responsável*</Text>
              <TextInput style={styles.input}onChangeText={text => handleChange('nomeResponsavel', text)} />
            </View>

            <View>
              <Text style={styles.textForm}>Telefone do responsável*</Text>
              <TextInput style={styles.input} onChangeText={text => handleChange('telefoneResponsavel', text)} />
            </View>

            <View>
              <Text style={styles.textForm}>E-mail do responsável*</Text>
              <TextInput style={styles.input} onChangeText={text => handleChange('emailResponsavel', text)} />
            </View>

            <View>
              <Text style={styles.textForm}>Nº do Prontuário*</Text>
              <TextInput style={styles.input} onChangeText={text => handleChange('prontuario', text)} />
            </View>

            {/* View dos botões do prontuário */}
            <View style={{ marginBottom: 16 }}>
              <RadioButton.Group onValueChange={setValor} value={valor}>
                <RadioButton.Item label="UBS" value="UBS" />
                <RadioButton.Item label="Unesp" value="Unesp" />
              </RadioButton.Group>
            </View>

            <ButtonP label="Cadastrar Paciente" onPress={handleSubmit}/>
            <ButtonP label="Próximo" onPress={cadastropacDois}/>
            <ButtonP label="Consultar Pacientes" onPress={checkPacientes}/>

            
          </View>
          
      </View>
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#081221',
        paddingVertical: 50,
    },
    containerForm: {
        justifyContent: 'flex-start',
        gap: 5,
        width: 210,
    },
    input: {
        backgroundColor: '#081221',
        color: '#fff',
        paddingVertical: 3,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 2,
        width: '100%',
    },
    textForm: {
        color: '#fff',
    }
})