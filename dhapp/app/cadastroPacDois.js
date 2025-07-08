import { View, Text, TextInput, ScrollView } from "react-native"
import { useState } from "react";
import { unidades } from "../unidades/unidades";
import { cadastropacTres } from "../routes/rotas";
import DropDownPicker from 'react-native-dropdown-picker';
import ButtonP from '@/components/ButtonP';
import { buscarcep } from "../API Correios/endereco";

export default function CadastroPacDois() {
//Variáveis para o funcionamento do dropdown
const [aberto, Setaberto] = useState(false);
const [valor, setValor] = useState(null);
const [items, setItems] = useState(unidades);
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
            <View>
                <Text>CEP*</Text>
                <TextInput style={{ borderWidth: 1, marginBottom: 8 }} 
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
                <DropDownPicker
                 open={aberto}
                 value={valor}
                 items={items}
                 setOpen={Setaberto}
                 setValue={setValor}
                 setItems={setItems}
                 placeholder="Selecione a unidade de saúde"
                 listMode="SCROLLVIEW"
                 style={{ marginBottom: aberto ? 150 : 8 }} // espaço extra quando aberto
                />
            </View>
            <ButtonP label="Continuar" onPress={cadastropacTres}/>
        </View>
    </ScrollView>
    )
}