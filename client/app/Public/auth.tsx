import { View, TextInput, TouchableOpacity, Image, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedText from '@/presentation/shared/ThemedText';
import { authService, } from '@/api/services/authService';
import FlashMessage, { showMessage } from "react-native-flash-message"
import { useAuthStore } from '@/storage/authenticacion-staore';
import { useNavigation } from "@react-navigation/native";

const AuthScreen = () => {
  const navigation = useNavigation()
  const { authenticateUser, error, isAuthenticated, loading, user } = useAuthStore((state) => state)

  const [objUser, setobjUser] = useState({ email: "", contrasena: "" })
  const [errros, seterrros] = useState({ email: "", contrasena: "" })

  useEffect(() => {
    if (isAuthenticated === true) {
      setTimeout(() => {
        navigation.goBack()
      }, 1000);
    }
  }, [isAuthenticated])

  const handleAuthRegister = async () => {
    authenticateUser(objUser.email, objUser.contrasena)
  }


  const onchangeValues = (name: string, value: string) => {
    setobjUser(prev => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <ThemedView className="dark:bg-slate-900">
      <FlashMessage position="top" />
      <View className="px-6">
        {/* Encabezado simple */}
        <View className="mb-10 items-center">
          <Image
            source={require('../../assets/cuenta.png')}
            className="w-20 h-20 mb-4"
          />
          <ThemedText className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">
            Iniciar Sesión
          </ThemedText>
          <ThemedText className="text-gray-500 dark:text-gray-400">
            Ingresa tus datos para continuar
          </ThemedText>
        </View>
        {/* Formulario simple */}
        <View className="w-full mb-8">
          {/* Input Email */}
          <View className="mb-4">
            <TextInput
              className="border relative z-20 border-gray-300 dark:border-gray-600 rounded-full px-4 py-4 
                        text-gray-900 dark:text-white mb-2"
              placeholder="Correo electrónico"
              placeholderTextColor="#9CA3AF"
              onChangeText={(text) => onchangeValues("email", text)}
            // keyboardType="email-address"
            // autoCapitalize="none"
            />
            {error.email && (<Text className='text-red-500'>{error.email}</Text>)}
          </View>

          {/* Input Contraseña */}
          <View className="mb-6">
            <TextInput
              className="border border-gray-300 dark:border-gray-600 rounded-full px-4 py-4 relative z-20 
                        text-gray-900 dark:text-white"
              placeholder="Contraseña"
              placeholderTextColor="#9CA3AF"
              onChangeText={(text) => onchangeValues("contrasena", text)}
            // secureTextEntry
            />
            {error.contrasena && (<Text className='text-red-500'>{error.contrasena}</Text>)}
          </View>

          {/* Botón Principal */}
          <TouchableOpacity
            onPress={handleAuthRegister}
            className={`py-5 rounded-full items-center justify-center ${loading ? "bg-gray-400" : "bg-blue-500"
              }`}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <ThemedText className="text-white font-medium">Ingresar</ThemedText>
            )}
          </TouchableOpacity>
        </View>

        {/* Separador */}
        <View className="flex-row items-center my-8 w-full">
          <View className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-700" />
          <ThemedText className="px-4 text-gray-400 dark:text-gray-500 text-sm font-bold">
            O CONECTA CON
          </ThemedText>
          <View className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-700" />
        </View>

        {/* Botones Sociales a todo ancho */}
        <View className="gap-2">
          <TouchableOpacity
            className="flex-row items-center justify-center py-3 px-4 rounded-lg bg-gray-50 dark:bg-gray-800 
                      border border-gray-300 dark:border-gray-600"
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
              className="w-6 h-6 mr-3"
            />
            <ThemedText className="text-gray-800 dark:text-gray-200 font-medium">
              Continuar con Google
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-center py-3 px-4 rounded-lg bg-gray-50 dark:bg-gray-800 
                      border border-gray-300 dark:border-gray-600"
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/124/124010.png' }}
              className="w-6 h-6 mr-3"
            />
            <ThemedText className="text-gray-800 dark:text-gray-200 font-medium">
              Continuar con Facebook
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-center py-3 px-4 rounded-lg bg-gray-50 dark:bg-gray-800 
                      border border-gray-300 dark:border-gray-600"
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png' }}
              className="w-6 h-6 mr-3"
            />
            <ThemedText className="text-gray-800 dark:text-gray-200 font-medium">
              Continuar con Instagram
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Cambiar a registro */}
        <View className="flex-row justify-center  relative top-2">
          <ThemedText className="text-gray-500 dark:text-gray-400 text-sm">
            ¿ERES NUEVO EN NEXUS?
          </ThemedText>
          <TouchableOpacity activeOpacity={0.7}>
            <ThemedText className="text-blue-400 font-black ml-2 text-sm">
              CREAR CUENTA
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
};

export default AuthScreen;
