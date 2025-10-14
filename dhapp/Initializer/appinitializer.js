import * as SecureStore from 'expo-secure-store';
import { supabase } from '../supabaseserver';
import { useEffect } from 'react';
import { useUsuario } from '@/context/context';

export default function AppInitializer({ children }) {
  const { setUserId } = useUsuario();

  useEffect(() => {
    const restaurarSessao = async () => {
      const storedSession = await SecureStore.getItemAsync('supabase_session');
      if (storedSession) {
        const session = JSON.parse(storedSession);

        // Tenta restaurar no Supabase
        await supabase.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        });

        // Define o ID do usuário no contexto
        if (session.user?.id) {
          setUserId(session.user.id);
          console.log("Sessão restaurada para o usuário:", session.user.id);
        } else if (session.user?.aud === 'authenticated') {
          setUserId(session.user.id);
        }
      }
    };

    restaurarSessao();
  }, []);

  return children;
}
