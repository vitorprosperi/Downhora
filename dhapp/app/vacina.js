import { View, Text, TextInput, FlatList } from "react-native";
import { FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../supabaseserver";
import styles from "./styleForms";
import { useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";

export default function Vacina() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [msg, setMsg] = useState("");

  const [exames, setExames] = useState([]); // lista de exames do SQLite

  const db = useSQLiteContext();

  async function enviarDados() {
    const { data, error } = await supabase
      .from("usuarios")
      .insert([{ nome, cpf }]); 

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

  // Recuperar exames do SQLite
  async function carregarExames() {
    try {
      const result = await db.getAllAsync("SELECT * FROM Exames");
      setExames(result);
      console.log("Exames recuperados do SQLite:", result);
    } catch (err) {
      console.error("Erro ao buscar exames no SQLite:", err);
    }
  }

  useEffect(() => {
    carregarExames();
  }, []);

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

        {/* Lista de exames salvos no SQLite */}
        <Text style={{ color: "black", marginTop: 30, fontSize: 18 }}>
          Exames salvos localmente:
        </Text>
        <FlatList
          data={exames}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: "#333", marginVertical: 5, padding: 10, borderRadius: 8 }}>
              <Text style={{ color: "white" }}>ID: {item.id}</Text>
              <Text style={{ color: "white" }}>Tipo: {item.tipo_exame}</Text>
              <Text style={{ color: "white" }}>Data: {item.data_exame}</Text>
              <Text style={{ color: "white" }}>Médico: {item.medico_responsavel}</Text>
              <Text style={{ color: "white" }}>Obs: {item.observacoes}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
