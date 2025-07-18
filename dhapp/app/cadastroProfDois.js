import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProfissional } from "@/context/context";
import { unidades } from "../unidades/unidades";
import ButtonP from "@/components/ButtonP";
import { cadastroproftres, proximoPasso } from "../routes/rotas";

const funcoes = [
  { label: "ACS", value: "ACS" },
  { label: "Enfermeira(o)", value: "Enfermeira(o)" },
  { label: "Assistente de Enfermagem", value: "Assistente de Enfermagem" },
  { label: "Administrativo", value: "Administrativo" },
];

export default function CadastroProfissional2() {
  const { profissionaldados, setProfissionaldados } = useProfissional();
  const [unidadeSelecionada, setUnidadeSelecionada] = useState(null);
  const [funcaoSelecionada, setFuncaoSelecionada] = useState(null);

  return (
    <KeyboardAwareScrollView extraHeight={280} enableOnAndroid={true}>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerForm}>

          <View>
            <Text style={styles.textForm}>Unidade de saúde*</Text>
            <Dropdown
              style={styles.input}
              placeholderStyle={styles.placeholder}
              data={unidades}
              labelField="label"
              valueField="value"
              placeholder="Listagem aqui"
              value={unidadeSelecionada}
              onChange={(item) => {
                setUnidadeSelecionada(item.value);
                setProfissionaldados((prev) => ({
                  ...prev,
                  unidadeSaude: item.value,
                }));
              }}
            />
          </View>

          <View>
            <Text style={styles.textForm}>Função / Cargo</Text>
            <Dropdown
              style={styles.input}
              placeholderStyle={styles.placeholder}
              data={funcoes}
              labelField="label"
              valueField="value"
              placeholder="Selecione"
              value={funcaoSelecionada}
              onChange={(item) => {
                setFuncaoSelecionada(item.value);
                setProfissionaldados((prev) => ({
                  ...prev,
                  funcao: item.value,
                }));
              }}
            />
          </View>

          <ButtonP label="Continuar" onPress={cadastroproftres} />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#081221',
  },
  containerForm: {
    justifyContent: 'flex-start',
    gap: 10,
    width: '90%',
  },
  input: {
    backgroundColor: '#081221',
    color: '#fff',
    paddingVertical: 0,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 2,
    width: '100%',
    fontSize: 16,
    height: 35,
  },
  textForm: {
    color: '#fff',
    fontSize: 16,
  },
});