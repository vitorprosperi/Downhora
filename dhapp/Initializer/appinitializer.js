import * as SecureStore from 'expo-secure-store';
import { supabase } from '../supabaseserver';
import { useEffect, useRef } from 'react';
import { useUsuario } from '@/context/context';
import NetInfo from '@react-native-community/netinfo';
import { getDB } from '../database';

let isSyncing = false;

export default function AppInitializer({ children }) {
  const { setUserId } = useUsuario();
  const prevIsConnected = useRef(false);
  const debounceTimer = useRef(null);

  useEffect(() => {
    const restaurarSessao = async () => {
      try {
        console.log('[Pronto] Iniciando verificação de sessão no SecureStore...');
        const storedSession = await SecureStore.getItemAsync('supabase_session');
        if (!storedSession) {
          console.log('[SecureStore] Nenhuma sessão salva.');
          return;
        }

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

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isConnected = state.isConnected;

      // Evita chamadas repetidas se o estado não mudou
      if (isConnected === prevIsConnected.current) return;
      prevIsConnected.current = isConnected;

      if (debounceTimer.current) clearTimeout(debounceTimer.current);

      // Delay de 1 segundo para evitar repiques rápidos
      debounceTimer.current = setTimeout(async () => {
        if (isConnected) {
          console.log('Conexão restabelecida — iniciando sincronização...');
          const db = await getDB();
          await sincronizarFila(db);
        }
      }, 1000);
    });

    return () => {
      clearTimeout(debounceTimer.current);
      unsubscribe();
    };
  }, []);

  const sincronizarFila = async (db) => {
    if (isSyncing) {
      console.log('Sincronização já em andamento, ignorando chamada duplicada.');
      return;
    }

    isSyncing = true;

    try {
      const result = await db.getAllAsync('SELECT * FROM fila_sinc ORDER BY criado_em ASC');
      if (!result || result.length === 0) {
        console.log('Nenhum item pendente na fila.');
        return;
      }

      console.log(`Iniciando sincronização de ${result.length} item(s)...`);

      for (const item of result) {
        const payload = JSON.parse(item.payload);

        if (item.nome_tabela === 'exames' && item.acao === 'insert') {
          const { error } = await supabase.from('exames').insert([payload]);
          if (!error) {
            await db.runAsync('DELETE FROM fila_sinc WHERE id = ?', [item.id]);
            console.log(`Exame sincronizado (ID ${item.id})`);
          } else {
            console.error(`Erro ao enviar exame (ID ${item.id}):`, error.message);
          }
        }
      }

      console.log('Sincronização concluída com sucesso!');
    } catch (error) {
      console.error('Erro ao buscar fila_sinc:', error);
    } finally {
      isSyncing = false;
    }
  };

  return children;
}
