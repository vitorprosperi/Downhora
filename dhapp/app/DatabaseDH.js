const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const DB_FILE = 'downhora.db';

const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
        return console.error('Erro ao abrir banco:', err.message);
    }
    console.log('Banco criado ou aberto com sucesso.');
});

const sqlScript = fs.readFileSync('downhora_sqlite.sql', 'utf8');

db.exec(sqlScript, (err) => {
    if (err) {
        return console.error('Erro ao executar script SQL:', err.message);
    }
    console.log('Tabelas criadas com sucesso!');
    db.close();
});