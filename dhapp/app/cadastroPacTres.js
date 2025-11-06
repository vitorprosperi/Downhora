import { ButtonP } from '@/components/ButtonP';
import { MyDropdown } from '@/components/MyDropdown';
import { usePaciente } from '@/context/context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack } from 'expo-router';
import { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cadastropacQuatro } from "../routes/rotas";
import styles from './styleForms';

export default function CadastroPacDois() {
  const { pacientedados, setPacientedados } = usePaciente();

  const [dataValor, setDataValor] = useState(null);

  const [valor1, setValor1] = useState(null);
  const [dataCariotipo, setDataCariotipo] = useState('');
  const [showCariotipoPicker, setShowCariotipoPicker] = useState(false);

  const [valor2, setValor2] = useState(null);
  const [dataAuditivo, setDataAuditivo] = useState('');
  const [showAuditivoPicker, setShowAuditivoPicker] = useState(false);

  const [valor3, setValor3] = useState(null);
  const [dataEco, setDataEco] = useState('');
  const [showCardioPicker, setShowCardioPicker] = useState(false);

  const [valor4, setValor4] = useState(null);
  const [dataOrtopedica, setDataOrtopedica] = useState('');
  const [showPePicker, setShowPePicker] = useState(false);

  const [valor5, setValor5] = useState(null);
  const [dataNeuro, setDataNeuro] = useState('');
  const [showOftalPicker, setShowOftalPicker] = useState(false);

  const [valorFono, setValorFono] = useState(null);
  const [dataFono, setDataFono] = useState('');
  const [showFonoPicker, setShowFonoPicker] = useState(false);

  const [valorOdonto, setValorOdonto] = useState(null);
  const [dataOdonto, setDataOdonto] = useState('');
  const [showOdontoPicker, setShowOdontoPicker] = useState(false);

  const [valorEndocrino, setValorEndocrino] = useState(null);
  const [dataEndocrino, setDataEndocrino] = useState('');
  const [showEndocrinoPicker, setShowEndocrinoPicker] = useState(false);

  const [valorFisio, setValorFisio] = useState(null);
  const [dataFisio, setDataFisio] = useState('');
  const [showFisioPicker, setShowFisioPicker] = useState(false);

  const [valorTerapia, setValorTerapia] = useState(null);
  const [dataTerapia, setDataTerapia] = useState('');
  const [showTerapiaPicker, setShowTerapiaPicker] = useState(false);

  const [valorPsico, setValorPsico] = useState(null);
  const [dataPsico, setDataPsico] = useState('');
  const [showPsicoPicker, setShowPsicoPicker] = useState(false);

  const itensSimNao = [
    { label: 'Sim', value: 'Sim' },
    { label: 'Não', value: 'Não' },
  ];

  // Formatações
  const formatarParaBR = (date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const formatarParaISO = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  // Reutilizável para todos os DatePickers
  const renderDatePicker = (showPicker, setShowPicker, dataDisplay, setDataDisplay, fieldName) => (
    <>
      <Pressable onPress={() => setShowPicker(true)}>
        <View style={styles.input}>
          <Text style={{ color: dataDisplay ? 'black' : 'grey' }}>
            {dataDisplay || 'Selecione a data'}
          </Text>
        </View>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          value={dataDisplay ? new Date(dataValor) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'compact' : 'calendar'}
          onChange={(event, selectedDate) => {
            if (Platform.OS !== 'ios') setShowPicker(false);
            if (selectedDate) {
              setDataValor(selectedDate);
              const formattedDisplay = formatarParaBR(selectedDate);
              const formattedISO = formatarParaISO(selectedDate);

              setDataDisplay(formattedDisplay);

              // Salva a versão ISO que vai pro Supabase/SQLite
              setPacientedados(prev => ({ ...prev, [fieldName]: formattedISO }));
            }
          }}
        />
      )}
    </>
  );

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
      <Stack.Screen
        options={{
          title: 'Cadastro de pessoa com síndrome de Down',
          headerShadowVisible: true,
          headerTitle: ({ children: title }) => (
            <Text style={styles.headerCadastro} numberOfLines={2}>{title}</Text>
          ),
        }}
      />

      <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280}>
        <View style={styles.container}>
          <View style={styles.containerForm}>
            <Text style={styles.subTitulo}>Consultas e exames já realizados (Passo 3 de 4)</Text>

            <Text style={styles.textForm}>Exame cariótipo</Text>
            <MyDropdown
              data={itensSimNao}
              labelField="label"
              valueField="value"
              placeholder="Selecione"
              value={valor1}
              onChange={item => {
                setValor1(item.value);
                setPacientedados(prev => ({ ...prev, cariotipo: item.value }));
                setShowCariotipoPicker(item.value === 'Sim');
              }}
            />
            {valor1 === 'Sim' &&
              renderDatePicker(showCariotipoPicker, setShowCariotipoPicker, dataCariotipo, setDataCariotipo, 'dataCariotipo')}

            <Text style={styles.textForm}>Triagem auditiva</Text>
            <MyDropdown
              data={itensSimNao}
              labelField="label"
              valueField="value"
              placeholder="Selecione"
              value={valor2}
              onChange={item => {
                setValor2(item.value);
                setPacientedados(prev => ({ ...prev, exameAuditivo: item.value }));
                setShowAuditivoPicker(item.value === 'Sim');
              }}
            />
            {valor2 === 'Sim' &&
              renderDatePicker(showAuditivoPicker, setShowAuditivoPicker, dataAuditivo, setDataAuditivo, 'dataAuditivo')}

            <Text style={styles.textForm}>Consulta cardiologista</Text>
            <MyDropdown
              data={itensSimNao}
              labelField="label"
              valueField="value"
              placeholder="Selecione"
              value={valor3}
              onChange={item => {
                setValor3(item.value);
                setPacientedados(prev => ({ ...prev, consultCardio: item.value }));
                setShowCardioPicker(item.value === 'Sim');
              }}
            />
            {valor3 === 'Sim' &&
              renderDatePicker(showCardioPicker, setShowCardioPicker, dataEco, setDataEco, 'dataCard')}

            <Text style={styles.textForm}>Teste do pezinho</Text>
            <MyDropdown
              data={itensSimNao}
              labelField="label"
              valueField="value"
              placeholder="Selecione"
              value={valor4}
              onChange={item => {
                setValor4(item.value);
                setPacientedados(prev => ({ ...prev, testePe: item.value }));
                setShowPePicker(item.value === 'Sim');
              }}
            />
            {valor4 === 'Sim' &&
              renderDatePicker(showPePicker, setShowPePicker, dataOrtopedica, setDataOrtopedica, 'dataPe')}

            <Text style={styles.textForm}>Consulta oftalmologista</Text>
            <MyDropdown
              data={itensSimNao}
              labelField="label"
              valueField="value"
              placeholder="Selecione"
              value={valor5}
              onChange={item => {
                setValor5(item.value);
                setPacientedados(prev => ({ ...prev, oftalmo: item.value }));
                setShowOftalPicker(item.value === 'Sim');
              }}
            />
            {valor5 === 'Sim' &&
              renderDatePicker(showOftalPicker, setShowOftalPicker, dataNeuro, setDataNeuro, 'dataOftal')}

            <Text style={styles.textForm}>Consulta fonoaudiologia</Text>
            <MyDropdown
              data={itensSimNao}
              labelField="label"
              valueField="value"
              placeholder="Selecione"
              value={valorFono}
              onChange={item => {
                setValorFono(item.value);
                setPacientedados(prev => ({ ...prev, consultaFono: item.value }));
                setShowFonoPicker(item.value === 'Sim');
              }}
            />
            {valorFono === 'Sim' &&
              renderDatePicker(showFonoPicker, setShowFonoPicker, dataFono, setDataFono, 'dataFono')}

            <Text style={styles.textForm}>Consulta odontologia</Text>
            <MyDropdown
              data={itensSimNao}
              labelField="label"
              valueField="value"
              placeholder="Selecione"
              value={valorOdonto}
              onChange={item => {
                setValorOdonto(item.value);
                setPacientedados(prev => ({ ...prev, consultaOdonto: item.value }));
                setShowOdontoPicker(item.value === 'Sim');
              }}
            />
            {valorOdonto === 'Sim' &&
              renderDatePicker(showOdontoPicker, setShowOdontoPicker, dataOdonto, setDataOdonto, 'dataOdonto')}

            <Text style={styles.textForm}>Consulta endocrinologia</Text>
            <MyDropdown
              data={itensSimNao}
              labelField="label"
              valueField="value"
              placeholder="Selecione"
              value={valorEndocrino}
              onChange={item => {
                setValorEndocrino(item.value);
                setPacientedados(prev => ({ ...prev, consultaEndocrino: item.value }));
                setShowEndocrinoPicker(item.value === 'Sim');
              }}
            />
            {valorEndocrino === 'Sim' &&
              renderDatePicker(showEndocrinoPicker, setShowEndocrinoPicker, dataEndocrino, setDataEndocrino, 'dataEndocrino')}

            <Text style={styles.textForm}>Consulta fisioterapia</Text>
            <MyDropdown
              data={itensSimNao}
              labelField="label"
              valueField="value"
              placeholder="Selecione"
              value={valorFisio}
              onChange={item => {
                setValorFisio(item.value);
                setPacientedados(prev => ({ ...prev, consultaFisio: item.value }));
                setShowFisioPicker(item.value === 'Sim');
              }}
            />
            {valorFisio === 'Sim' &&
              renderDatePicker(showFisioPicker, setShowFisioPicker, dataFisio, setDataFisio, 'dataFisio')}

            <Text style={styles.textForm}>Consulta terapia ocupacional</Text>
            <MyDropdown
              data={itensSimNao}
              labelField="label"
              valueField="value"
              placeholder="Selecione"
              value={valorTerapia}
              onChange={item => {
                setValorTerapia(item.value);
                setPacientedados(prev => ({ ...prev, consultaTerapia: item.value }));
                setShowTerapiaPicker(item.value === 'Sim');
              }}
            />
            {valorTerapia === 'Sim' &&
              renderDatePicker(showTerapiaPicker, setShowTerapiaPicker, dataTerapia, setDataTerapia, 'dataTerapia')}

            <Text style={styles.textForm}>Consulta psicopedagogo</Text>
            <MyDropdown
              data={itensSimNao}
              labelField="label"
              valueField="value"
              placeholder="Selecione"
              value={valorPsico}
              onChange={item => {
                setValorPsico(item.value);
                setPacientedados(prev => ({ ...prev, consultaPsico: item.value }));
                setShowPsicoPicker(item.value === 'Sim');
              }}
            />
            {valorPsico === 'Sim' &&
              renderDatePicker(showPsicoPicker, setShowPsicoPicker, dataPsico, setDataPsico, 'dataPsico')}
          </View>

          <View style={{ marginBottom: 10, marginTop: 10, width: 200 }}>
            <ButtonP label="Próximo" onPress={cadastropacQuatro} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}