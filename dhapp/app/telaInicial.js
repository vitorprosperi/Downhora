import { useUsuario } from '@/context/context';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { desenvolvimento, exames, prontuario, vacina } from "../routes/rotas";
import { supabase } from "../supabaseserver";
import styles from './styleForms';

export default function TelaInicial() {
  const router = useRouter();
  const { setUserId } = useUsuario();

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUserId(null);
      router.replace('/');
    } catch (err) {
      console.error("Erro ao sair:", err);
      alert("Erro ao sair do sistema. Tente novamente.");
    }
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.corEscura}>
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.corEscura, { flexGrow: 1, justifyContent: 'space-between' }]}
        extraHeight={280}
        enableOnAndroid={true}
      >
        <View style={styles.contInicial}>
          <View style={btstyle.botoesContainer}>
            <View>
              <Pressable style={btstyle.button} onPress={prontuario}>
                <Icon source="content-paste" color="#2261c1" size={45} />
                <Text style={btstyle.text}>Prontuário</Text>
              </Pressable>
            </View>
            <View>
              <Pressable style={btstyle.button} onPress={exames}>
                <Icon source="calendar-multiselect" color="#2261c1" size={45} />
                <Text style={btstyle.text}>Exames</Text>
              </Pressable>
            </View>
          </View>

          <View style={btstyle.botoesContainer}>
            <View>
              <Pressable style={btstyle.button} onPress={vacina}>
                <Icon source="needle" color="#2261c1" size={45} />
                <Text style={btstyle.text}>Vacinação</Text>
              </Pressable>
            </View>
            <View>
              <Pressable style={btstyle.button} onPress={desenvolvimento}>
                <Icon source="information-outline" color="#2261c1" size={45} />
                <Text style={btstyle.text}>Informações</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={btstyle.logoutContainer}>
          <Pressable style={btstyle.logoutButton} onPress={logout}>
            <Icon source="logout" color="#2261c1" size={28} />
            <Text style={btstyle.logoutText}>Sair</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const btstyle = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    width: 'auto',
    aspectRatio: '1/1',
    height: 160,
    borderRadius: 10,
  },
  text: {
    color: '#2261C1',
    fontSize: 25,
    fontFamily: 'Raleway-500',
  },
  botoesContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  logoutContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'white',
  },
  logoutText: {
    color: '#2261C1',
    fontSize: 18,
    marginLeft: 6,
    fontFamily: 'Raleway-500'
  },
});