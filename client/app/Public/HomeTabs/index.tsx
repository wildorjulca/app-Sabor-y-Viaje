import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  Easing
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';
import { useNavigation } from '@react-navigation/native'; // Importar el hook de navegación

const MachuPicchuScreen = () => {
  const navigation = useNavigation(); // Obtener navigation del hook
  const { width } = Dimensions.get('window');
  const imageHeight = width * 0.75;
  
  // Datos del carrusel
  const carouselImages = [
    { id: 1, image: require('../../../assets/images/machuPicchu/OIP (25).jpg') },
    { id: 2, image: require('../../../assets/images/machuPicchu/OIP (24).jpg') },
    { id: 3, image: require('../../../assets/images/machuPicchu/descarga (5).jpg') },
    { id: 4, image: require('../../../assets/images/machuPicchu/OIP (26).jpg') },
  ];

  // Estados y referencias
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const lastScrollPosition = useRef(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Manejar el scroll con animación
  const handleScroll = (event) => {
    const currentPosition = event.nativeEvent.contentOffset.y;
    const isScrollingDown = currentPosition > lastScrollPosition.current;
    const shouldStick = currentPosition > 100 && isScrollingDown;
    
    Animated.timing(fadeAnim, {
      toValue: shouldStick ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
    
    lastScrollPosition.current = currentPosition;
  };

  return (
    <ThemedView className="flex-1 bg-gray-100">
      {/* Input Sticky con animación */}
      <Animated.View 
        className="absolute top-0 left-0 right-0 z-50 bg-white p-6 shadow-md"
        style={{
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-60, 0]
            })
          }]
        }}
      >
        <TextInput
        onPress={()=> {navigation.navigate('searchStack')}}
          className="bg-gray-100 rounded-full px-5 py-3 text-base relative top-3"
          placeholder="Buscar..."
          placeholderTextColor="#999"
        />
      </Animated.View>

      <ScrollView
        scrollEventThrottle={16}
        onScroll={handleScroll}
        className="flex-1"
      >
        {/* Sección del Carrusel */}
        <View className="w-full" style={{ height: imageHeight }}>
          {/* Botón de Menú */}
          <TouchableOpacity
            className="absolute top-10 left-5 bg-black/50 p-3 rounded-full z-10"
            onPress={() => console.log('Menú presionado')}
          >
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>

          {/* Carrusel de Imágenes */}
          <Carousel
            loop
            width={width}
            height={imageHeight}
            data={carouselImages}
            autoPlay
            autoPlayInterval={4000}
            onSnapToItem={(index) => setCurrentImageIndex(index)}
            renderItem={({ item }) => (
              <Image
                source={item.image}
                className="w-full h-full"
                resizeMode="cover"
              />
            )}
          />

          {/* Indicadores del Carrusel */}
          <View className="absolute bottom-5 w-full flex-row justify-center items-center">
            {carouselImages.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  currentImageIndex === index 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </View>
        </View>

        {/* Input de Búsqueda Normal (se desvanece) */}
        <Animated.View 
          className="p-3 bg-white"
          style={{
            opacity: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0]
            })
          }}
        >
          <TextInput
            className="bg-gray-100 rounded-full px-4 py-3 text-base"
            placeholder="Buscar..."
            placeholderTextColor="#999"
          />
        </Animated.View>

        {/* Contenido Informativo */}
        <View className="p-6">
          <ThemedText className="text-2xl font-bold text-gray-800 mb-2">
            Explore Machu Picchu
          </ThemedText>
          <ThemedText className="text-base text-gray-600">
            Descubre la maravilla inca en lo alto de los Andes peruanos. 
            Este santuario histórico ofrece vistas impresionantes y una 
            rica historia cultural.
          </ThemedText>
          
          {/* Espacio para hacer scroll */}
          <View className="h-[800px]" />
        </View>
      </ScrollView>

      {/* Botón de Búsqueda Flotante */}
      <TouchableOpacity
        className="absolute bottom-10 right-6 bg-blue-500 p-4 rounded-full shadow-lg"
        onPress={() => navigation.navigate('searchStack')}
      >
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>
    </ThemedView>
  );
};

export default MachuPicchuScreen;