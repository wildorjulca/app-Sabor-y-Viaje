import { View, Text, TouchableOpacity, Animated, Dimensions, Easing, ActivityIndicator } from 'react-native';
import React, { useRef, useState, useTransition } from 'react';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput ';
import { UserType } from '@/interface/user';
import { BackendError, newUsuario } from '@/api/services/userService';

import FlashMessage, { showMessage } from "react-native-flash-message"
import { validacionUsuario } from '@/models/validation/initialErrorUser';

const UsuarioDrawer = () => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedTop = useRef(new Animated.Value(-500)).current; // Posición inicial fuera de la pantalla

  const [isLoading, setisLoading] = useState(false)
  let initialErros = { name: "", email: "", password: "" }
  const [errorUser, seterrorUser] = useState(initialErros)

  const fadein = () => {
    // Animación para que aparezca y venga hacia abajo
    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: 1, // Aparece
        duration: 500,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(animatedTop, {
        toValue: 0, // Baja a la posición visible
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const fadeOut = () => {
    seterrorUser(initialErros)
    // Animación para que desaparezca y suba fuera de la pantalla
    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: 0, // Desaparece
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animatedTop, {
        toValue: -500, // Sube fuera de la pantalla
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };


  // funciones para guardar
  const [formDataUser, setformDataUser] = useState<UserType>({
    id: 0,
    name: "",
    email: "",
    password: "",
    profilePicture: "",
    bio: "",
    // createdAt: ,
    // updatedAt: ""
  })

  const handleOnchangeValues = (name: string, value: string) => {
    setformDataUser(prev => ({
      ...prev,
      [name]: value
    }))

  }
  const handleSubmit = async () => {
    setisLoading(true);
    try {
      const response = await newUsuario(formDataUser);
      if (response.status === 201) {
        showMessage({
          message: "Guardado con éxito",
          description: response.message,
          type: "success",
        });
        fadeOut();
      }
    } catch (error) {
      const backendError = error as BackendError;
      if (backendError.status === 400) {
        const objectErrors = validacionUsuario(backendError.errors);
        seterrorUser(objectErrors?.error);
      }
    } finally {
      setisLoading(false);

  };
}
  
  return (
    <ThemedView className="px-3">
      <FlashMessage position="bottom" />  {/*MENSAJES  DE LA LIBRERIA react-native-flash-message */}
      <TouchableOpacity onPress={fadein} className="bg-blue-500 py-2 px-4 rounded mb-4">
        <Text className="text-white text-center">Abrir Formulario</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={fadeOut} className="bg-red-500 py-2 px-4 rounded mb-4">
        <Text className="text-white text-center">Cerrar Formulario</Text>
      </TouchableOpacity>

      {/* Formulario Animado */}
      <Animated.View
        className='bg-white dark:bg-dark-background p-2 gap-3'
        style={{
          width: Dimensions.get('window').width, // Ocupa el 100% del ancho de la pantalla
          height: 500, // Altura fija del formulario
          opacity: animatedOpacity, // Controla la opacidad del formulario
          transform: [{ translateY: animatedTop }], // Controla la posición vertical del formulario
          position: 'absolute', // Asegura que el formulario esté superpuesto
          top: 0,
        }}
      >
        <View>
          <ThemedText className="mb-2 text-sm font-medium">Nombres</ThemedText>
          <ThemedTextInput placeholder="Ingrese su nombre" type="normal" onChangeText={(text) => handleOnchangeValues('name', text)} />
          {errorUser.name && <Text className='text-red-500 pl-2 pt-1'>{errorUser.name}</Text>}

        </View>
        <View>
          <ThemedText className="mb-2 text-sm font-medium">Email</ThemedText>
          <ThemedTextInput placeholder="Ingrese su email" type="normal" onChangeText={(text) => handleOnchangeValues('email', text)} />
          {errorUser.email && <Text className='text-red-500 pl-2 pt-1'>{errorUser.email}</Text>}
        </View>
        <View>
          <ThemedText className="mb-2 text-sm font-medium">Password</ThemedText>
          <ThemedTextInput placeholder="Ingrese su contraseña" type="normal" onChangeText={(text) => handleOnchangeValues('password', text)} />
          {errorUser.password && <Text className='text-red-500 pl-2 pt-1'>{errorUser.password}</Text>}
        </View>
        <View>
          <ThemedText className="mb-2 text-sm font-medium">Foto Perfil</ThemedText>
          <ThemedTextInput placeholder="Ingrese el enlace de su foto" type="normal" />
        </View>
        <View className="flex-row justify-end gap-4 mt-4">
          <TouchableOpacity
            className="py-4 px-6 bg-indigo-50 dark:bg-dark-primary rounded-lg flex-row justify-center"
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading && <ActivityIndicator className="mr-2" color="#6366f1" />}
            <Text className="text-indigo-500 dark:text-white text-[13px] font-semibold">
              {isLoading ? "Guardando..." : "Agregar"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={fadeOut}
            className="py-4 px-6 bg-red-50 dark:bg-dark-tertiary rounded-lg">
            <Text className="text-red-500 text-[13px] font-semibold text-center dark:text-white"  >Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ThemedView>
  );
};

export default UsuarioDrawer;
