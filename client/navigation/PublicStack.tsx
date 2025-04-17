import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PublicBottomTabsNavigator from '@/navigation/PublicBottomTabsNavigator';
import { NavigationContainer } from '@react-navigation/native';
import Informacion from '@/app/Public/informacion';
import Detalles from '@/app/Public/detalles';
// import searchStack from '@/app/Public/search';

import SearchStack from '@/app/Public/search';
import InformationLugarTuristico from '@/app/Public/informationLugarTuristico';
import AuthScreen from '@/app/Public/auth';
import { Image, Text, View } from 'react-native';
import ThemedText from '@/presentation/shared/ThemedText';

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
            <Stack.Screen
                options={{
                    // headerShown: false,
                    headerShadowVisible: false,

                    animation: "slide_from_right",
                    title: "NEXUS",
                    headerStyle: {
                        backgroundColor: 'transparent' // Para un look completamente limpio
                    },

                    headerRight: () => (
                        <View>
                            <Image
                                source={require("../assets/logoempresa.png")}
                            />
                        </View>
                    )
                }}
                name='auth'
                component={AuthScreen}

            />
            
        </Stack.Navigator>

    );
};

export default PublicStack;