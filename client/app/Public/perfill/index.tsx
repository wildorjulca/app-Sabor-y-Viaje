import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import ThemedText from '@/presentation/shared/ThemedText';
import { useAuthStore } from '@/storage/authenticacion-staore';

const PerfillTabs = () => {
  const themeColor = useThemeColor({}, 'background');
  const { isAuthenticated } = useAuthStore((state) => state);

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={{ backgroundColor: themeColor }} className='flex-1 dark:bg-slate-900'>
      <ScrollView
        contentContainerStyle={{ 
          flexGrow: 1, 
          justifyContent: 'center', 
          alignItems: 'center',
          paddingBottom: 20
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header con gradiente mejorado */}
        <LinearGradient
          colors={['#4F46', '#6366F1', '#818C']} // Degradado violeta/azul más moderno
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full pb-20 pt-16 px-6 rounded-b-[40px] items-center"
        >
          {/* Avatar con efecto neumorfismo */}
          <View className="w-28 h-28 rounded-full flex items-center justify-center 
            shadow-lg shadow-violet-700/50
            bg-gradient-to-br from-violet-500 to-indigo-600
            dark:from-indigo-600 dark:to-violet-700">
            <Ionicons 
              name="person-outline" 
              size={52} 
              color="rgba(255,255,255,0.9)" 
            />
          </View>
          
          {/* Textos con sombra */}
          <ThemedText className="font-bold text-3xl text-white mt-6 dark:text-white 
            text-center leading-tight
            shadow-sm shadow-violet-900/30">
            Únete a nuestra comunidad
          </ThemedText>
          
          <ThemedText className="text-center text-white/90 mt-3 text-lg 
            dark:text-gray-100 font-medium
            max-w-[300px]">
            Vive experiencias únicas y disfruta beneficios exclusivos
          </ThemedText>
        </LinearGradient>
    
        {/* Tarjeta de beneficios */}
        <View className="w-[90%] -mt-10 bg-white dark:bg-slate-800 
          rounded-2xl p-5 shadow-xl shadow-violet-500/10
          border border-gray-100 dark:border-slate-700">
          <View className="flex-row items-center mb-4">
            <View className="bg-violet-100 dark:bg-indigo-900/50 p-2 rounded-lg">
              <Ionicons name="sparkles" size={24} color="#7C3AED" />
            </View>
            <ThemedText className="ml-3 font-bold text-lg dark:text-white">
              Beneficios exclusivos
            </ThemedText>
          </View>
          
          <View className="space-y-3">
            {[
              "✓ Descuentos especiales en actividades",
              "✓ Acceso prioritario a eventos",
              "✓ Ofertas personalizadas",
              "✓ Soporte 24/7"
            ].map((item, index) => (
              <View key={index} className="flex-row items-start">
                <Ionicons 
                  name="checkmark-circle" 
                  size={18} 
                  color="#10B981" 
                  className="mt-1 mr-2" 
                />
                <ThemedText className="text-gray-700 dark:text-gray-300 flex-1">
                  {item}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>
    
        {/* Botones con efecto de gradiente */}
        <View className="w-full px-6 mt-8">
          <TouchableOpacity 
            className="py-4 rounded-xl overflow-hidden items-center
            shadow-lg shadow-indigo-500/30 active:opacity-90"
            onPress={() => router.navigate('login')}
          >
            <LinearGradient
              colors={['#6366F1', '#4F46E5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="absolute inset-0"
            />
            <ThemedText className="text-white font-bold text-lg relative">
              Iniciar sesión
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="border-2 border-indigo-500 py-4 rounded-xl items-center mt-4
            bg-white dark:bg-slate-800 shadow-sm shadow-indigo-500/10
            active:bg-indigo-50 dark:active:bg-slate-700"
            onPress={() => router.navigate('register')}
          >
            <ThemedText className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">
              Registrarse
            </ThemedText>
          </TouchableOpacity>
        </View>
    
        {/* Footer con términos */}
        <View className="mt-10 px-8">
          <ThemedText className="text-center text-gray-500 dark:text-gray-400 text-sm">
            Al registrarte, aceptas nuestros {'\n'}
            <Text className="text-indigo-600 dark:text-indigo-400 font-medium">
              Términos y Condiciones
            </Text> y la {'\n'}
            <Text className="text-indigo-600 dark:text-indigo-400 font-medium">
              Política de Privacidad
            </Text>
          </ThemedText>
          
          {/* Logo o marca */}
          <View className="mt-6 items-center">
            <View className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
              <Ionicons 
                name="compass" 
                size={32} 
                color="#6366F1" 
              />
            </View>
            <ThemedText className="mt-2 text-indigo-500 dark:text-indigo-400 font-bold">
              Travel Explorer
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: themeColor }} className='flex-1 dark:bg-slate-900'>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Encabezado del Perfil */}
        <LinearGradient
          colors={['#2563eb', '#60a5fa', '#ffffff']}
          className="pb-14 px-6 rounded-b-3xl dark:bg-slate-800"
        >
          <View className="flex-row justify-between items-center mt-10">
            <View className="flex-row items-center">
              <View className="w-16 h-16 bg-violet-400 rounded-full flex items-center justify-center dark:bg-blue-400">
                <Ionicons
                  name="person-outline"
                  size={40}
                  color={"#fff"}
                />
              </View>
              <View className="ml-4">
                <Text
                  className="font-bold text-xl text-white dark:text-gray-200"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  Usuario de Klook
                </Text>
                <Text
                  className="underline text-sm mt-1 text-blue-100 dark:text-blue-400"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  Actualizar información personal
                </Text>
              </View>
            </View>
            <Ionicons
              name="notifications-outline"
              size={30}
              color={"#8A2BE2"}
            />
          </View>
        </LinearGradient>

        {/* Recompensas */}
        <View className='mx-4 -mt-8 p-4 rounded-2xl shadow-md bg-white dark:bg-slate-700'>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons
                name="medal-outline"
                size={24}
                className="text-blue-600 dark:text-blue-400"
              />
              <View className="ml-3">
                <ThemedText>Klook Rewards</ThemedText>
                <Text className='font-bold text-blue-600 dark:text-blue-400'>
                  Lv.1 Explorer
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text className='text-blue-600 dark:text-blue-400'>
                Ver recompensas
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Opciones del menú */}
        <View className='mt-4 mx-4 shadow-md'>
          {[
            { icon: 'calendar-outline', title: 'Reservas' },
            { icon: 'gift-outline', title: 'Recompensas de Klook' },
            {
              icon: 'person-outline',
              title: 'Mis datos',
              subtitle: 'Gestiona tus datos de reservas, direcciones y métodos de pago aquí',
            },
            { icon: 'chatbox-outline', title: 'Opiniones' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className='bg-white dark:bg-gray-700 flex-row items-center justify-between pr-[22px] pl-[8px] py-3'
            >
              <View className="flex-row items-center">
                <Ionicons
                  name={item.icon}
                  size={24}
                  color={"#1E90FF"}
                  className="text-blue-600 dark:text-blue-400"
                />
                <View className="ml-4 flex-1">
                  <ThemedText type='semi-bold'>
                    {item.title}
                  </ThemedText>
                  {item.subtitle && (
                    <Text
                      className='text-sm mt-1 text-gray-500 dark:text-gray-400'
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {item.subtitle}
                    </Text>
                  )}
                </View>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                className="text-gray-500 dark:text-blue-400"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Opciones adicionales */}
        <View className='mt-4 mx-4 rounded-2xl shadow-md bg-white dark:bg-slate-700'>
          {[
            { icon: 'help-circle-outline', title: 'Ayuda' },
            { icon: 'thumbs-up-outline', title: 'Califica nuestra aplicación' },
            { icon: 'settings-outline', title: 'Configuración' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className='flex-row items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-600'
            >
              <View className="flex-row items-center">
                <Ionicons
                  name={item.icon}
                  size={24}
                  color={"#1E90FF"}
                />
                <Text className='ml-4 font-medium flex-shrink text-gray-800 dark:text-gray-200'>
                  {item.title}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PerfillTabs;