import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Image } from 'react-native'
import { AntDesign, EvilIcons, Ionicons } from '@expo/vector-icons'
import { Avatar } from 'react-native-paper'
import { useNavigation } from 'expo-router'
import VideoPlayer from '@/components/VideoPlayer'
import VideoModal from '@/components/VideoPlayer'
import { useVideoStore } from '@/storage/modal-video'
import ThemedView from '@/presentation/shared/ThemedView'
const comentariosUsuarios = [
  {
    nombreCompleto: "María Fernández",
    comentario: "El lugar es absolutamente maravilloso. Cada rincón está lleno de historia y las vistas son simplemente impresionantes. Recomiendo a todos visitar al amanecer, ya que los colores del paisaje son inolvidables. Además, la atención del personal es excelente y las guías turísticas están muy bien informadas.",
    fecha: 12,
    mes: "Marzo",
    año: 2025,
  },
  {
    nombreCompleto: "Luis Pérez",
    comentario: "Una experiencia única en su tipo. Me encantó la riqueza cultural del lugar, pero sentí que podría haber más señalización en ciertas áreas para facilitar el recorrido. De todas formas, es un sitio espectacular que te deja asombrado por su belleza y significado histórico.",
    fecha: 8,
    mes: "Enero",
    año: 2025,
  },
  {
    nombreCompleto: "Ana Gómez",
    comentario: "La visita fue espectacular. La guía turística que nos acompañó conocía cada detalle del lugar y nos brindó una explicación fascinante. Además, la vista desde los puntos altos del sitio es increíble. Sin embargo, me gustaría que el acceso para personas mayores fuera más sencillo.",
    fecha: 15,
    mes: "Febrero",
    año: 2025,
  },
  {
    nombreCompleto: "Carlos Martínez",
    comentario: "Me encantó todo. Desde los impresionantes paisajes hasta la atmósfera mágica del lugar, fue una experiencia inolvidable. Lo único que diría es que había demasiada gente en algunas zonas, lo que hacía difícil disfrutar completamente del entorno.",
    fecha: 20,
    mes: "Diciembre",
    año: 2024,
  },
]

const imagenes = [
  'https://th.bing.com/th/id/OIP.-mPuP_ZoyXOf_9z7jIY6EwHaDN?rs=1&pid=ImgDetMain',
  'https://th.bing.com/th/id/OIP.-mPuP_ZoyXOf_9z7jIY6EwHaDN?rs=1&pid=ImgDetMain',
  'https://th.bing.com/th/id/OIP.-mPuP_ZoyXOf_9z7jIY6EwHaDN?rs=1&pid=ImgDetMain',
  'https://th.bing.com/th/id/OIP.-mPuP_ZoyXOf_9z7jIY6EwHaDN?rs=1&pid=ImgDetMain'
]
const InformationLugarTuristico = ({ route }) => {
  const navigation = useNavigation()
  const id = route.params.id

  const { showVideo} = useVideoStore();

  const playVideo = () => {
    showVideo(
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // URL de ejemplo
      {
        title: "Título profesional del video",
        description: "Esta es una descripción detallada del contenido del video que puede tener múltiples líneas y ofrecer contexto adicional al usuario.",
        duration: 125 // en segundos (opcional)
      }
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Nombre del sitio",
      headerRight: () => (
        <View className='flex-row pl-[5px] items-center gap-[2px]'>
          <View>
            <EvilIcons name="share-google" size={40} color="#007aff" />
          </View>
          <View className='relative top-[-1px]'>
            <EvilIcons name="heart" size={40} color={"#007aff"} />

          </View>
          <TouchableOpacity
          onPress={playVideo}
          >
            <EvilIcons name="sc-youtube" size={40} color="#007aff" />
          </TouchableOpacity>
        </View>

      ),
    })

  }, [])
  return (
    <ThemedView>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View className='pb-[40px] relative'>
          <View className="flex flex-row gap-[8px]">
            <View className="w-1/2">
              <Image
                source={{ uri: "https://th.bing.com/th/id/OIP.-mPuP_ZoyXOf_9z7jIY6EwHaDN?rs=1&pid=ImgDetMain" }}
                className="w-full h-96"
                resizeMode="cover"
              />
            </View>

            <View className="w-1/2 flex flex-col gap-[8px]">
              {imagenes.slice(2, 4).map((imagen, index) => (
                <View key={index} className="flex-1">
                  <Image
                    source={{ uri: 'https://th.bing.com/th/id/OIP.-mPuP_ZoyXOf_9z7jIY6EwHaDN?rs=1&pid=ImgDetMain' }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              ))}
            </View>
          </View>
          {/* Comentarios de usuarios */}
          {/* <View className="bg-white px-3 relative top-[20px]">
            {comentariosUsuarios.map((item, index) => (
              <View
                key={index}
                className="w-full mb-4 pb-4 border-b border-gray-300"
              >
                <View className="flex-row justify-between items-center mb-2">
                  <View className="flex-row items-center space-x-4"> 
                    <Avatar nombre={item.nombreCompleto} />
                    <View className='pl-[8px]'>
                      <Text className="font-bold text-gray-800 text-lg">
                        {item.nombreCompleto}
                      </Text>
                      <Text className="text-gray-500">
                        {`${item.fecha}-${item.mes}-${item.año} (Reserva Verificada)`}
                      </Text>
                    </View>
                  </View>
                  <AntDesign className='font-bold' name="ellipsis1" size={30} color="black" />
                </View>
                <Text className="text-gray-700 text-base font-semibold"
                  numberOfLines={3}
                >
                  {item.comentario}
                </Text>
              </View>
            ))}
          </View> */}
        </View>
      </ScrollView>
      <VideoModal />
    </ThemedView>
  )
}

export default InformationLugarTuristico