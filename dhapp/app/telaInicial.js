import { useUsuario } from '@/context/context';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDB } from '../database';
import { administrador, desenvolvimento, exames, perfil, prontuario, vacina } from "../routes/rotas";
import { supabase } from "../supabaseserver";
import styles from './styleForms';

export default function TelaInicial() {
  const router = useRouter();
  const { setUserId } = useUsuario();
  const [nomeUsuario, setNomeUsuario] = useState("Usuário");

  useEffect(() => {
    const buscarNomeUsuario = async () => {
      try {
        const db = await getDB(); // usa o banco sqlite
        const { data, error } = await supabase.auth.getUser();

        if (error || !data?.user) {
          console.log("Nenhum usuário autenticado no Supabase.");
          return;
        }

        const userId = data.user.id;

        // tenta achar o usuário local
        const localUser = await db.getFirstAsync(
          "SELECT nome FROM usuarios WHERE id = ?",
          [userId]
        );

        if (localUser?.nome) {
          setNomeUsuario(localUser.nome);
          return;
        }

        // se não encontrar localmente, busca no Supabase
        const { data: remoto, error: erroSupabase } = await supabase
          .from("usuarios")
          .select("nome")
          .eq("id", userId)
          .single();

        if (erroSupabase) {
          console.error("Erro ao buscar no Supabase:", erroSupabase);
        } else if (remoto?.nome) {
          setNomeUsuario(remoto.nome);

          // salva no banco local para cache futuro
          await db.runAsync(
            "INSERT OR REPLACE INTO usuarios (id, nome) VALUES (?, ?)",
            [userId, remoto.nome]
          );
        }
      } catch (err) {
        console.error("Erro ao carregar nome do usuário:", err);
      }
    };

    buscarNomeUsuario();
  }, []);

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
    <SafeAreaView edges={['bottom', 'left', 'right', 'top']} style={styles.corEscura}>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.corEscura, { flexGrow: 1, justifyContent: 'space-between' }]}
        extraHeight={280}
        enableOnAndroid={true}
      >
        <View style={btstyle.contView}>
          <View style={btstyle.logoutContainer}>
            <Pressable
              style={({ pressed }) => (pressed ? btstyle.logoutHighlight : btstyle.logoutButton)}
              onPress={() => logout()}
            >
              <Icon source="logout" color="#2261c1" size={28} />
              <Text style={btstyle.logoutText}>Sair</Text>
            </Pressable>
            <Pressable
              onPress={administrador}>
              <Text>segredo</Text>
            </Pressable>
          </View>



          <View style={btstyle.contOla}>
            <Text style={btstyle.textOla}>Olá </Text>
            <Text style={[btstyle.textOla, { color: '#F2AA08' }]}>
              {nomeUsuario.split(" ")[0]}
            </Text>
          </View>

          <View style={btstyle.botoesContainer}>


            <Pressable
              style={({ pressed }) => (pressed ? btstyle.highlight : btstyle.button)}
              onPress={perfil}
            >
              <Icon source="account" color="#2261c1" size={55} />
              <Text style={btstyle.text}>Perfil</Text>
            </Pressable>

            <TouchableOpacity>
              <Pressable
                style={({ pressed }) => (pressed ? btstyle.highlight : btstyle.button)}
                onPress={prontuario}
              >
                <Icon source="content-paste" color="#2261c1" size={55} />
                <Text style={btstyle.text}>Prontuário</Text>
              </Pressable>
            </TouchableOpacity>

            <Pressable
              style={({ pressed }) => (pressed ? btstyle.highlight : btstyle.button)}
              onPress={exames}
            >
              <Icon source="calendar-multiselect" color="#2261c1" size={55} />
              <Text style={btstyle.text}>Exames</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => (pressed ? btstyle.highlight : btstyle.button)}
              onPress={vacina}
            >
              <Icon source="needle" color="#2261c1" size={55} />
              <Text style={btstyle.text}>Vacinação</Text>
            </Pressable>


            <Pressable
              style={({ pressed }) => (pressed ? btstyle.highlight : btstyle.button)}
              onPress={desenvolvimento}
            >
              <Icon source="information-outline" color="#2261c1" size={55} />
              <Text style={btstyle.text}>Informações</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const btstyle = StyleSheet.create({
  contView: { flex: 1 },
  contOla: { flexDirection: 'row', alignSelf: 'center' },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    width: '70%',
    paddingVertical: 20,
    borderRadius: 20,
    boxShadow: '0.25px 0.5px 1px 0px hsl(216, 60%, 35%)',
  },
  highlight: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBFBFC',
    width: '70%',
    paddingVertical: 20,
    borderRadius: 20,
    boxShadow: '0.25px 0.5px 1.5px 0px hsl(216, 60%, 35%)',
  },
  text: {
    color: '#2261C1',
    fontSize: 25,
    fontFamily: 'Raleway-500',
  },
  textOla: {
    color: '#2261C1',
    fontSize: 25,
    fontFamily: 'Raleway-700',
  },
  botoesContainer: {
    flexDirection: 'column',
    width: '100%',
    gap: 10,
    marginTop: 10,
  },
  logoutContainer: {
    flexDirection: 'row-reverse',
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingBottom: 20,
    marginTop: '5%',
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
    boxShadow: '0.25px 0.5px 1px 0px hsl(216, 60%, 35%)',
  },
  logoutHighlight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBFBFC',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'white',
    boxShadow: '0.25px 0.5px 1px 0px hsl(216, 60%, 35%)',
  },
  logoutText: {
    color: '#2261C1',
    fontSize: 18,
    marginLeft: 6,
    fontFamily: 'Raleway-500',
  },
});
