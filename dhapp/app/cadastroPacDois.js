import ButtonP from '@/components/ButtonP';
import { useState } from "react";
import { ScrollView, Text, TextInput, View, ActivityIndicator } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { buscarcep } from "../API Correios/endereco";
import { cadastropacTres } from "../routes/rotas";
import { unidades } from "../unidades/unidades";
import { usePaciente } from '@/context/context';

export default function CadastroPacDois() {

  const { setPacientedados } = usePaciente();

  const[loading, setLoading] = useState(false);
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [valor, setValor] = useState(null);
  const itens = unidades;

  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={{ padding: 16 }}>

        {/* Header */}
        <View>
          <Text>Cadastro de Pessoas com SD. Down</Text>
          <Text>Endereço</Text>
        </View>

        {/* Formulário */}
        <View>
          <Text>CEP*</Text>
          <TextInput
            style={{ borderWidth: 1, marginBottom: 8 }}
            maxLength={8}
            value={cep}
            onChangeText={(text) => {
              setCep(text);
              setPacientedados(prev => ({ ...prev, cep: text }));
            }}
            keyboardType="numeric"
            onBlur={() =>
              buscarcep(
                cep,
                (rua) => {
                  setRua(rua);
                  setPacientedados(prev => ({ ...prev, rua }));
                },
                (bairro) => {
                  setBairro(bairro);
                  setPacientedados(prev => ({ ...prev, bairro }));
                },
                (cidade) => {
                  setCidade(cidade);
                  setPacientedados(prev => ({ ...prev, cidade }));
                },
                (estado) => {
                  setEstado(estado);
                  setPacientedados(prev => ({ ...prev, estado }));
                },
                setLoading
              )
            }
          />
          {loading && <ActivityIndicator size="small" color="#0000ff" />}
          <Text>Rua*</Text>
          <TextInput
            style={{ borderWidth: 1, marginBottom: 8 }}
            value={rua}
            editable={!loading}
            onChangeText={(text) => {
              setRua(text);
              setPacientedados(prev => ({ ...prev, rua: text }));
            }}
          />

          <Text>Número*</Text>
          <TextInput
            style={{ borderWidth: 1, marginBottom: 8 }}
            keyboardType="numeric"
            value={numero}
            onChangeText={(text) => {
              setNumero(text);
              setPacientedados(prev => ({ ...prev, numero: text }));
            }}
          />

          <Text>Complemento*</Text>
          <TextInput
            style={{ borderWidth: 1, marginBottom: 8 }}
            value={complemento}
            onChangeText={(text) => {
              setComplemento(text);
              setPacientedados(prev => ({ ...prev, complemento: text }));
            }}
          />

          <Text>Bairro*</Text>
          <TextInput
            style={{ borderWidth: 1, marginBottom: 8 }}
            value={bairro}
            onChangeText={(text) => {
              setBairro(text);
              setPacientedados(prev => ({ ...prev, bairro: text }));
            }}
          />

          <Text>Cidade*</Text>
          <TextInput
            style={{ borderWidth: 1, marginBottom: 8 }}
            value={cidade}
            onChangeText={(text) => {
              setCidade(text);
              setPacientedados(prev => ({ ...prev, cidade: text }));
            }}
          />

          <Text>Estado*</Text>
          <TextInput
            style={{ borderWidth: 1, marginBottom: 8 }}
            value={estado}
            onChangeText={(text) => {
              setEstado(text);
              setPacientedados(prev => ({ ...prev, estado: text }));
            }}
          />

          <Text>Unidade de Saúde*</Text>
          <Dropdown
            style={{ borderWidth: 1, marginBottom: 8 }}
            data={itens}
            labelField="label"
            valueField="value"
            placeholder="Selecione a unidade"
            search
            searchPlaceholder="Pesquisar unidade"
            value={valor}
            onChange={item => {
            setValor(item.value);
            setPacientedados(prev => ({ ...prev, unidadeSaude: item.value }));
            }}
          />
        </View>
        <ButtonP label="Próximo" onPress={cadastropacTres} />
      </View>
    </ScrollView>
  );
}
