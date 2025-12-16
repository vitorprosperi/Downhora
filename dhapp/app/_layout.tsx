import { NotificationProvider } from '@/context/NotificationContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PacienteProvider, UsuarioProvider } from '../context/context';
import { getDB } from '../database';
import AppInitializer from '../Initializer/appinitializer';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Raleway': require('../assets/fonts/raleway-v37-latin-regular.ttf'),
    'Raleway-500': require('../assets/fonts/raleway-v37-latin-500.ttf'),
    'Raleway-600': require('../assets/fonts/raleway-v37-latin-600.ttf'),
    'Raleway-700': require('../assets/fonts/raleway-v37-latin-700.ttf'),
    'Roboto': require('../assets/fonts/roboto-v49-latin-regular.ttf'),
    'Roboto-500': require('../assets/fonts/roboto-v49-latin-500.ttf'),
    'Roboto-600': require('../assets/fonts/roboto-v49-latin-600.ttf'),
    'Roboto-700': require('../assets/fonts/roboto-v49-latin-700.ttf'),
    'Roboto-500-italic': require("../assets/fonts/roboto-v49-latin-500-italic.ttf"),
  });

  useEffect(() => {
    (async () => {
      await getDB(); // garante que o banco está pronto antes de renderizar o app
      if (loaded || error) SplashScreen.hideAsync();
    })();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <GestureHandlerRootView>

      <UsuarioProvider>
        <NotificationProvider>
          <AppInitializer>
            <PacienteProvider>
              <Stack
                screenOptions={{
                  headerStyle: { backgroundColor: '#FFFFFF' },
                  headerTintColor: '#231F20',
                  headerTitleStyle: { fontFamily: 'Raleway-700' },
                  title: '',
                  headerShadowVisible: false,
                }}
              >
                <Stack.Screen name="index" options={{ title: '' }} />
                <Stack.Screen name="(top-tabs)" options={{ title: 'Informações' }} />
              </Stack>
            </PacienteProvider>
          </AppInitializer>
        </NotificationProvider>
      </UsuarioProvider>
    </GestureHandlerRootView>
  );
}
