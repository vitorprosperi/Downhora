import * as SecureStore from 'expo-secure-store';
import { supabase } from '../supabaseserver';
import { useEffect, useRef, useState } from 'react';
import { useUsuario } from '@/context/context';
import NetInfo from '@react-native-community/netinfo';
import { SupabaseSinc } from "../supabaseSinc/supabaseSinc";
import { getDB } from '../database';

let isSyncing = false;

// Função de sincronização da fila fora do componente
export const sincronizarFila = async (db) => {
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
      let payload;

      // payload inválido não pode travar a fila
      try {
        payload = JSON.parse(item.payload);
      } catch (e) {
        console.error(`Payload inválido na fila (fila id ${item.id}). Removendo para não travar.`);
        await db.runAsync('DELETE FROM fila_sinc WHERE id = ?', [item.id]);
        continue;
      }

      // Aceita itens antigos e novos
      const acaoEhUpsert = item.acao === 'upsert' || item.acao === 'insert';

      if (item.nome_tabela === 'exames' && acaoEhUpsert) {
        if (!payload?.id) {
          console.error(`Item da fila sem payload.id (fila id ${item.id}). Removendo.`);
          await db.runAsync('DELETE FROM fila_sinc WHERE id = ?', [item.id]);
          continue;
        }

        const { error } = await supabase
          .from('exames')
          .upsert(payload, { onConflict: 'id' });

        if (!error) {
          await db.runAsync('DELETE FROM fila_sinc WHERE id = ?', [item.id]);
          console.log(`Exame sincronizado (fila id ${item.id}, exame id ${payload.id})`);
        } else {
          console.error(`Erro ao enviar exame (fila id ${item.id}):`, error.message);
          // não remove da fila — tenta de novo depois
        }
      }
    }

    console.log('Sincronização da fila concluída!');
  } catch (error) {
    console.error('Erro ao buscar fila_sinc:', error);
  } finally {
    isSyncing = false;
  }
};

export default function AppInitializer({ children }) {
  const { setUserId, userId } = useUsuario();
  const [authReady, setAuthReady] = useState(false);

  const prevIsConnected = useRef(null); // null pra não bloquear o primeiro evento
  const debounceTimer = useRef(null);

  // 1) Restaurar sessão
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

        const { data } = await supabase.auth.getSession();

        if (data?.session?.user?.id) {
          setUserId(data.session.user.id);
          setAuthReady(true);
          console.log('Sessão restaurada para o usuário:', data.session.user.id);
        }
      } catch (err) {
        console.error('Falha ao restaurar sessão:', err);
      }
    };

    restaurarSessao();
  }, []);

  // 3) Sync inicial quando app abre online
  useEffect(() => {
    const syncInicial = async () => {
      if (!authReady || !userId) return;

      const state = await NetInfo.fetch();
      if (!state.isConnected) return;

      console.log("App iniciado online — sincronizando...");

      const db = await getDB();
      await sincronizarFila(db);       // push pendentes
      await SupabaseSinc(db, userId);  // pull / merge
    };

    syncInicial();
  }, [authReady, userId]);

  // 4) Sync quando a conexão volta
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isConnected = state.isConnected;

      // Evita chamadas repetidas se o estado não mudou
      if (prevIsConnected.current === isConnected) return;
      prevIsConnected.current = isConnected;

      if (debounceTimer.current) clearTimeout(debounceTimer.current);

      // Delay pra evitar repiques rápidos
      debounceTimer.current = setTimeout(async () => {
        if (isConnected && authReady && userId) {
          console.log('Conexão restabelecida — iniciando sincronização...');
          const db = await getDB();
          await sincronizarFila(db);       // push pendentes
          await SupabaseSinc(db, userId);  // pull / merge
        }
      }, 1000);
    });

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      unsubscribe();
    };
  }, [userId, authReady]);

  return children;
}