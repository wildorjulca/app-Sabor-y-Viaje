import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritosTbas from '@/app/Public/Favoritos';
import IndexTbas from '@/app/Public/HomeTabs';
import CarritoTabs from '@/app/Public/carrito';
import ReservasTabs from '@/app/Public/reservas';
import PerfillTabs from '@/app/Public/perfill';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

const Tab = createBottomTabNavigator();

const PublicBottomTabsNavigator = () => {
  const theme = useThemeColor({}, 'background');
  const themeIcon = useThemeColor({}, 'text');

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: themeIcon,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: theme,
          height: 70, // Ajustar la altura total de la barra de pestañas
          paddingBottom: 10, // Espaciado interno inferior
          paddingTop: 10, // Espaciado interno superior
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 5,
        },
      }}
    >
      <Tab.Screen
        name="HomeTabs"
        component={IndexTbas}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="heart" size={30} color={color} />
              {/* Badge (notificación en el carrito) */}
              <View
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -10,
                  backgroundColor: 'red',
                  borderRadius: 10,
                  width: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                  3
                </Text>
              </View>
            </View>
          )
        }}
        name="Favoritos"
        component={FavoritosTbas}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={30} color={color} />,
        }}
        name="carrito"
        component={CarritoTabs}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="albums" size={30} color={color} />,
        }}
        name="reservas"
        component={ReservasTabs}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" size={30} color={color} />,
        }}
        name="perfill"
        component={PerfillTabs}
      />
    </Tab.Navigator>
  );
};

export default PublicBottomTabsNavigator;
