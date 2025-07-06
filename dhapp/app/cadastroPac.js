import ButtonP from '@/components/ButtonP';
import { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';
import { cadastropacDois } from '../routes/rotas';

export default function CadastroPac() {
  const [valor, Setvalor] = useState();
  const [aberto, Setaberto] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
  ]);

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
          <DropDownPicker
            open={aberto}
            value={value}
            items={items}
            setOpen={Setaberto}
            setValue={setValue}
            setItems={setItems}
            placeholder="Selecione o gênero"
            listMode="SCROLLVIEW"
            style={{ marginBottom: aberto ? 150 : 8 }} // espaço extra quando aberto
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
            <RadioButton.Group onValueChange={Setvalor} value={valor}>
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