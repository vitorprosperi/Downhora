import { createContext, useContext, useState } from "react";

const PacienteContext = createContext();

export const PacienteProvider = ({ children }) => {
    const [pacientedados, setPacientedados] = useState({
    aceitou_privacidade: false,
    aceitou_termos: false,
    data_aceite_privacidade: null,
    data_aceite_termos: null,
    versao_privacidade: null,
    versao_termos: null,
  });


    return (
        <PacienteContext.Provider value={{ pacientedados, setPacientedados}}>
            {children}
        </PacienteContext.Provider>
    );
};

export const usePaciente = () => useContext(PacienteContext);

// Contexto para usuário logado
const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    return (
        <UsuarioContext.Provider value={{ userId, setUserId }}>
            {children}
        </UsuarioContext.Provider>
    );
};

export const useUsuario = () => useContext(UsuarioContext);