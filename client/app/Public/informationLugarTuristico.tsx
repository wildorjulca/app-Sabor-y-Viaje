import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Image } from 'react-native';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import VideoModal from '@/components/VideoPlayer';
import ThemedView from '@/presentation/shared/ThemedView';
import Carousel from 'react-native-reanimated-carousel';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useInformationTuristicoStore } from '@/storage/information-lugar-store';
import { LugarDetalle } from '@/interface/lugaresTuristicos';
import ThemedText from '@/presentation/shared/ThemedText';
import Avatar from '@/components/avatar/GenerationAvatar';
import ChatInput from '@/components/ChatInput';
import LottieView from 'lottie-react-native';
import NoHayComentarios from '@/components/comments/NoHayComentarios';

const imagenes = [
  'https://img.freepik.com/free-photo/tourist-carrying-baggage_23-2151747383.jpg?t=st=1743692777~exp=1743696377~hmac=53fc6e51bc7b4308c84fe5d3515583a36be16fae51f10fc6c271c9e5e3959746&w=1380',
  'https://media.istockphoto.com/id/1339071089/photo/machu-picchu-inca-ruins.jpg?s=1024x1024&w=is&k=20&c=P6nxdbVl6_efPDX4vCoGzF7vy7rTveItHuFqd0dD65w=',
  'https://th.bing.com/th/id/OIP.-mPuP_ZoyXOf_9z7jIY6EwHaDN?rs=1&pid=ImgDetMain',
  'https://img.freepik.com/free-photo/tourist-carrying-luggage_23-2151747456.jpg?t=st=1743693029~exp=1743696629~hmac=3e3c5950337a51198a4e42ec33577eae7acb4513e4449d468b0a31d31fb8115e&w=1380'
];

type Props = {
  route: {
    params: {
      id: number;
    };
  };
};

const InformationLugarTuristico = ({ route }: Props) => {
  const { informacionLugar, loading, error, fetchLugares } = useInformationTuristicoStore();

  const id = Number(route.params.id);

  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(false);
  const snapPoints = ['80%'];
  const { width: screenWidth } = Dimensions.get('window');
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const openGallery = () => {
    setIsOpen(true);
    sheetRef.current?.expand();
  };

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.5}
    />
  );

  useEffect(() => {
    fetchLugares(id);
  }, [id, fetchLugares]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: loading ? "Cargando..." : (informacionLugar?.sitio?.[0]?.NombreLugar || "Lugar Turístico"),
      headerRight: () => (
        <View className='flex-row pl-[5px] items-center gap-[2px]'>
          <EvilIcons name="share-google" size={40} color="#007aff" />
          <EvilIcons name="heart" size={40} color="#007aff" />
          <TouchableOpacity >
            <EvilIcons name="sc-youtube" size={40} color="#007aff" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [loading, informacionLugar?.sitio?.[0]?.NombreLugar, navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LottieView
          source={require('../../assets/loading.json')}
          autoPlay
          loop
          style={{ width: 500, height: 500 }}
        />
      </View>
    );
  }

  if (error) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Error al cargar los datos: {error.message}</ThemedText>
      </ThemedView>
    );
  }

  if (!informacionLugar || !informacionLugar.sitio || informacionLugar.sitio.length === 0) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>No se encontraron datos para este lugar turístico</ThemedText>
      </ThemedView>
    );
  }

  const lugar = informacionLugar.sitio[0];
  const comentarios = informacionLugar.comentarios

  return (
    <>
      <ThemedView style={{ position: "relative" }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {/* Carrusel */}
          <View>
            <Carousel
              width={screenWidth}
              height={300}
              data={imagenes}
              renderItem={({ item }) => (
                <View style={{ flex: 1 }}>
                  <Image
                    source={{ uri: item }}
                    style={styles.image}
                  />
                </View>
              )}
              autoPlayInterval={3000}
              onSnapToItem={(index) => setActiveIndex(index)}
            />

            <View className='absolute bottom-[10px] flex-row self-center'>
              {imagenes.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    index === activeIndex ? styles.activeDot : styles.inactiveDot
                  ]}
                />
              ))}
            </View>

            <TouchableOpacity
              className='absolute bottom-3 right-3 z-10'
              onPress={openGallery}
            >
              <View className='bg-[#000000d8] flex-row gap-2 items-center px-3 py-2 rounded-lg'>
                <Ionicons size={19} name='image' color={'#fff'} />
                <Text className='text-white text-[14px]'>Galería</Text>
              </View>
            </TouchableOpacity>
          </View>


          {/* Opiniones */}
          <ThemedView className="w-full px-4 py-6 relative">
            {informacionLugar.comentarios && informacionLugar.comentarios.length > 0 ? (
              informacionLugar.comentarios.map((item) => (
                <ThemedView
                  key={item.IdComentario}
                  className="mb-8 pb-6 pl-6 pr-6 bg-white shadow-xl rounded-xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                >
                  <View className="flex-row items-start gap-4 mb-4 relative top-2">
                    <View className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center overflow-hidden shadow-inner">
                      {item.FotoPerfil ? (
                        <Avatar nombre={item.Usuario} />
                      ) : (
                        <Text className="text-2xl font-bold text-white">
                          {item.Usuario.charAt(0).toUpperCase()}
                        </Text>
                      )}
                    </View>

                    <View className="flex-1">
                      <View className="flex-row justify-between items-baseline">
                        <ThemedText className="text-lg font-semibold text-gray-900 dark:text-white">
                          {item.Usuario}
                        </ThemedText>
                        <ThemedText className="text-xs text-gray-400 dark:text-gray-400">
                          {new Date(item.FechaComentario).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </ThemedText>
                      </View>

                      <View className="flex-row items-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Ionicons
                            key={star}
                            name={item.Valoracion ? (star <= item.Valoracion ? 'star' : 'star-outline') : 'star-outline'}
                            size={18}
                            color={item.Valoracion ? (star <= item.Valoracion ? '#F59E0B' : '#D1D5DB') : '#D1D5DB'}
                          />
                        ))}
                        {item.Valoracion && (
                          <ThemedText className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                            {item.Valoracion}.0
                          </ThemedText>
                        )}
                      </View>
                    </View>
                  </View>

                  <ThemedText className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mt-4">
                    {item.Comentario}
                  </ThemedText>

                  {imagenes.length > 0 && (
                    <View className="mt-4">
                      <View className="flex-row flex-wrap gap-2">
                        {imagenes.slice(0, 3).map((img, index) => (
                          <TouchableOpacity
                            key={index}
                            className="relative"
                            activeOpacity={0.8}
                          >
                            <Image
                              source={{ uri: img }}
                              className="w-24 h-24 rounded-lg object-cover"
                              resizeMode="cover"
                            />
                            {index === 2 && imagenes.length > 3 && (
                              <View className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                <ThemedText className="text-white font-bold text-lg">
                                  +{imagenes.length - 3}
                                </ThemedText>
                              </View>
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>

                      {imagenes.length > 3 && (
                        <TouchableOpacity className="mt-2">
                          <ThemedText className="text-primary-500 dark:text-primary-400 text-sm font-medium">
                            Ver todas las fotos ({imagenes.length})
                          </ThemedText>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}

                  <View className="flex-row justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <View className="flex-row items-center space-x-2">
                      <TouchableOpacity
                        className="flex-row items-center px-3 py-1.5 rounded-full bg-rose-50 dark:bg-gray-700"
                        activeOpacity={0.7}
                      >
                        <Ionicons name="heart-outline" size={16} color="#f43f5e" />
                        <ThemedText className="ml-1.5 text-sm font-bold text-rose-500 dark:text-gray-300">
                          12
                        </ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity
                        className="flex-row items-center px-3 py-1.5 rounded-full bg-blue-50 dark:bg-gray-700"
                        activeOpacity={0.7}
                      >
                        <Ionicons name="chatbubble-outline" size={16} color="#3b82f6" />
                        <ThemedText className="ml-1.5 text-sm font-bold text-[#3b82f6] dark:text-gray-300">
                          Responder
                        </ThemedText>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      className="p-1.5 rounded-full bg-blue-100 dark:bg-gray-700"
                      activeOpacity={0.7}
                    >
                      <Ionicons name="share-social-outline" size={16} color="#3b82f6" />
                    </TouchableOpacity>
                  </View>
                </ThemedView>
              ))
            ) : (
             <NoHayComentarios />
            )}
          </ThemedView>
        </ScrollView>

        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          onClose={() => setIsOpen(false)}
          backdropComponent={renderBackdrop}
          backgroundStyle={{ backgroundColor: '#fff', borderRadius: 20 }}
          handleIndicatorStyle={{ backgroundColor: '#9ca3af', width: 40, height: 5 }}
        >
          <BottomSheetView className="px-6 pb-6 z-50">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-800">Galería Multimedia</Text>
              <TouchableOpacity onPress={() => { setIsOpen(false) }}>
                <Ionicons name="close" size={30} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <View className="flex-row border-b border-gray-200 pb-3 mb-4">
              <TouchableOpacity className="mr-6">
                <Text className="font-semibold text-blue-500 border-b-2 border-blue-500 pb-2">
                  Fotos Oficiales ({imagenes.length})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="font-semibold text-gray-500">Fotos de Usuarios (345)</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row flex-wrap justify-between">
              {informacionLugar.imagenes?.map((img, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-[48%] mb-4 rounded-xl overflow-hidden shadow-sm"
                  onPress={() => {
                    setIsOpen(false);
                    setActiveIndex(index);
                  }}
                  activeOpacity={0.7}
                >
                  <Image
                    source={{ uri: img.Imagen }}
                    className="w-full h-40 rounded-xl"
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </BottomSheetView>
        </BottomSheet>
      </ThemedView>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 80, zIndex: 1000 }}>
        <ChatInput />
      </View>
    </>
  );
};

export default InformationLugarTuristico;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'relative'
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    marginHorizontal: 4
  },
  activeDot: {
    backgroundColor: '#FFF',
    width: 9,
    height: 9,
    borderRadius: 50
  },
  inactiveDot: {
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flex: 1
  },
  galleryItem: {
    width: '48%',
    marginBottom: 10
  },
  galleryImage: {
    width: '100%',
    height: 150,
    borderRadius: 8
  }
});