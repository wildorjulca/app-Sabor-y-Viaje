import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PublicBottomTabsNavigator from '@/navigation/PublicBottomTabsNavigator';
import { NavigationContainer } from '@react-navigation/native';
import Informacion from '@/app/Public/informacion';
import Detalles from '@/app/Public/detalles';
// import searchStack from '@/app/Public/search';

import SearchStack from '@/app/Public/search';
import InformationLugarTuristico from '@/app/Public/informationLugarTuristico';

const Stack = createNativeStackNavigator();

const PublicStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                animation: 'fade_from_bottom'
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
            <Stack.Screen
                name='searchStack'
                component={SearchStack}
            />
            <Stack.Screen
                name='informationLugarTuristico'
                component={InformationLugarTuristico}
            />
        </Stack.Navigator>

    );
};

export default PublicStack;