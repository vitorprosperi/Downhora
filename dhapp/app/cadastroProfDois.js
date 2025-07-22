import ButtonP from "@/components/ButtonP";
import { useProfissional } from "@/context/context";
import { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { cadastroproftres } from "../routes/rotas";
import { unidades } from "../unidades/unidades";
import styles from "./styleForms";

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
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
      <KeyboardAwareScrollView contentContainerStyle={styles.corEscura} extraHeight={280} enableOnAndroid={true}>
        <View style={styles.container}>
          <View style={styles.containerForm}>

            <View>
              <Text style={styles.textForm}>Unidade de saúde*</Text>
              <Dropdown
                style={styles.input}
                placeholderStyle={styles.textForm}
                selectedTextStyle={styles.textForm}
                containerStyle={styles.dropdownContainer}
                itemTextStyle={styles.textForm}
                activeColor='#081221'
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
                placeholderStyle={styles.textForm}
                selectedTextStyle={styles.textForm}
                containerStyle={styles.dropdownContainer}
                itemTextStyle={styles.textForm}
                activeColor='#081221'
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
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

