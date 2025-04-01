import React, { useState, useRef } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';
import { useNavigation } from '@react-navigation/native';
import PeruDestinationCard from '@/components/PeruDestinationCard';
import { StyleSheet } from 'react-native';

import FeaturedDestinationCard, { PropsPlace } from '@/components/FeaturedDestinationCard ';
import { lugaresTuristicosChachapoyas, lugaresTuristicosCusco } from '@/data/lugaresTuristicos';
import useLugarTuristicoStore from '@/storage/lugar-turisticos-store';
import { router } from 'expo-router';


const MachuPicchuScreen = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  const dataLugarTuristico = useLugarTuristicoStore((state) => state.dataLugarTuristico)

  // Lugares de destino
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
  const lugares: PropsPlace[] = [
    {
      id: 1,
      titulo: "Machu Picchu",
      ubicacion: "Cusco, Perú",
      calificacion: 4.9,
      actividades: ["Trekking"],
      duracion: "Full day",
      precio: "$50+",
      imagenLocal: require('../../../assets/images/machuPicchu/OIP (25).jpg'),
      enlaceMapa: "https://www.google.com/maps/place/Machu+Picchu/@-13.1630672,-72.5451289,17z/data=!3m1!4b1!4m6!3m5!1s0x916d9a5f89555555:0x3a10370ea4a01a27!8m2!3d-13.1630672!4d-72.5451289!16zL20vMDZfbnkx?entry=ttu",
    },
    {
      id: 2,
      titulo: "Machu Picchu",
      ubicacion: "Cusco, Perú",
      calificacion: 4.9,
      actividades: ["Trekking"],
      duracion: "Full day",
      precio: "$50+",
      imagenLocal: require('../../../assets/images/machuPicchu/OIP (24).jpg'),
      enlaceMapa: "https://www.google.com/maps/place/Machu+Picchu/@-13.1630672,-72.5451289,17z/data=!3m1!4b1!4m6!3m5!1s0x916d9a5f89555555:0x3a10370ea4a01a27!8m2!3d-13.1630672!4d-72.5451289!16zL20vMDZfbnkx?entry=ttu",
    },
    {
      id: 3,
      titulo: "Tarapoto",
      ubicacion: "San Martín, Perú",
      calificacion: 4.7,
      actividades: ["Exploración de cascadas", "Avistamiento de aves"],
      duracion: "3 días",
      precio: "$150+",
      imagenLocal: require('../../../assets/images/tarapoto-lettering-bello-horizonte-san-martin-peru-256484943.webp'), // Asegúrate de tener esta imagen en la ruta especificada
      enlaceMapa: "https://www.google.com/maps/place/Tarapoto,+San+Martín,+Perú/@-6.4824785,-76.3737805,12z/data=!3m1!4b1!4m6!3m5!1s0x91e3ef5a7df53d1d:0xf55dc2e973bd7a44!8m2!3d-6.486667!4d-76.373056!16s%2Fm%2F01z3h3_",
    }

  ];


  // Estados y referencias
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Manejar la animación de fade para el input
  const handleScroll = (event) => {
    const currentPosition = event.nativeEvent.contentOffset.y;
    Animated.timing(fadeAnim, {
      toValue: currentPosition > 100 ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const place = {
    id: 1,
    title: "Machu Picchu",
    location: "Cusco, Perú",
    rating: "4.9",
    price: "75",
    image: require('../../../assets/images/machuPicchu/OIP (25).jpg') // Ajusta la ruta
  };

  const obtenerLugaresTuristicos = (id: number) => {
    return lugaresTuristicosCusco.filter((item) => item.codRegion === id);


  }
  console.log(obtenerLugaresTuristicos(1))

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
          data={lugares}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item }) => (
            <FeaturedDestinationCard  {...item} />
          )}

        />

        {/* card item */}
        <View className="flex-row flex-wrap justify-between mt-7 px-5">
          {lugaresTuristicosChachapoyas.map(item => (
            <TouchableOpacity
              key={item.id}
              className="w-[48%] mb-4"
              activeOpacity={0.9}
              onPress={() => navigation.navigate('informationLugarTuristico', { id: 1 })}
            >
              <View className="bg-white dark:bg-gray-800  rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Sección de imagen con título superpuesto */}
                <View className="h-40 w-full relative">
                  <Image
                    source={require('../../../assets/images/machuPicchu/OIP (25).jpg')}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  <View className="absolute top-2 left-2 bg-black/60 px-3 py-1 rounded-full">
                    <Text className="text-white text-xs font-semibold">
                      {item.Nombre}
                    </Text>
                  </View>
                </View>

                {/* Sección de texto */}
                <View className="p-3">
                  <ThemedText className="mt-1" numberOfLines={3}>
                    {item.Descripcion}
                  </ThemedText>
                  <View className="flex-row items-center mt-3 justify-between">
                    <Text className="text-green-600 font-bold text-lg">
                      ${item.PrecioEntrada}
                    </Text>
                    <Text className="text-gray-400 text-xs">/persona</Text>
                  </View>
                  <Text className="text-xs text-gray-500 mt-2">
                    ⏰ {item.HorarioApertura}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Botón de Búsqueda Flotante */}
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
