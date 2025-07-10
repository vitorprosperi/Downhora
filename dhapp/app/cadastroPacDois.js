import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { buscarcep } from "../API Correios/endereco";
import { cadastropacTres } from "../routes/rotas";
import { unidades } from "../unidades/unidades";

export default function CadastroPacDois() {
//Variáveis para o funcionamento do dropdown
const [valor, setValor] = useState(null);
const itens = unidades;
//Variáveis para o funcionamento do CEP
const [cep, setCep] = useState('');
const [rua, setRua] = useState('');
const [bairro, setBairro] = useState('');
const [cidade, setCidade] = useState('');
const [estado, setEstado] = useState('');

    return(
    <ScrollView nestedScrollEnabled={true}>
        <View style={{ padding: 16 }}>
            {/* View da header*/}
            <View>
                <Text>Cadastro de Pessoas com SD. Down</Text>
                <Text>Endereço</Text>
            </View>
            {/* View do formulário*/}
            <View>
                <Text>CEP*</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }}
                maxLength={8} 
                value={cep}
                onChangeText={setCep}
                keyboardType="numeric"
                onBlur={() => buscarcep(cep, setRua, setBairro, setCidade, setEstado)}
                />
                
                <Text>Rua*</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }}
                value={rua}
                onChangeText={setRua}
                />
                
                <Text>Número*</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }}
                keyboardType="numeric"
                />
                
                <Text>Complemento*</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} />
                
                <Text>Bairro*</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} 
                value={bairro}
                onChangeText={setBairro}                
                />

                <Text>Cidade*</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} 
                value={cidade}
                onChangeText={setCidade}                
                />

                <Text>Estado*</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} 
                value={estado}
                onChangeText={setEstado}                
                />

                <Text>Unidade de Saúde*</Text>
                <Dropdown
                style={{ borderWidth: 1, marginBottom: 8 }}
                data={itens}
                labelField="label"
                valueField="value"
                placeholder="Selecione a unidade"
                search
                searchPlaceholder="Pesquisar unidade"
                value={valor}
                onChange={item => setValor(item.value)}         
                />
            </View>
            <ButtonP label="Continuar" onPress={cadastropacTres}/>
        </View>
    </ScrollView>
    )
}