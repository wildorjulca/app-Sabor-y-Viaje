import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css'
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { useThemeColor } from '@/hooks/useThemeColor';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const backgroundColor = useThemeColor({}, 'background')

  const colorScheme = useColorScheme();

  SplashScreen.preventAutoHideAsync();
  const [loaded, error] = useFonts({
    'WorkSans-Black': require("../assets/fonts/WorkSans-Black.ttf"),
    'WorkSans-Bold': require("../assets/fonts/WorkSans-Bold.ttf"),
    'WorkSans-ExtraBold': require("../assets/fonts/WorkSans-ExtraBold.ttf"),
    'WorkSans-ExtraLight': require("../assets/fonts/WorkSans-ExtraLight.ttf"),
    'WorkSans-Light': require("../assets/fonts/WorkSans-Light.ttf"),
    'WorkSans-Medium': require("../assets/fonts/WorkSans-Medium.ttf"),
    'WorkSans-Regular': require("../assets/fonts/WorkSans-Regular.ttf"),
    'WorkSans-SemiBold': require("../assets/fonts/WorkSans-SemiBold.ttf"),
    'WorkSans-Thin': require("../assets/fonts/WorkSans-Thin.ttf"), 


    'WorkSans-Italic': require("../assets/fonts/WorkSans-Italic.ttf"),
    'WorkSans-BlackItalic': require("../assets/fonts/WorkSans-BlackItalic.ttf"),
    'WorkSans-BoldItalic': require("../assets/fonts/WorkSans-BoldItalic.ttf"),
    'WorkSans-ExtraBoldItalic': require("../assets/fonts/WorkSans-ExtraBoldItalic.ttf"),

    'WorkSans-ExtraLightItalic': require("../assets/fonts/WorkSans-ExtraLightItalic.ttf"),

  });

  useEffect(() => {
    if (error) throw error;
    if (loaded) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded || error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ backgroundColor: backgroundColor, flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style='auto' />
        <Slot />
        {/* <AppNavigator /> */}
        {/* <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" /> */}
      </ThemeProvider>
    </GestureHandlerRootView>

  );
}
