import * as SecureStore from 'expo-secure-store';
import { supabase } from '../supabaseserver';
import { useEffect } from 'react';
import { useUsuario } from '@/context/context';
import NetInfo from '@react-native-community/netinfo';
import { useSQLiteContext } from 'expo-sqlite';

// Variável global para impedir sincronizações duplicadas
let isSyncing = false;

export default function AppInitializer({ children }) {
  const { setUserId } = useUsuario();
  const db = useSQLiteContext();

  // Restaurar sessão salva no SecureStore
  useEffect(() => {
    const restaurarSessao = async () => {
      try {
        const storedSession = await SecureStore.getItemAsync('supabase_session');
        if (!storedSession) return;

        const session = JSON.parse(storedSession);

        const { error } = await supabase.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        });

        if (error) {
          console.error('Erro ao restaurar sessão:', error.message);
          return;
        }

        if (session.user?.id) {
          setUserId(session.user.id);
          console.log('Sessão restaurada para o usuário:', session.user.id);
        }
      } catch (err) {
        console.error('Falha ao restaurar sessão:', err);
      }
    };

    restaurarSessao();
  }, []);

  // Listener para detectar reconexão de rede
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      if (state.isConnected) {
        console.log('Conexão restabelecida — iniciando sincronização...');
        await sincronizarFila();
      }
    });

    return () => unsubscribe();
  }, []);

  // Função para sincronizar registros pendentes
  const sincronizarFila = async () => {
    if (isSyncing) {
      console.log('Sincronização já em andamento, ignorando chamada duplicada.');
      return;
    }

    isSyncing = true;
    try {
      const pendentes = await db.getAllAsync(
        'SELECT * FROM fila_sinc ORDER BY criado_em ASC'
      );

      if (!pendentes || pendentes.length === 0) {
        console.log('Nenhum item pendente na fila.');
        return;
      }

      console.log(`Iniciando sincronização de ${pendentes.length} item(s)...`);

      for (const item of pendentes) {
        const payload = JSON.parse(item.payload);
        console.log(`→ Sincronizando item da tabela ${item.nome_tabela} (ID local ${item.id})`);

        if (item.nome_tabela === 'exames' && item.acao === 'insert') {
          const { error } = await supabase.from('exames').insert([payload]);

          if (!error) {
            await db.runAsync('DELETE FROM fila_sinc WHERE id = ?', [item.id]);
            console.log(`✓ Exame sincronizado e removido da fila (ID ${item.id})`);
          } else {
            console.error(`✗ Erro ao enviar exame (ID ${item.id}):`, error.message);
          }
        }

        // Aqui no futuro você pode adicionar suporte para outras tabelas
      }

      console.log('✅ Sincronização concluída com sucesso!');
    } catch (error) {
      console.error('Erro ao sincronizar fila:', error);
    } finally {
      isSyncing = false;
    }
  };

  return children;
}
