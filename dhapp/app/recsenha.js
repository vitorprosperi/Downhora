import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { ButtonP } from '@/components/ButtonP';
import { supabase } from "../supabaseserver";

export default function RecuperacaoSenha() {
    const [email, setEmail] = useState('');

    const RecuperacaoSenha = async () => {
        if (!email) {
            Alert.alert('Erro', 'Por favor, insira o e-mail.');
            return;
        }

        try {
            // Envia o e-mail de recuperação de senha
            const { error } = await supabase.auth.resetPasswordForEmail(email);

            if (error) {
                Alert.alert('Erro', 'Falha ao enviar o e-mail de recuperação. Verifique se o e-mail está correto.');
            } else {
                Alert.alert('Sucesso', 'E-mail de recuperação enviado!');
            }
        } catch (err) {
            console.error('Erro inesperado:', err);
            Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente mais tarde.');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Recuperação de Senha</Text>
            <TextInput
                placeholder='Digite seu E-mail'
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    marginBottom: 20,
                    borderRadius: 5
                }}
            />
            <ButtonP label="Enviar" onPress={RecuperacaoSenha} />
        </View>
    );
}