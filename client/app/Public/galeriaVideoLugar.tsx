import { View, Text, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import React, { useRef, useState } from 'react';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedText from '@/presentation/shared/ThemedText';
import { EvilIcons, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';

const { width } = Dimensions.get('window');

const GaleriaVideoLugar = () => {
  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Datos de ejemplo con múltiples videos
  const videosData = [
    {
      id: '1',
      title: "Machu Picchu - Maravilla del Mundo",
      description: "Vistas impresionantes de la ciudadela inca durante el amanecer. Un espectáculo natural que no te puedes perder.",
      views: "125.4K",
      likes: "8.2K",
      publishDate: "15/05/2023",
      user: {
        name: "Aventuras Perú",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      videoUri: require("../../assets/video02.mp4"),
      thumbnail: require("../../assets/images/machuPicchu/OIP (24).jpg"),
      tipo: "ciudadela"
    },
    {
      id: '2',
      title: "Caminata a Huayna Picchu",
      description: "Experiencia única desde la cima con vistas panorámicas de todo el valle sagrado de los incas.",
      views: "89.2K",
      likes: "5.7K",
      publishDate: "22/06/2023",
      user: {
        name: "Explorando Perú",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      videoUri: require("../../assets/video.mp4"),
      thumbnail: require("../../assets/images/machuPicchu/OIP (26).jpg"),
      tipo: "caminata"
    },
  ];

  const handlePlayPause = async () => {
    if (isPlaying) {
      await videoRef.current?.pauseAsync();
    } else {
      await videoRef.current?.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const playVideo = async (index) => {
    if (isPlaying) {
      await videoRef.current?.pauseAsync();
      setIsPlaying(false);
    }
    
    setCurrentVideoIndex(index);
    
    setTimeout(async () => {
      try {
        await videoRef.current?.playAsync();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error al reproducir el video:", error);
      }
    }, 100);
  };

  return (
    <ThemedView className='flex-1 bg-gray-50'>
      {/* Reproductor de Video Principal */}
      <View className='w-full bg-black relative' style={{ height: width * 0.5625 }}>
        <Video
          ref={videoRef}
          source={videosData[currentVideoIndex].videoUri}
          resizeMode={ResizeMode.COVER}
          shouldPlay={false}
          isLooping
          style={{ 
            width: '100%', 
            height: '100%',
            backgroundColor: 'transparent'
          }}
          useNativeControls={false}
        />
        
        {/* Controles y vista previa */}
        <TouchableOpacity 
          onPress={handlePlayPause}
          className='absolute inset-0 justify-center items-center'
          activeOpacity={0.8}
        >
          {!isPlaying && (
            <>
              <Image 
                source={videosData[currentVideoIndex].thumbnail}
                style={{ 
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="cover"
              />
              <View className='absolute inset-0 bg-black/30' />
              <Ionicons name="play-circle" size={60} color="white" opacity={0.9} />
            </>
          )}
        </TouchableOpacity>

        {/* Duración y botón fullscreen */}
        <View className='absolute bottom-3 left-3 bg-black/70 px-2 py-1 rounded-full'>
          <Text className='text-white text-xs'>2:45 / 5:32</Text>
        </View>
        <TouchableOpacity className='absolute bottom-3 right-3 bg-black/70 p-2 rounded-full'>
          <MaterialIcons name="fullscreen" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Información del video actual */}
      <View className='p-4'>
        <View className='flex-row justify-between items-start mb-3'>
          <ThemedText className='text-xl font-bold flex-1 pr-2 text-gray-900'>
            {videosData[currentVideoIndex].title}
          </ThemedText>
        </View>

        {/* Mostrar solo si es de caminata */}
        {videosData[currentVideoIndex].tipo === "caminata" && (
          <ThemedText className='text-gray-700 mb-4 text-sm leading-5'>
            {videosData[currentVideoIndex].description}
          </ThemedText>
        )}

        <View className='flex-row items-center justify-between mb-4'>
          <View className='flex-row items-center gap-3'>
            <Image 
              source={{ uri: videosData[currentVideoIndex].user.avatar }}
              className='w-12 h-12 rounded-full border border-gray-200'
            />
            <View>
              <ThemedText className='font-medium text-gray-800'>
                {videosData[currentVideoIndex].user.name}
              </ThemedText>
              <Text className='text-gray-500 text-xs'>
                Publicado el {videosData[currentVideoIndex].publishDate}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Lista de videos sugeridos */}
      <ThemedView className='px-4 pt-2 pb-6 '>
        <ThemedText className='text-lg font-bold mb-3 text-gray-800'>Más videos para ti</ThemedText>
        <FlatList
          data={videosData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity 
              onPress={() => playVideo(index)}
              className='mr-4'
              style={{ width: width * 0.55 }}
            >
              <View className='bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm'>
                <View className='bg-black' style={{ height: width * 0.3 }}>
                  <Image 
                    source={item.thumbnail} 
                    className='w-full h-full'
                    resizeMode="cover"
                  />
                  <View className='absolute inset-0 justify-center items-center'>
                    <Ionicons name="play-circle" size={40} color="white" opacity={0.9} />
                  </View>
                </View>
                <View className='p-3'>
                  <ThemedText className='font-medium text-gray-900' numberOfLines={2}>
                    {item.title}
                  </ThemedText>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ThemedView>
    </ThemedView>
  );
};

export default GaleriaVideoLugar;