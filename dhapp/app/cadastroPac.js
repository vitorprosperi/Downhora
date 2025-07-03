import ButtonP from '@/components/ButtonP';
import { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native"
import {RadioButton} from "react-native-paper";



export default function CadastroPac (){
const [valor, Setvalor] = useState();


    return(
    <ScrollView>    
        <View>
            {/* View da header */}
            <View>
                <Text>Cadastro de Pessoas com SD. Down</Text>
                <Text>Dados Pessoais</Text>
                <Text>Campos com * são obrigatórios</Text>
            </View>
            {/* View do formulário */}
            <View>
            <Text>Nome Completo*</Text>
            <TextInput></TextInput>
            <Text>Data de Nascimento*</Text>
            <TextInput></TextInput>
            <Text>Gênero*</Text>
            <TextInput></TextInput>
            <Text>CPF*</Text>
            <TextInput></TextInput>
            <Text>CNS*</Text>
            <TextInput></TextInput>
            <Text>Nome da mãe*</Text>
            <TextInput></TextInput>
            <Text>Nome do responsável*</Text>
            <TextInput></TextInput>
            <Text>Telefone do responsável*</Text>
            <TextInput></TextInput>
            <Text>E-mail do responsável*</Text>
            <TextInput></TextInput>
            <Text>Nº do Prontuário*</Text>
            <TextInput></TextInput>
            <View>
               <RadioButton.Group onValueChange={Setvalor} value={valor}>
                <RadioButton.Item label="UBS" value="UBS" />
                <RadioButton.Item label="Unesp" value="Unesp" />   
               </RadioButton.Group>
            </View>
            <ButtonP label='Continuar'></ButtonP>
            </View>
        </View>
    </ScrollView>
    )
}