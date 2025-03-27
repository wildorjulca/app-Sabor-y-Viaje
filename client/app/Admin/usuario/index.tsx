import { View, TouchableOpacity, Animated, Dimensions, Easing, ActivityIndicator, TextInput, FlatList, RefreshControl, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput ';
import { UserType } from '@/interface/user';
import { BackendError, getUsuario, newUsuario } from '@/api/services/userService';
import { DataTable } from "react-native-paper";
import FlashMessage, { showMessage } from "react-native-flash-message"
import { validacionUsuario } from '@/models/validation/initialErrorUser';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '@/presentation/shared/ThemedText';

const UsuarioDrawer = () => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedTop = useRef(new Animated.Value(-500)).current; // Posición inicial fuera de la pantalla

  const [isLoading, setisLoading] = useState(false)
  let initialErros = { name: "", email: "", password: "" }


  const [errorUser, seterrorUser] = useState(initialErros)


  const [data, setData] = useState<any[]>([]); // Datos cargados
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [page, setPage] = useState(0);
  const [, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Función para cargar datos (API con paginación y filtro)
  const fetchData = async (reset = false) => {
    setIsLoadingData(true);
    try {
      const response = await getUsuario({ name: search, page: reset ? 1 : page, limit: 10 });

      if (response.status && response.data) {
        const newData = response.data;
        console.log(newData.length)


        setData(reset ? newData : [...data, ...newData]); // Resetea o concatena datos
        setHasMore(newData.length >= 10); // Verifica si hay más datos
        setPage(reset ? 2 : page + 1); // Actualiza la página
        console.log({ reset, page })
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setIsLoadingData(false);
      if (reset) setIsRefreshing(false); // Detener el indicador de refresco
    }
  };

  // Llama a la función `fetchData` cuando el componente se monta
  useEffect(() => {
    fetchData(true); // Carga inicial con reset
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData(true);
  };



  // Renderiza el indicador de carga al final de la lista
  const renderFooter = () => {
    if (!isLoadingData) return null;
    return <ActivityIndicator style={{ margin: 10 }} />;
  };
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
    <ThemedView className="px-2">
      <FlashMessage position="bottom" />

      {/* Nav de input y del dasboard */}
      <View className="flex-row justify-between gap-2 w-full items-center space-x-2">
        <ThemedTextInput
          className="flex-1  rounded-full"
          placeholder="Buscar usuario"
        />
        <TouchableOpacity
          onPress={fadein}
          className="h-12 w-12 bg-blue-500 rounded-full items-center justify-center"
        >
          <Ionicons name="add" color={'white'} size={20} />
        </TouchableOpacity>
      </View>

      {/* Formulario Animado */}
      <Animated.View
        className='bg-white dark:bg-dark-background p-2 gap-3 z-10'
        style={{
          width: Dimensions.get('window').width, // Ocupa el 100% del ancho de la pantalla
          height: 500, // Altura fija del formulario
          opacity: animatedOpacity, // Controla la opacidad del formulario
          transform: [{ translateY: animatedTop }], // Controla la posición vertical del formulario
          position: 'absolute', // Asegura que el formulario esté superpuesto
          top: 0,
          // zIndex: 1
        }}
      >
        <View>
          <ThemedText className="mb-2 text-sm font-medium">Nombres</ThemedText>
          <ThemedTextInput placeholder="Ingrese su nombre" type="normal" onChangeText={(text) => handleOnchangeValues('name', text)} />
          {errorUser.name && <ThemedText className='text-red-500 pl-2 pt-1'>{errorUser.name}</ThemedText>}

        </View>
        <View>
          <ThemedText className="mb-2 text-sm font-medium">Email</ThemedText>
          <ThemedTextInput placeholder="Ingrese su email" type="normal" onChangeText={(text) => handleOnchangeValues('email', text)} />
          {errorUser.email && <ThemedText className='text-red-500 pl-2 pt-1'>{errorUser.email}</ThemedText>}
        </View>
        <View>
          <ThemedText className="mb-2 text-sm font-medium">Password</ThemedText>
          <ThemedTextInput placeholder="Ingrese su contraseña" type="normal" onChangeText={(text) => handleOnchangeValues('password', text)} />
          {errorUser.password && <ThemedText className='text-red-500 pl-2 pt-1'>{errorUser.password}</ThemedText>}
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
            <ThemedText className="text-indigo-500 dark:text-white text-[13px] font-semibold">
              {isLoading ? "Guardando..." : "Agregar"}
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={fadeOut}
            className="py-4 px-6 bg-red-50 dark:bg-dark-tertiary rounded-lg">
            <ThemedText className="text-red-500 text-[13px] font-semibold text-center dark:text-white"  >Cancelar</ThemedText>
          </TouchableOpacity>
        </View>

        {/* <FlatList
            data={data} // Datos para renderizar
            keyExtractor={(item, index) => index.toString()} // Clave única para cada elemento
            renderItem={renderItem} // Renderiza cada elemento
            onEndReached={() => fetchData()} // Cargar más datos al llegar al final
            onEndReachedThreshold={0.5} // Umbral para activar la carga
            ListFooterComponent={renderFooter} // Muestra el indicador de carga
          /> */}
        {/* </View> */}

      </Animated.View>

     
    </ThemedView>
  );
};

export default UsuarioDrawer;
