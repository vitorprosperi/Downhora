import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonP from '@/components/ButtonP';
import { cadastroProfissional } from '../routes/rotas';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App DownHora</Text>
      <Text style={styles.subtitle}>Unesp Botucatu</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081221',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 30,
    textAlign: 'center',
  },
});