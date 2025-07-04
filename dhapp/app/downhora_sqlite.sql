CREATE TABLE PessoaSindromeDeDown (
    -- Dados Pessoais
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
    unidade_saude TEXT NOT NULL,

    -- Endereço
    cep TEXT NOT NULL,
    rua TEXT NOT NULL,
    numero TEXT NOT NULL,
    complemento TEXT,
    bairro TEXT,
    cidade TEXT,
    estado TEXT,
    unidade_saude_nome TEXT NOT NULL,

    -- Histórico Médico
    diagnostico_confirmado TEXT DEFAULT 'Não',
    acompanhamento_medico TEXT DEFAULT 'Não',
    comorbidades TEXT DEFAULT 'Não',
    tipo_comorbidade TEXT,
    medicamentos_uso TEXT,
    alergias TEXT,
    tipo_sanguineo TEXT,

    -- Informações Complementares
    escolaridade TEXT,
    nome_escola TEXT,
    unidade_apae TEXT,
    autonomia_comunicacao TEXT,
    acompanhamento_multiprofissional TEXT
);

CREATE TABLE Profissional (
    -- Dados Pessoais
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_completo TEXT NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    nome_social TEXT,
    data_nascimento TEXT,
    genero TEXT,

    -- Dados Profissionais
    unidade_saude_nome TEXT NOT NULL,
    funcao_cargo TEXT NOT NULL,

    -- Senha do APP Downora
    senha_hash TEXT NOT NULL
);
