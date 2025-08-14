import {router} from 'expo-router';

// Funções para navegação entre telas

export function login () {
    router.push('/login');
}

export function cadastroprof () {
    router.push('/cadastroProf');
}

export function cadastroprofdois () {
    router.push('/cadastroProfDois');
}

export function cadastroproftres () {
    router.push('/cadastroProfTres');
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
    router.push('/telaInicial');
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