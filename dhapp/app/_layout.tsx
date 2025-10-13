import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen'; // carregar tela so quando carregar fonte
import { SQLiteProvider } from 'expo-sqlite';
import { useEffect } from 'react';
import { PacienteProvider, UsuarioProvider } from '../context/context'; // ⬅️ importe o UsuarioProvider

SplashScreen.preventAutoHideAsync(); // prevenir a splash screen (tela temporaria) de desaparecer enquanto a fonte carrega

const DB_VERSION = 11; // aumente esse número quando mudar a estrutura

export default function RootLayout() {
  const [loaded, error] = useFonts({ // mapeia as fontes
    'Raleway': require('../assets/fonts/raleway-v37-latin-regular.ttf'),
    'Raleway-500': require('../assets/fonts/raleway-v37-latin-500.ttf'),
    'Raleway-700': require('../assets/fonts/raleway-v37-latin-700.ttf'),
    'Roboto': require('../assets/fonts/roboto-v49-latin-regular.ttf'),
    'Roboto-500': require('../assets/fonts/roboto-v49-latin-500.ttf'),
    'Roboto-500-italic': require("../assets/fonts/roboto-v49-latin-500-italic.ttf"),
  }); 

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <SQLiteProvider
      databaseName="downhora.db"
      onInit={async (db) => {
        // Cria a tabela de metadados (versão do banco)
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS Meta (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            versao INTEGER
          );
        `);

        // 🔹 Define o tipo do retorno
        type MetaRow = { versao: number };

        const row = await db.getFirstAsync<MetaRow>("SELECT versao FROM Meta LIMIT 1");

        if (!row || row.versao < DB_VERSION) {
          // Se não existir versão ou for antiga, dropa e recria as tabelas
          await db.execAsync("DROP TABLE IF EXISTS exames;");
          await db.execAsync("DROP TABLE IF EXISTS complementares;");
          await db.execAsync("DROP TABLE IF EXISTS historico_medico;");
          await db.execAsync("DROP TABLE IF EXISTS usuarios;");

          // Recria tabelas
          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS usuarios (
              id TEXT PRIMARY KEY,
              nome TEXT NOT NULL,
              data_nascimento TEXT NOT NULL,
              genero TEXT NOT NULL,
              cpf TEXT UNIQUE NOT NULL,
              nome_mae TEXT NOT NULL,
              nome_responsavel TEXT NOT NULL,
              telefone_responsavel TEXT NOT NULL,
              email_responsavel TEXT NOT NULL
            );
          `);

          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS historico_medico (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              usuario_id TEXT NOT NULL,
              exame_cariotipo TEXT NOT NULL,
              data_cariotipo TEXT,
              triagem_auditiva TEXT NOT NULL,
              data_triagem TEXT,
              consulta_cardiologista TEXT NOT NULL,
              data_cardiologista TEXT,
              teste_pezinho TEXT NOT NULL,
              data_pezinho TEXT,
              consulta_oftalmo TEXT NOT NULL,
              data_oftalmo TEXT,
              consulta_fono TEXT NOT NULL,
              data_fono TEXT,
              consulta_odonto TEXT NOT NULL,
              data_odonto TEXT,
              consulta_endocrinologia TEXT NOT NULL,
              data_endocrinologia TEXT,
              consulta_fisio TEXT NOT NULL,
              data_fisio TEXT,
              consulta_terapia TEXT NOT NULL,
              data_terapia TEXT,
              consulta_psicopedagogo TEXT NOT NULL,
              data_psicopedagogo TEXT,
              comorbidades TEXT,
              medicamentos TEXT,
              alergias TEXT,
              tipo_sanguineo TEXT,
              FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
            );
          `);

          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS complementares (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              usuario_id TEXT NOT NULL,
              escolaridade TEXT,
              unidade_1 TEXT,
              unidade_2 TEXT,
              unidade_3 TEXT,
              autonomia_comunicacao TEXT,
              FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
            );
          `);

          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS exames (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              usuario_id TEXT NOT NULL,
              tipo_exame TEXT NOT NULL,
              data_exame TEXT NOT NULL,
              medico_responsavel TEXT,
              obs TEXT,
              FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
            );
          `);

          // Atualiza versão no Meta
          await db.execAsync("DELETE FROM Meta;");
          await db.execAsync(`INSERT INTO Meta (versao) VALUES (${DB_VERSION});`);
        }
      }}
    >
      <UsuarioProvider> 
        <PacienteProvider>
          <Stack
             screenOptions={{
             headerStyle: { backgroundColor: '#FAFAFF', },
              headerTintColor: '#231F20',
              headerTitleStyle: {
                fontFamily: 'Raleway-500'
              },
              title: '',
              headerShadowVisible: false,

           }}
          >
            <Stack.Screen 
            name="index"
                options={{
                    title: '',
                }}
            /> 
            <Stack.Screen 
            name="(top-tabs)"
                options={{
                    title: 'Informações',
                }}
            /> 

          </Stack>
        </PacienteProvider>
      </UsuarioProvider>
    </SQLiteProvider>
  );
}
