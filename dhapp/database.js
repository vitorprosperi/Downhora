import * as SQLite from 'expo-sqlite';

const DB_VERSION = 24;
let dbInstance = null;
let dbPromise = null; // garante inicialização única

export async function getDB() {
  if (dbInstance) return dbInstance;
  if (dbPromise) return dbPromise; // evita abrir o banco em paralelo

  dbPromise = (async () => {
    const db = await SQLite.openDatabaseAsync('downhora.db');

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Meta (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        versao INTEGER
      );
    `);

    const row = await db.getFirstAsync("SELECT versao FROM Meta LIMIT 1");

    if (!row || row.versao < DB_VERSION) {
      console.log("Atualizando estrutura do banco...");

      await db.execAsync(`
        DROP TABLE IF EXISTS fila_sinc;
        DROP TABLE IF EXISTS sessoes;
        DROP TABLE IF EXISTS exames;
        DROP TABLE IF EXISTS complementares;
        DROP TABLE IF EXISTS historico_medico;
        DROP TABLE IF EXISTS usuarios;
      `);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id TEXT PRIMARY KEY,
          nome TEXT NOT NULL,
          data_nascimento TEXT,
          genero TEXT,
          cpf TEXT UNIQUE,
          nome_mae TEXT,
          nome_responsavel TEXT,
          telefone_responsavel TEXT,
          email_responsavel TEXT
        );
      `);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS historico_medico (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario_id TEXT NOT NULL,
          exame_cariotipo TEXT,
          data_cariotipo TEXT,
          triagem_auditiva TEXT,
          data_triagem TEXT,
          consulta_cardiologista TEXT,
          data_cardiologista TEXT,
          teste_pezinho TEXT,
          data_pezinho TEXT,
          consulta_oftalmo TEXT,
          data_oftalmo TEXT,
          consulta_fono TEXT,
          data_fono TEXT,
          consulta_odonto TEXT,
          data_odonto TEXT,
          consulta_endocrinologia TEXT,
          data_endocrinologia TEXT,
          consulta_fisio TEXT,
          data_fisio TEXT,
          consulta_terapia TEXT,
          data_terapia TEXT,
          consulta_psicopedagogo TEXT,
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
          id TEXT PRIMARY KEY,
          usuario_id TEXT NOT NULL,
          tipo_exame TEXT NOT NULL,
          data_exame TEXT NOT NULL,
          medico_responsavel TEXT,
          obs TEXT,
          imagem_url TEXT,
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        );
      `);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS sessoes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario_id TEXT NOT NULL,
          cpf TEXT UNIQUE,
          access_token TEXT,
          refresh_token TEXT,
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        );
      `);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS fila_sinc (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          acao TEXT NOT NULL,
          nome_tabela TEXT NOT NULL,
          payload TEXT NOT NULL,
          criado_em TEXT DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await db.execAsync("DELETE FROM Meta;");
      await db.execAsync(`INSERT INTO Meta (versao) VALUES (${DB_VERSION});`);
    }

    dbInstance = db;
    return db;
  })();

  return dbPromise;
}
