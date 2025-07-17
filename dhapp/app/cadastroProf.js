import ButtonP from '@/components/ButtonP';
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function CadastroProfissional() {
  const router = useRouter(); 

  const [form, setForm] = useState({
    nomeCompleto: '',
    cpf: '',
    nomeSocial: '',
    dataNascimento: '',
    genero: ''
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (!form.cpf) {
      alert("Informe o CPF para continuar.");
      return;
    }

    router.push({
      pathname: '/cadastroProfDois',
      params: { cpf: form.cpf }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#081221' }}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContainer}
        extraScrollHeight={100}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.containerForm}>
          {/* Campos do formulário */}
          <Text style={styles.textForm}>Nome completo*</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => handleChange('nomeCompleto', text)}
            value={form.nomeCompleto}
          />

          <Text style={styles.textForm}>CPF* (Será o método de login)</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => handleChange('cpf', text)}
            value={form.cpf}
          />

          <Text style={styles.textForm}>Nome social</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => handleChange('nomeSocial', text)}
            value={form.nomeSocial}
          />

          <Text style={styles.textForm}>Data de nascimento</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => handleChange('dataNascimento', text)}
            value={form.dataNascimento}
          />

          <Text style={styles.textForm}>Gênero</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => handleChange('genero', text)}
            value={form.genero}
          />

          <ButtonP label="Continuar" onPress={handleSubmit} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: '#081221',
  },
  containerForm: {
    gap: 10,
  },
  input: {
    backgroundColor: '#081221',
    color: '#fff',
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 2,
    fontSize: 16,
    height: 40,
  },
  textForm: {
    color: '#fff',
    fontSize: 16,
  },
});