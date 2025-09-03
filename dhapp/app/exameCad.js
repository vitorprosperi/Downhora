import { View, Text } from "react-native";
import { useState } from "react";
import { SafeAreaView} from 'react-native-safe-area-context';
import styles from "./styleForms";
import { TextInput } from "react-native-paper";
import MaskInput from 'react-native-mask-input';
import ButtonP from '@/components/ButtonP';
import { useRouter } from "expo-router";


export default function ExameCad() {

    const router = useRouter();

    const dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

    const [data, setData] = useState('');
    const [exame, setExame] = useState('');
    const [medico, setMedico] = useState('');
    const [obs, setObs] = useState('');


    return(
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>

            <View>
              <Text style={styles.titulo}>Cadastro de exames</Text>
              <Text style={styles.subTitulo}>Informações do exame</Text>
            </View>

            <Text style={styles.textoPequeno}>Campos com * são obrigatórios</Text>

            <View>
                <Text style={styles.textForm}>Tipo de exame*</Text>
                <TextInput
                style={styles.input}
                placeholder='ex: Rene Vitor França de Melo'
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

        <View style={{ marginBottom: 20, width: 200 }}>
            <ButtonP label="Finalizar" 
            onPress = {() => router.push({ pathname: "/exames", params: { exame, data, medico, obs } })} />
        </View>

        </SafeAreaView>
    );
}