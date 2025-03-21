import UsuarioDrawer from '@/app/Admin/usuario';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const Drawer = createDrawerNavigator();


const AdminDrawerNavigator = () => {
  const backgroundColor = useThemeColor({}, 'background')
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView
      style={{ backgroundColor: backgroundColor, flex: 1 }}
    >
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer.Navigator
          screenOptions={{
            drawerContentStyle: {
              backgroundColor: backgroundColor  // Fondo del drawer
            },
            // drawerActiveTintColor: linkActive, // Color para la ruta activa (personalizado)
            // drawerInactiveTintColor: linkInactive, // Color para las rutas inactivas (personalizado)
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: backgroundColor,
            },
          }}
        >
          <Drawer.Screen name="Home" component={UsuarioDrawer}
            options={{
              drawerIcon: ({ color, size }) => <Ionicons name="home" size={30} color={color} className="mr-5" />
            }}
          />
          <Drawer.Screen
            name='Usuario'
            component={UsuarioDrawer}
            options={{
              drawerIcon: ({ color, size }) => <Ionicons name="person" size={30} color={color} className="mr-5" />
            }}
          />
          {/* <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
        </Drawer.Navigator>
      </ThemeProvider>

    </GestureHandlerRootView>

  )
}

export default AdminDrawerNavigator