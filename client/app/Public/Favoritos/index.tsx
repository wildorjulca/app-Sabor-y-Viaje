import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';
import { useNavigation } from '@react-navigation/native';
import { useThemeColor } from '@/hooks/useThemeColor';

const FavoritosTbas = () => {
  const themeBgColor = useThemeColor({}, 'background')
  
  // Datos de ejemplo mejorados
  const favoritos = [
    {
      id: '1',
      nombre: 'Machu Picchu',
      imagen: 'https://incaperutravel.com/wp-content/uploads/Manu-Amazon-National-Park-4-Days-6-scaled.jpg',
      descripcion: 'La majestuosa ciudadela inca del siglo XV, considerada una de las 7 maravillas del mundo moderno. Ubicada a 2,430 metros sobre el nivel del mar.',
      precio: 150,
      rating: 4.8,
      reviews: 1245,
      ubicacion: 'Cusco, Perú',
      duracion: '1 día',
      dificultad: 'Moderada',
      incluye: ['Guía profesional', 'Transporte', 'Almuerzo buffet']
    },
    {
      id: '2',
      nombre: 'Laguna Humantay',
      imagen: 'https://cdn.getyourguide.com/img/location/5e4d45885cbd2-wide.jpeg/88.jpg',
      descripcion: 'Laguna glaciar de impresionantes aguas turquesas ubicada a 4,200 metros de altitud. Rodeada de imponentes montañas nevadas.',
      precio: 80,
      rating: 4.7,
      reviews: 892,
      ubicacion: 'Cusco, Perú',
      duracion: '1 día',
      dificultad: 'Alta',
      incluye: ['Guía bilingüe', 'Desayuno', 'Trekking poles']
    },
  ];

  const handleVerDetalle = (item) => {
    // navigation.navigate('DetalleLugar', { lugar: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => handleVerDetalle(item)}
      activeOpacity={0.9}
    >
      <View className="bg-white h-[170px] dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg shadow-black/20 mb-4 mx-4 border border-gray-100 dark:border-gray-700">
            <View className="flex-row h-full">
              {/* Sección de imagen (40% del ancho) */}
              <View className="w-[40%] relative">
                <Image
                  source={{ uri: item.imagen }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute top-0 left-0 bg-gradient-to-b from-black/40 to-transparent w-full p-2">
                  <Text className="text-white text-xs font-medium">{item.ubicacion}</Text>
                </View>
                <View className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded-full">
                  <Text className="text-white text-xs">{item.duracion}</Text>
                </View>
              </View>

              {/* Sección de información (60% del ancho) */}
              <View className="w-[60%] p-4 flex justify-between">
                <View>
                  <View className="flex-row justify-between items-start mb-2">
                    <ThemedText className="text-lg font-bold text-gray-900 dark:text-white" numberOfLines={1}>
                      {item.nombre}
                    </ThemedText>
                    <View className="bg-blue-500 px-3 py-1 rounded-lg shadow">
                      <Text className="text-white font-bold text-sm">${item.precio}</Text>
                    </View>
                  </View>

                  <View className="flex-row items-center mb-2">
                    <View className="flex-row items-center mr-3">
                      <Ionicons name="star" size={16} color="#F59E0B" />
                      <Text className="text-gray-700 dark:text-gray-300 text-sm ml-1">
                        {item.rating}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="people-outline" size={16} color="#6B7280" />
                      <Text className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                        {item.reviews.toLocaleString()}
                      </Text>
                    </View>
                  </View>

                  <ThemedText className="text-gray-600 dark:text-gray-300 text-xs mb-3" numberOfLines={3}>
                    {item.descripcion}
                  </ThemedText>
                </View>

                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <Ionicons name="walk-outline" size={16} color="#6B7280" />
                    <Text className="text-gray-500 dark:text-gray-400 text-xs ml-1">
                      {item.dificultad}
                    </Text>
                  </View>
                  
                  <TouchableOpacity 
                    className="bg-blue-500 dark:bg-blue-600 px-4 py-2 rounded-lg flex-row items-center shadow-sm"
                    onPress={(e) => {
                      e.stopPropagation();
                      handleVerDetalle(item);
                    }}
                  >
                    <Text className="text-white font-medium text-sm">Ver más</Text>
                    <Ionicons name="chevron-forward" size={16} color="white" className="ml-1" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: themeBgColor}}>
      <ThemedView className='flex-1 relative top-[40px]'>
        {/* Header mejorado */}
        <View className="flex-row justify-between items-center px-6 mb-4">
          <ThemedText className="text-2xl font-bold text-gray-900 dark:text-white">
            Mis Favoritos ❤️
          </ThemedText>
          <View className="flex-row space-x-3">
            <TouchableOpacity className="bg-white dark:bg-gray-700 p-2 rounded-full shadow-sm">
              <Ionicons name="search-outline" size={20} color="#3B82F6" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white dark:bg-gray-700 p-2 rounded-full shadow-sm">
              <Ionicons name="filter-outline" size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Lista de favoritos */}
        {favoritos.length > 0 ? (
          <FlatList
            data={favoritos}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="flex-1 justify-center items-center px-8">
            <View className="bg-gray-100 dark:bg-gray-700 p-6 rounded-full mb-6">
              <Ionicons name="heart-dislike" size={48} color="#9CA3AF" />
            </View>
            <ThemedText className="text-xl text-gray-700 dark:text-gray-300 mb-2 text-center font-bold">
              Tus favoritos están vacíos
            </ThemedText>
            <ThemedText className="text-gray-500 dark:text-gray-400 text-sm text-center mb-8 max-w-[280px]">
              Guarda tus lugares preferidos haciendo clic en el corazón para encontrarlos fácilmente
            </ThemedText>
            <TouchableOpacity 
              className="bg-blue-500 dark:bg-blue-600 px-8 py-3 rounded-xl shadow-md"
            >
              <Text className="text-white font-medium text-lg">Explorar lugares</Text>
            </TouchableOpacity>
          </View>
        )}
      </ThemedView>
    </SafeAreaView>
  );
};

export default FavoritosTbas;