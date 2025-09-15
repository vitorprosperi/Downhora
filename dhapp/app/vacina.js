import { View, Text, TextInput } from "react-native";
import { FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../supabaseserver";
import styles from "./styleForms";
import { useState } from "react";

export default function Vacina() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [msg, setMsg] = useState("");

  async function enviarDados() {
    const { data, error } = await supabase
      .from("usuarios")
      .insert([{ nome, cpf }]); // id e created_at são automáticos

    if (error) {
      console.error("Erro ao enviar:", error.message);
      setMsg("Erro ao enviar dados");
    } else {
      console.log("Dados enviados:", data);
      setMsg("Dados enviados com sucesso!");
      setNome("");
      setCpf("");
    }
  }

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.corEscura}>
      <View style={styles.telaInicio}>
        <TextInput
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          style={{ backgroundColor: "#fff", marginBottom: 10, padding: 8 }}
        />
        <TextInput
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          style={{ backgroundColor: "#fff", marginBottom: 10, padding: 8 }}
          keyboardType="numeric"
        />

        <Text style={{ color: "white", marginBottom: 20 }}>{msg}</Text>

        <FAB
          icon="upload"
          color="#FAFAFF"
          style={styles.fab}
          customSize={76}
          onPress={enviarDados}
          mode="flat"
        />
      </View>
    </SafeAreaView>
  );
}
