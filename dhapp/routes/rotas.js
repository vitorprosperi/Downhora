import {router} from 'expo-router';

// Funções para navegação entre telas

export function login () {
    router.push('/login');
}

export function cadastroprof () {
    router.push('/cadastroProf');
}

export function cadastropac () {
    router.push('/cadastroPac');
}

export function cadastropacDois () {
    router.push('/cadastroPacDois');
}