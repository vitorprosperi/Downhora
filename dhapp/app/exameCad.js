import ButtonP from '@/components/ButtonP';
import { useUsuario } from '@/context/context';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import MaskInput from 'react-native-mask-input';
import { TextInput } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from "../supabaseserver";
import styles from "./styleForms";


export default function ExameCad() {

    const router = useRouter();
    const { userId } = useUsuario();

    const dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

    const [data, setData] = useState('');
    const [exame, setExame] = useState('');
    const [medico, setMedico] = useState('');
    const [obs, setObs] = useState('');

    const salvarExame = async () => {
      try {
        const { data: supaData, error } = await supabase
          .from('exames')
          .insert([
            { usuario_id: userId, tipo_exame: exame, data_exame: data, medico_responsavel: medico, obs: obs }
          ]);
        if (error) {
          console.error("Erro ao salvar exame no Supabase:", error);
          return;
        }
        console.log("Exame salvo no Supabase:", supaData);
        router.replace({ pathname: "/exames" });
      } catch (err) {
        console.error("Erro inesperado:", err);
      }
    }


    return(
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
          <View style={styles.container}>
          <View style={styles.containerForm}>

            <View>
              <Text style={styles.titulo}>Cadastro de exames</Text>
              <Text style={styles.subTitulo}>Informações do exame</Text>
            </View>

            <Text style={styles.textoPequeno}>Campos com * são obrigatórios</Text>

            <View>
                <Text style={styles.textForm}>Tipo de exame*</Text>
                <TextInput
                style={styles.input}
                placeholder='ex: Teste do Pézinho'
                placeholderTextColor={'grey'}
                value={exame}
                onChangeText={setExame}
              />
            </View>

            <View>
                <Text style={styles.textForm}>Data do exame*</Text>
                <MaskInput
                style={styles.input}
                keyboardType="numeric"
                mask={dateMask}
                value={data}
                onChangeText={(masked, unmasked) => {
                setData(masked);
                }}
                maxLength={10}
                placeholder='ex: 14/10/2001'
                placeholderTextColor={'grey'}
              />
            </View>

            <View>
                <Text style={styles.textForm}>Médico Responsável</Text>
                <TextInput
                style={styles.input}
                placeholder='ex: Rene Vitor França de Melo'
                placeholderTextColor={'grey'}
                value={medico}
                onChangeText={setMedico}
              />
            </View>

            <View>
                <Text style={styles.textForm}>Observações</Text>
                <TextInput
                style={styles.input}
                placeholder='Digite aqui...'
                placeholderTextColor={'grey'}
                value={obs}
                onChangeText={setObs}
              />
            </View>

</View>
        <View style={{ marginBottom: 20, width: 200 }}>
            <ButtonP label="Finalizar" onPress={salvarExame} />
        </View>
</View>
        </SafeAreaView>
    );
}