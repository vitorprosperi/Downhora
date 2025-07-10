import ButtonP from '@/components/ButtonP';
import { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import { cadastropacDois } from '../routes/rotas';
import { Dropdown } from 'react-native-element-dropdown';

export default function CadastroPac() {
  //Variáveis para o funcionamento do dropdown
  const [valor, setValor] = useState(null);
  const [value, setValue] = useState(null);
  const itens = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
    { label: 'Outro', value: 'outro' },
  ]

  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={{ padding: 16 }}>
        {/* View da header */}
        <View>
          <Text>Cadastro de Pessoas com SD. Down</Text>
          <Text>Dados Pessoais</Text>
          <Text>Campos com * são obrigatórios</Text>
        </View>

        {/* View do formulário */}
        <View style={{ marginTop: 16 }}>
          <Text>Nome Completo*</Text>
          <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

          <Text>Data de Nascimento*</Text>
          <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

          <Text>Gênero*</Text>
          <Dropdown
            style={{ borderWidth: 1, marginBottom: 8 }}
            data={itens}
            labelField="label"
            valueField="value"
            placeholder="Selecione o gênero"
            value={value}
            onChange={item => setValue(item.value)}         
          />

          <Text>CPF*</Text>
          <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

          <Text>CNS*</Text>
          <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

          <Text>Nome da mãe*</Text>
          <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

          <Text>Nome do responsável*</Text>
          <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

          <Text>Telefone do responsável*</Text>
          <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

          <Text>E-mail do responsável*</Text>
          <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

          <Text>Nº do Prontuário*</Text>
          <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />

          {/* View dos botões do prontuário */}
          <View style={{ marginBottom: 16 }}>
            <RadioButton.Group onValueChange={setValor} value={valor}>
              <RadioButton.Item label="UBS" value="UBS" />
              <RadioButton.Item label="Unesp" value="Unesp" />
            </RadioButton.Group>
          </View>
          <ButtonP label="Continuar" onPress={cadastropacDois}/>
        </View>
      </View>
    </ScrollView>
  );
}