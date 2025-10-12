import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import ButtonP from '@/components/ButtonP';
import { login } from '@/routes/rotas';
import { cadastropac } from '../routes/rotas';
import { supabase } from '@/supabaseserver';

const LogoImage = require('@/assets/images/logodhredondotrans.png');

export default function App() {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log('[Pronto] Iniciando verificação de sessão no supabase...');
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('[Erro Supabase]', error.message);
          return;
        }

        const session = data?.session;

        if (session) {
          console.log('[Supabase] Sessão encontrada:', session.user?.id);
          router.replace('/telaInicial');
        } else {
          console.log('[Supabase] Nenhuma sessão ativa encontrada.');
        }
      } catch (err) {
        console.error('[Erro] ao obter sessão do Supabase:', err);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, [router]);

  return (
    <View style={styles.indexEstilo}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.logoContainer}>
        <View style={styles.imageContainer}>
          <Image source={LogoImage} style={styles.image} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.textDown}>Down</Text>
          <Text style={styles.textHora}>Hora</Text>
        </View>
      </View>

      <View style={styles.containerBotoes}>
        {checkingSession ? (
          <View style={{ alignItems: 'center', padding: 16 }}>
            <ActivityIndicator size="large" />
            <Text style={{ color: '#231F20', marginTop: 8 }}>Verificando sessão...</Text>
          </View>
        ) : (
          <>
            <ButtonP label="Login" theme="yellow" onPress={login} />
            <ButtonP label="Cadastro" onPress={cadastropac} />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerBotoes: {
    gap: 10,
    width: '80%',
  },
  textDown: {
    color: '#2261c1',
    fontSize: 40,
    fontFamily: 'Raleway-700',
  },
  textHora: {
    color: '#f2aa08',
    fontSize: 40,
    fontFamily: 'Raleway-700',
  },
  indexEstilo: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FAFAFF',
  },
  imageContainer: {
    width: 350,
    height: 350,
    marginBottom: 0,
    paddingBottom: 0,
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 100,
    paddingBottom: 0,
    marginBottom: 0,
  },
  logoContainer: {
    marginTop: 50,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
