import { router } from 'expo-router';

// Funções para navegação entre telas

export function login () {
    router.push('/login');
}

export function finalizarCadastro () {
    router.push('/');
}

export function cadastropac () {
    router.push('/cadastroPac');
}

export function cadastropacDois () {
    router.push('/cadastroPacDois');
}

export function cadastropacTres () {
    router.push('/cadastroPacTres');
}

export function cadastropacQuatro () {
    router.push('/cadastroPacQuatro');
}

export function telaInicial () {
    router.replace('/telaInicial');
}

export function prontuario () {
    router.push('/prontuario');
}

export function exames () {
    router.push('/exames');
}

export function vacina () {
    router.push('/vacina');
}

export function exameCad () {
    router.push('/exameCad');
}

export function desenvolvimento () {
    router.navigate('/(top-tabs)');
}