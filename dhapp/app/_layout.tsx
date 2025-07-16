import { Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import { SQLiteProvider } from 'expo-sqlite';
import {PacienteProvider} from '../context/context';

export default function RootLayout() {
  return (
  <PacienteProvider>
    <SQLiteProvider
      databaseName='downhora.db'
      onInit={async (db) => {
        await db.execAsync(`DROP TABLE IF EXISTS PessoaSindromeDeDown`);

        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS PessoaSindromeDeDown (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_completo TEXT NOT NULL,
            data_nascimento TEXT NOT NULL,
            genero TEXT NOT NULL,
            cpf TEXT UNIQUE NOT NULL,
            cns TEXT,
            nome_mae TEXT,
            nome_responsavel TEXT NOT NULL,
            telefone_responsavel TEXT NOT NULL,
            email_responsavel TEXT NOT NULL,
            numero_prontuario TEXT,
            unidade_saude TEXT NOT NULL
          );
        `);
      }}
    >
      <PaperProvider>
        <Stack />
      </PaperProvider>
    </SQLiteProvider>
  </PacienteProvider>
  );
}

// import { Stack } from 'expo-router';
// import { Provider as PaperProvider } from 'react-native-paper';
// import { SQLiteProvider } from "expo-sqlite";

// export default function RootLayout() {
//   return (
//     <SQLiteProvider
//       databaseName='downhora.db'
//       onInit={async (db) => {
//         await db.execAsync(`
//         CREATE TABLE IF NOT EXISTS PessoaSindromeDeDown (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           nome_completo TEXT NOT NULL,
//           data_nascimento TEXT NOT NULL,
//           genero TEXT NOT NULL,
//           cpf TEXT UNIQUE NOT NULL,
//           cns TEXT,
//           nome_mae TEXT,
//           nome_responsavel TEXT NOT NULL,
//           telefone_responsavel TEXT NOT NULL,
//           email_responsavel TEXT NOT NULL,
//           numero_prontuario TEXT,
//           unidade_saude TEXT NOT NULL,
//           cep TEXT NOT NULL,
//           rua TEXT NOT NULL,
//           numero TEXT NOT NULL,
//           complemento TEXT,
//           bairro TEXT,
//           cidade TEXT,
//           estado TEXT,
//           unidade_saude_nome TEXT NOT NULL,
//           diagnostico_confirmado TEXT DEFAULT 'Não',
//           acompanhamento_medico TEXT DEFAULT 'Não',
//           comorbidades TEXT DEFAULT 'Não',
//           tipo_comorbidade TEXT,
//           medicamentos_uso TEXT,
//           alergias TEXT,
//           tipo_sanguineo TEXT,
//           escolaridade TEXT,
//           nome_escola TEXT,
//           unidade_apae TEXT,
//           autonomia_comunicacao TEXT,
//           acompanhamento_multiprofissional TEXT
//         );
//       `);
//         await db.execAsync(`
//         CREATE TABLE IF NOT EXISTS Profissional (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           nome_completo TEXT NOT NULL,
//           cpf TEXT UNIQUE NOT NULL,
//           nome_social TEXT,
//           data_nascimento TEXT,
//           genero TEXT,
//           unidade_saude_nome TEXT NOT NULL,
//           funcao_cargo TEXT NOT NULL,
//           senha_hash TEXT NOT NULL
//         );
//       `);
//       }}
//       options={{ useNewConnection: false }}
//     >
//       <PaperProvider>
//         <Stack />
//       </PaperProvider>
//     </SQLiteProvider>
//   );
// }