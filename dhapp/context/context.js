import { createContext, useContext, useState } from "react";

const PacienteContext = createContext();

export const PacienteProvider = ({ children }) => {
    const [pacientedados, setPacientedados] = useState({});

    return (
        <PacienteContext.Provider value={{ pacientedados, setPacientedados}}>
            {children}
        </PacienteContext.Provider>
    );
};

export const usePaciente = () => useContext(PacienteContext);


const ProfissionalContext = createContext();

export const ProfissionalProvider = ({ children }) => {
    const [profissionaldados, setProfissionaldados] = useState({});

    return (
        <ProfissionalContext.Provider value={{ profissionaldados, setProfissionaldados}}>
            {children}
        </ProfissionalContext.Provider>
    );
};

export const useProfissional = () => useContext(ProfissionalContext);