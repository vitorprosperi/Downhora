import { View, Text, TextInput } from "react-native"



export default function CadastroPac (){
    return(
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
            <Text>Data de Nascimento*</Text>
            <Text>Gênero*</Text>
            <Text>CPF*</Text>
            </View>
        </View>
    )
}