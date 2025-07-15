import { useState } from "react";
import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import { cadastroprofdois } from "../routes/rotas";
import ButtonP from "../components/ButtonP";

export default function CadastroProfissionalUm() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpf, setCpf] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");

  return (
    <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.container}>
      <View style={styles.containerForm}>
        <View style={{ marginBottom: 16 }}>
          <Text style={[styles.textForm, { fontSize: 18, fontWeight: "bold" }]}>
            Cadastro de Profissional
          </Text>
          <Text style={styles.textForm}>Dados pessoais</Text>
        </View>

        <View>
          <Text style={styles.textForm}>Nome completo*</Text>
          <TextInput
            style={styles.input}
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
          />

          <Text style={styles.textForm}>CPF* (Será o método de login)</Text>
          <TextInput
            style={styles.input}
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
            maxLength={11}
          />

          <Text style={styles.textForm}>Nome social</Text>
          <TextInput
            style={styles.input}
            value={nomeSocial}
            onChangeText={setNomeSocial}
          />

          <Text style={styles.textForm}>Data de nascimento</Text>
          <TextInput
            style={styles.input}
            value={dataNascimento}
            onChangeText={setDataNascimento}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#ccc"
          />

          <Text style={styles.textForm}>Gênero</Text>
          <TextInput
            style={styles.input}
            value={genero}
            onChangeText={setGenero}
          />
        </View>

        <View style={{ marginTop: 16 }}>
          <ButtonP label="Continuar" onPress={cadastroprofdois} />
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