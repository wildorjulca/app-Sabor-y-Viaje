import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Dimensions,
  Animated,
  Easing,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';
import { useNavigation } from '@react-navigation/native';
import PeruDestinationCard from '@/components/PeruDestinationCard';
import { StyleSheet } from 'react-native';

import { lugaresTuristicosChachapoyas, lugaresTuristicosCusco } from '@/data/lugaresTuristicos';
// import useLugarTuristicoStore from '@/storage/lugar-turisticos-store';
import { router } from 'expo-router';
import { useRegiones } from '@/hooks/hooks/regiones/useRegiones';
import FeaturedDestinationCard from '@/components/FeaturedDestinationCard ';
import { useLugaresTuristico } from '@/hooks/hooks/regiones/uselugaresTuristicos';
import { obtenerImagenPrincipal } from '@/utils/obtenerImagenPrincipal';
import ItemLugarTuristico from '@/components/itemLugarTuristico';
import useLugarTuristicoStore from '@/storage/lugar-turisticos-store';
import SkeletonLugarTuristicoItem from '@/components/Skeletons/SkeletonLugarTuristicoItem';


const MachuPicchuScreen = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  const { data, error, loading } = useRegiones()
  // const { dataTuristicos, errorTuristico, loadingTuristico } = useLugaresTuristico()
  const { dataLugarTuristico, fetchFiltroRegion, loadingFiltroRegion } = useLugarTuristicoStore()

  const lugaresPeru = [
    {
      id: 1,
      titulo: 'Machu Picchu',
      descripcion: '"Machu Picchu, conocida como la ciudadela inca más famosa del mundo, es un majestuoso complejo arqueológico situado en lo alto de las montañas de los Andes peruanos, a más de 2,400 metros sobre el nivel del mar.',
      imagen: 'https://api.a0.dev/assets/image?text=ancient+machu+picchu+ruins+golden+hour+dramatic+landscape+professional+photography&aspect=16:9',
    },
    {
      id: 2,
      titulo: 'Líneas de Nazca',
      descripcion: 'Misteriosos geoglifos grabados en el desierto entre los años 500 a.C. y 500 d.C. Son visibles solo desde el aire.',
      imagen: 'https://api.a0.dev/assets/image?text=nazca+lines+aerial+view+desert+geometric+patterns+ancient+mysterious&aspect=16:9',
    },
    {
      id: 3,
      titulo: 'Laguna Huacachina',
      descripcion: 'Oasis en medio del desierto de Ica, perfecto para sandboarding y paseos en buggies.',
      imagen: 'https://api.a0.dev/assets/image?text=desert+oasis+sand+dunes+palm+trees+lake+sunset&aspect=16:9',
    },
    {
      id: 4,
      titulo: 'Montaña de 7 Colores',
      descripcion: 'Formación montañosa con franjas de colores naturales por minerales, ubicada a 5,200 msnm en Cusco.',
      imagen: 'https://api.a0.dev/assets/image?text=rainbow+mountain+peru+vinicunca+colorful+stripes+dramatic+landscape&aspect=16:9',
    },
  ];

  // Estados y referencias
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Manejar la animación de fade para el input
  const handleScroll = (event: any) => {
    const currentPosition = event.nativeEvent.contentOffset.y;
    Animated.timing(fadeAnim, {
      toValue: currentPosition > 100 ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const [cod_region, setCodRegion] = useState(1)
  const handleRegionChange = useCallback((id: number) => {
    setCodRegion(id);
  }, []);

  // Efecto para cargar datos
  useEffect(() => {
    fetchFiltroRegion(cod_region);
  }, [cod_region, fetchFiltroRegion]);





  return (
    <ThemedView className="flex-1">
      {/* Input Sticky con animación */}
      <Animated.View
        className="absolute top-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 p-6 shadow-md"
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-60, 0],
              }),
            },
          ],
        }}
      >
        <TextInput
          onPress={() => navigation.navigate('searchStack')}
          className="bg-gray-100 dark:bg-slate-700 rounded-full px-5 py-3 text-base"
          placeholder="Buscar..."
          placeholderTextColor="#999"
        />
      </Animated.View>


      <ScrollView
        scrollEventThrottle={16}
        onScroll={handleScroll}
        className="flex-1"
      >
        {/* Sección del Carrusel de Tarjetas */}
        <View className="w-full" style={{ height: 310 }}>
          <Carousel
            loop
            width={width}
            height={310}
            data={lugaresPeru}
            // autoPlay
            autoPlayInterval={4000}
            onSnapToItem={(index) => setCurrentCardIndex(index)}
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <PeruDestinationCard
                  titulo={item.titulo}
                  descripcion={item.descripcion}
                  imagen={item.imagen}
                  onPress={() => console.log(`Selected: ${item.titulo}`)}
                />
              </View>
            )}
          />

          {/* Indicadores del Carrusel */}
          <View className="absolute bottom-5 w-full flex-row justify-center items-center">
            {lugaresPeru.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${currentCardIndex === index ? 'bg-green-500 scale-125' : 'bg-gray-300'
                  }`}
              />
            ))}
          </View>
        </View>

        <View className="p-6">
          <ThemedText className="text-2xl font-bold text-gray-800 mb-2">
            Explora Machu Picchu
          </ThemedText>
          <ThemedText className="text-base text-gray-600">
            Descubre la maravilla inca en lo alto de los Andes peruanos. Este santuario histórico ofrece vistas impresionantes y una rica historia cultural.
          </ThemedText>

        </View>

        {/* Seccion de las tarjetas del lugares */}
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item }) => (
            <FeaturedDestinationCard region={item}
              active={item.id === cod_region}
              onPress={(id) => { handleRegionChange(id) }}
            />

          )}

        />
        {loadingFiltroRegion &&
          (
            <View style={{ flex: 1, padding: 20 }}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {[...Array(6)].map((_, index) => (
                  <SkeletonLugarTuristicoItem key={`skeleton-${index}`} />
                ))}
              </View>
            </View>
          )
        }
        <FlatList
          data={dataLugarTuristico}
          numColumns={2} // Esto hace que se muestren 2 columnas
          columnWrapperStyle={{ justifyContent: 'space-between' }} // Espacio entre columnas
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }} // Padding general
          renderItem={({ item }) => (
            <ItemLugarTuristico placeLugar={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
        // onEndReached={}
        // onEndReachedThreshold={}
        // ListFooterComponent={() => (
        //   <ActivityIndicator size={40} />
        // )}
        />


      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-10 right-6 bg-blue-500 p-4 rounded-full shadow-lg"
        onPress={() => navigation.navigate('searchStack')}
      >
        <Ionicons name="chatbox-ellipses" size={24} color="white" />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
  },
});

export default MachuPicchuScreen;
