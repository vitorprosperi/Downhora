import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { PacienteProvider, ProfissionalProvider } from '../context/context';

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="downhora.db"
      onInit={async (db) => {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS PessoaSindromeDeDown (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_completo TEXT NOT NULL,
            data_nascimento TEXT NOT NULL,
            genero TEXT NOT NULL,
            cpf TEXT UNIQUE NOT NULL,
            cns TEXT,
            nome_mae TEXT NOT NULL,
            nome_responsavel TEXT NOT NULL,
            telefone_responsavel TEXT NOT NULL,
            email_responsavel TEXT NOT NULL,
            numero_prontuario TEXT NOT NULL,
            unidade_saude TEXT NOT NULL
          );
        `);

        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS Endereco (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pessoa_id INTEGER NOT NULL,
            cep TEXT NOT NULL,
            rua TEXT NOT NULL,
            estado TEXT NOT NULL,
            cidade TEXT NOT NULL,
            bairro TEXT NOT NULL,
            numero TEXT NOT NULL,
            complemento TEXT,
            unidade_saude TEXT NOT NULL,
            FOREIGN KEY (pessoa_id) REFERENCES PessoaSindromeDeDown(id)
          );
        `);

        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS HistoricoMedico (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pessoa_id INTEGER NOT NULL,
            exame_cariotipo TEXT NOT NULL,
            data_cariotipo TEXT,
            triagem_auditiva TEXT NOT NULL,
            data_triagem TEXT,
            consulta_cardiologista TEXT NOT NULL,
            data_cardiologista TEXT,
            teste_pezinho TEXT NOT NULL,
            data_pezinho TEXT,
            consulta_oftalmologista TEXT NOT NULL,
            data_oftalmo TEXT,
            consulta_fonoaudiologia TEXT NOT NULL,
            data_fono TEXT,
            consulta_odontologia TEXT NOT NULL,
            data_odonto TEXT,
            consulta_endocrinologia TEXT NOT NULL,
            data_endocrinologia TEXT,
            comorbidades TEXT,
            medicamento_em_uso TEXT,
            alergias TEXT,
            tipo_sanguineo TEXT,
            FOREIGN KEY (pessoa_id) REFERENCES PessoaSindromeDeDown(id)
          );
        `);

        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS InformacoesComplementares (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pessoa_id INTEGER NOT NULL,
            escolaridade TEXT,
            nome_escola TEXT,
            unidade_apae TEXT,
            autonomia_comunicacao TEXT,
            acompanhamento_multiprofissional TEXT,
            FOREIGN KEY (pessoa_id) REFERENCES PessoaSindromeDeDown(id)
          );
        `);
      }}
    >
      <PacienteProvider>
        <ProfissionalProvider>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: '#FAFAFF' },
              headerTintColor: '#231F20',
              headerTitle: '',
              headerShadowVisible: false,
            }}
          />
        </ProfissionalProvider>
      </PacienteProvider>
    </SQLiteProvider>
  );
}