import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import ThemedText from '@/presentation/shared/ThemedText';

const PerfillTabs = () => {
  const themeColor = useThemeColor({}, 'background');

  return (
    <SafeAreaView style={{ backgroundColor: themeColor }} className='flex-1 dark:bg-slate-900'>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Encabezado del Perfil */}
        <LinearGradient
          colors={['#2563eb', '#60a5fa', '#ffffff']} // Colores por defecto (modo claro)
          className="pb-14 px-6 rounded-b-3xl dark:bg-slate-800" // dark:bg-slate-800 como fallback
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