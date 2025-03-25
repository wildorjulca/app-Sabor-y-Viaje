import { View, Text, TouchableOpacity, Animated, Dimensions, Easing } from 'react-native';
import React, { useRef } from 'react';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput ';

const UsuarioDrawer = () => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedTop = useRef(new Animated.Value(-500)).current; // Posición inicial fuera de la pantalla

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

  return (
    <ThemedView className="px-3">
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
          <ThemedTextInput placeholder="Ingrese su nombre" type="normal" />
        </View>
        <View>
          <ThemedText className="mb-2 text-sm font-medium">Email</ThemedText>
          <ThemedTextInput placeholder="Ingrese su email" type="normal" />
        </View>
        <View>
          <ThemedText className="mb-2 text-sm font-medium">Password</ThemedText>
          <ThemedTextInput placeholder="Ingrese su contraseña" type="normal" />
        </View>
        <View>
          <ThemedText className="mb-2 text-sm font-medium">Foto Perfil</ThemedText>
          <ThemedTextInput placeholder="Ingrese el enlace de su foto" type="normal" />
        </View>
        <View className="flex-row justify-end gap-4 mt-4">
          <TouchableOpacity className="py-4 px-6 bg-indigo-50 dark:bg-dark-primary rounded-lg">
            <Text className="text-indigo-500 dark:text-white text-[13px] font-semibold text-center">Agregar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={fadeOut}
            className="py-4 px-6 bg-red-50 dark:bg-dark-tertiary rounded-lg">
            <Text className="text-red-500 text-[13px] font-semibold text-center dark:text-white" >Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ThemedView>
  );
};

export default UsuarioDrawer;
