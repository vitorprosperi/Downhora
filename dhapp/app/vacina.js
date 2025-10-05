import { View, Text, TextInput, FlatList } from "react-native";
import { FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../supabaseserver";
import styles from "./styleForms";
import { useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";

export default function Vacina() {

  const [exames, setExames] = useState([]); // lista de exames do SQLite
  const [pessoaSindromedeDown, setPessoaSindromedeDown] = useState([]); // lista de pessoas com síndrome de Down
  const [historico, setHistorico] = useState();
  const [complementares, setComplementares] = useState([]);

  const db = useSQLiteContext();

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
// Recuperar pessoas com síndrome de Down do SQLite
  async function carregarPessoaSindromeDeDown() {
    try {
      const result = await db.getAllAsync("SELECT * FROM PessoaSindromeDeDown");
      setPessoaSindromedeDown(result);
      console.log("Pessoas com síndrome de Down recuperadas do SQLite:", result);
    } catch (err) {
      console.error("Erro ao buscar exames no SQLite:", err);
    }
  }

  // Recuperar histórico de vacinas do SQLite
  async function carregarHistorico() {
    try {
      const result = await db.getAllAsync("SELECT * FROM HistoricoMedico");
      setHistorico(result);
      console.log("Histórico de exames recuperado do SQLite:", result);
    } catch (err) {
      console.error("Erro ao buscar histórico de exames no SQLite:", err);
    }
  }

  // Recuperar informações complementares do SQLite
  async function carregarComplementares() {
    try {
      const result = await db.getAllAsync("SELECT * FROM InformacoesComplementares");
      setComplementares(result);
      console.log("Informações complementares recuperadas do SQLite:", result);
    } catch (err) {
      console.error("Erro ao buscar informações complementares no SQLite:", err);
    }
  }

  useEffect(() => {
    carregarExames();
    carregarPessoaSindromeDeDown();
    carregarHistorico();
    carregarComplementares();
  }, []);

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.corEscura}>
      <View style={styles.telaInicio}>

        <FAB
          icon="upload"
          color="#FAFAFF"
          style={styles.fab}
          customSize={76}
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

        <Text style={{ color: "black", marginTop: 30, fontSize: 18 }}>Pessoas com síndrome de Down:</Text>
        <FlatList
          data={pessoaSindromedeDown}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: "#555", marginVertical: 5, padding: 10, borderRadius: 8 }}>
              <Text style={{ color: "white" }}>Nome: {item.nome_completo}</Text>
              <Text style={{ color: "white" }}>Nascimento: {item.data_nascimento}</Text>
              <Text style={{ color: "white" }}>Gênero: {item.genero}</Text>
              <Text style={{ color: "white" }}>CPF: {item.cpf}</Text>
              <Text style={{ color: "white" }}>CNS: {item.cns}</Text>
              <Text style={{ color: "white" }}>Nome da mãe: {item.nome_mae}</Text>
              <Text style={{ color: "white" }}>Responsável: {item.nome_responsavel}</Text>
              <Text style={{ color: "white" }}>Tel: {item.telefone_responsavel}</Text>
              <Text style={{ color: "white" }}>Email: {item.email_responsavel}</Text>
              <Text style={{ color: "white" }}>Prontuário: {item.numero_prontuario}</Text>
              <Text style={{ color: "white" }}>Unidade de saúde: {item.unidade_saude}</Text>
            </View>
          )}
        />

        <Text style={{ color: "black", marginTop: 30, fontSize: 18 }}>Histórico Médico:</Text>
        <FlatList
          data={historico}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
          <View style={{ backgroundColor: "#555", marginVertical: 5, padding: 12, borderRadius: 10 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Histórico ID: {item.id}</Text>

            <Text style={{ color: "white", marginTop: 5, fontWeight: "bold" }}></Text>
            <Text style={{ color: "white" }}>Cariótipo: {item.exame_cariotipo} - {item.data_cariotipo}</Text>
            <Text style={{ color: "white" }}>Triagem auditiva: {item.triagem_auditiva} - {item.data_triagem}</Text>
            <Text style={{ color: "white" }}>Teste do pezinho: {item.teste_pezinho} - {item.data_pezinho}</Text>
            <Text style={{ color: "white" }}>Cardiologista: {item.consulta_cardiologista} - {item.data_cardiologista}     </Text>
            <Text style={{ color: "white" }}>Oftalmologista: {item.consulta_oftalmologista} - {item.data_oftalmo}</Text>
            <Text style={{ color: "white" }}>Fonoaudiologia: {item.consulta_fonoaudiologia} - {item.data_fono}</Text>
            <Text style={{ color: "white" }}>Odontologia: {item.consulta_odontologia} - {item.data_odonto}</Text>
            <Text style={{ color: "white" }}>Endocrinologia: {item.consulta_endocrinologia} - {item.      data_endocrinologia}</Text>
            <Text style={{ color: "white" }}>Fisioterapia: {item.consulta_fisio} - {item.data_fisio}</Text>
            <Text style={{ color: "white" }}>Terapia ocupacional: {item.consulta_terapia} - {item.data_terapia}</Text>
            <Text style={{ color: "white" }}>Psicopedagogo: {item.consulta_psicopedagogo} - {item.data_psicopedagogo}     </Text>
            <Text style={{ color: "white", marginTop: 5, fontWeight: "bold" }}></Text>
            <Text style={{ color: "white" }}>Comorbidades: {item.comorbidades}</Text>
            <Text style={{ color: "white" }}>Medicamentos em uso: {item.medicamento_em_uso}</Text>
            <Text style={{ color: "white" }}>Alergias: {item.alergias}</Text>
            <Text style={{ color: "white" }}>Tipo sanguíneo: {item.tipo_sanguineo}</Text>
          </View>
         )}
       />
        <Text style={{ color: "black", marginTop: 30, fontSize: 18 }}>Informações Complementares:</Text>
        <FlatList
          data={complementares}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: "#555", marginVertical: 5, padding: 10, borderRadius: 8 }}>
              <Text style={{ color: "white" }}>ID: {item.id}</Text>
              <Text style={{ color: "white" }}>Escolaridade: {item.escolaridade}</Text>
              <Text style={{ color: "white" }}>Unidade Escolar 1: {item.unidade_1}</Text>
              <Text style={{ color: "white" }}>Unidade Escolar 2: {item.unidade_2}</Text>
              <Text style={{ color: "white" }}>Unidade Escolar 3: {item.unidade_3}</Text>
              <Text style={{ color: "white" }}>Autonomia de comunicação: {item.autonomia_comunicacao}</Text>
            </View>
          )}
        /> 
      </View>
    </SafeAreaView>
  );
}
