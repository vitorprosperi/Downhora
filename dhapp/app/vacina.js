import { useState, useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import { FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDB } from "../database";
import styles from "./styleForms";

export default function Vacina() {
  const [exames, setExames] = useState([]);
  const [pessoaSindromedeDown, setPessoaSindromedeDown] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [complementares, setComplementares] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [db, setDb] = useState(null);

  // Inicializa o banco de dados
  useEffect(() => {
    (async () => {
      const database = await getDB();
      setDb(database);
    })();
  }, []);

  const buscarDados = async (query, setter, nomeTabela) => {
    if (!db) return;
    try {
      const result = await db.getAllAsync(query);
      setter(result);
      console.log(`[SQLite] ${nomeTabela} carregados (${result.length} registros)`);
    } catch (error) {
      console.error(`[SQLite] Erro ao buscar ${nomeTabela}:`, error);
    }
  };

  const carregarTudo = async () => {
    if (!db) return;
    try {
      setCarregando(true);
      await db.execAsync("BEGIN TRANSACTION");

      await buscarDados("SELECT * FROM usuarios", setPessoaSindromedeDown, "usuarios");
      await buscarDados("SELECT * FROM exames", setExames, "exames");
      await buscarDados("SELECT * FROM historico_medico", setHistorico, "historico_medico");
      await buscarDados("SELECT * FROM complementares", setComplementares, "complementares");

      await db.execAsync("COMMIT");
      console.log("[SQLite] Todas as tabelas carregadas com sucesso.");
    } catch (error) {
      await db.execAsync("ROLLBACK");
      console.error("[SQLite] Erro ao carregar dados:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (db) carregarTudo();
  }, [db]);

  if (carregando) {
    return (
      <SafeAreaView edges={["bottom", "left", "right"]} style={styles.corEscura}>
        <View style={[styles.telaInicio, { justifyContent: "center", alignItems: "center" }]}>
          <Text style={{ color: "black", fontSize: 18 }}>Carregando dados locais...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.corEscura}>
      <View style={styles.telaInicio}>

        <FAB
          icon="upload"
          color="#FAFAFF"
          style={styles.fab}
          customSize={76}
          mode="flat"
          onPress={carregarTudo}
        />

        <Text style={{ color: "black", marginTop: 30, fontSize: 18 }}>
          Exames salvos localmente:
        </Text>
        <FlatList
          data={exames}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: "#333", marginVertical: 5, padding: 10, borderRadius: 8 }}>
              <Text style={{ color: "white" }}>ID: {item.id}</Text>
              <Text style={{ color: "white" }}>Tipo: {item.tipo_exame}</Text>
              <Text style={{ color: "white" }}>Data: {item.data_exame}</Text>
              <Text style={{ color: "white" }}>Médico: {item.medico_responsavel}</Text>
              <Text style={{ color: "white" }}>Obs: {item.obs}</Text>
            </View>
          )}
        />

        <Text style={{ color: "black", marginTop: 30, fontSize: 18 }}>
          Pessoas com síndrome de Down:
        </Text>
        <FlatList
          data={pessoaSindromedeDown}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: "#555", marginVertical: 5, padding: 10, borderRadius: 8 }}>
              <Text style={{ color: "white" }}>ID: {item.id}</Text>
              <Text style={{ color: "white" }}>Nome: {item.nome}</Text>
              <Text style={{ color: "white" }}>Nascimento: {item.data_nascimento}</Text>
              <Text style={{ color: "white" }}>Gênero: {item.genero}</Text>
              <Text style={{ color: "white" }}>CPF: {item.cpf}</Text>
              <Text style={{ color: "white" }}>Nome da mãe: {item.nome_mae}</Text>
              <Text style={{ color: "white" }}>Responsável: {item.nome_responsavel}</Text>
              <Text style={{ color: "white" }}>Tel: {item.telefone_responsavel}</Text>
              <Text style={{ color: "white" }}>Email: {item.email_responsavel}</Text>
            </View>
          )}
        />

        <Text style={{ color: "black", marginTop: 30, fontSize: 18 }}>Histórico Médico:</Text>
        <FlatList
          data={historico}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: "#555", marginVertical: 5, padding: 12, borderRadius: 10 }}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Histórico ID: {item.id}</Text>
              <Text style={{ color: "white" }}>Usuário ID: {item.usuario_id}</Text>
              <Text style={{ color: "white" }}>Cariótipo: {item.exame_cariotipo} - {item.data_cariotipo}</Text>
              <Text style={{ color: "white" }}>Triagem auditiva: {item.triagem_auditiva} - {item.data_triagem}</Text>
              <Text style={{ color: "white" }}>Teste do pezinho: {item.teste_pezinho} - {item.data_pezinho}</Text>
              <Text style={{ color: "white" }}>Cardiologista: {item.consulta_cardiologista} - {item.data_cardiologista}</Text>
              <Text style={{ color: "white" }}>Oftalmologista: {item.consulta_oftalmo} - {item.data_oftalmo}</Text>
              <Text style={{ color: "white" }}>Fonoaudiologia: {item.consulta_fono} - {item.data_fono}</Text>
              <Text style={{ color: "white" }}>Odontologia: {item.consulta_odonto} - {item.data_odonto}</Text>
              <Text style={{ color: "white" }}>Endocrinologia: {item.consulta_endocrinologia} - {item.data_endocrinologia}</Text>
              <Text style={{ color: "white" }}>Fisioterapia: {item.consulta_fisio} - {item.data_fisio}</Text>
              <Text style={{ color: "white" }}>Terapia ocupacional: {item.consulta_terapia} - {item.data_terapia}</Text>
              <Text style={{ color: "white" }}>Psicopedagogo: {item.consulta_psicopedagogo} - {item.data_psicopedagogo}</Text>
              <Text style={{ color: "white" }}>Comorbidades: {item.comorbidades}</Text>
              <Text style={{ color: "white" }}>Medicamentos: {item.medicamentos}</Text>
              <Text style={{ color: "white" }}>Alergias: {item.alergias}</Text>
              <Text style={{ color: "white" }}>Tipo sanguíneo: {item.tipo_sanguineo}</Text>
            </View>
          )}
        />

        <Text style={{ color: "black", marginTop: 30, fontSize: 18 }}>Informações Complementares:</Text>
        <FlatList
          data={complementares}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
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