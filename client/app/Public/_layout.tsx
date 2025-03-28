import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PublicBottomTabsNavigator from '@/navigation/PublicBottomTabsNavigator';
import Informacion from './informacion';
import { NavigationContainer } from '@react-navigation/native';
import Detalles from './detalles';

const Stack = createNativeStackNavigator();

const _LayoutPublic = () => {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          animation: 'slide_from_right' // Animación suave
        }}
      >
        {/* Pantalla principal con tabs - sin header */}
        <Stack.Screen
          name="Home"
          component={PublicBottomTabsNavigator}
          options={{ headerShown: false }}
        />

        {/* Pantalla de información - con header y flecha de retroceso automática */}
        <Stack.Screen
          name="Informacion"
          component={Informacion}
          options={{ title: 'Información' }}
        />
         <Stack.Screen
          name="Detalles"
          component={Detalles}
          options={{ title: 'Detalles' }}
        />
      </Stack.Navigator>

  );
};

export default _LayoutPublic;