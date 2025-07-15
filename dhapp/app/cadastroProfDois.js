import { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { cadastroproftres } from "../routes/rotas";
import { unidades } from "../unidades/unidades"; 
import ButtonP from "../components/ButtonP";

export default function CadastroProfissionalDois() {
  const [unidade, setUnidade] = useState(null);
  const [funcao, setFuncao] = useState(null);

  const funcoes = [
    { label: "ACS", value: "ACS" },
    { label: "Enfermeira(o)", value: "Enfermeira(o)" },
    { label: "Assistente de Enfermagem", value: "Assistente de Enfermagem" },
    { label: "Administrativo", value: "Administrativo" },
  ];

  return (
    <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.container}>
      <View style={styles.containerForm}>
        <View style={{ marginBottom: 16 }}>
          <Text style={[styles.textForm, { fontSize: 18, fontWeight: "bold" }]}>
            Cadastro de Profissional
          </Text>
          <Text style={styles.textForm}>Dados profissionais</Text>
        </View>

        <Text style={styles.textForm}>Unidade de saúde*</Text>
        <Dropdown
          style={styles.input}
          placeholderStyle={{ color: "#fff" }}
          selectedTextStyle={{ color: "#fff" }}
          data={unidades}
          labelField="label"
          valueField="value"
          placeholder="Listagem aqui"
          value={unidade}
          onChange={item => setUnidade(item.value)}
        />

        <Text style={styles.textForm}>Função / Cargo</Text>
        <Dropdown
          style={styles.input}
          placeholderStyle={{ color: "#fff" }}
          selectedTextStyle={{ color: "#fff" }}
          data={funcoes}
          labelField="label"
          valueField="value"
          placeholder="Selecione"
          value={funcao}
          onChange={item => setFuncao(item.value)}
        />

        <View style={{ marginTop: 16 }}>
          <ButtonP label="Continuar" onPress={cadastroproftres} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    marginBottom: 8,
  },
  textForm: {
    color: '#fff',
  }
});