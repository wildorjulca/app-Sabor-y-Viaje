import { View, Text, Image, TouchableOpacity, Linking, ImageSourcePropType } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '@/presentation/shared/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

export interface PropsPlace {
    id: number;
    titulo: string;
    ubicacion: string;
    calificacion?: number;
    actividades?: string[];
    duracion: string;
    precio: string;
    imagenLocal: ImageSourcePropType | undefined;
    enlaceMapa?: string
}


const FeaturedDestinationCard = (place: PropsPlace) => {
    return (
        <View className="items-center space-y-3 bg-white dark:bg-gray-800 pt-0 pb-5 rounded-2xl shadow-lg w-64 overflow-hidden mr-4">
            {/* Contenedor de imagen con overflow hidden */}
            <View className="relative w-full h-40 rounded-xl overflow-hidden">
                <Image
                    className="w-full h-full"
                    source={place.imagenLocal}
                    resizeMode="cover"
                />

                {/* Badge de ubicación interactivo */}
                <TouchableOpacity
                    className=" absolute z-10 bottom-2 right-2 bg-white/90 dark:bg-gray-800/90 flex-row items-center px-3 py-1.5 rounded-full shadow-sm"
                    onPress={() =>
                        Linking.openURL('https://www.google.com/maps/place/Machu+Picchu/@-13.1630672,-72.5451289,17z/data=!3m1!4b1!4m6!3m5!1s0x916d9a5f89555555:0x3a10370ea4a01a27!8m2!3d-13.1630672!4d-72.5451289!16zL20vMDZfbnkx?entry=ttu')
                    }
                >
                    <Ionicons name="map" size={16} color="#3B82F6" />
                    <Text className="text-blue-500 dark:text-blue-400 ml-1 text-xs font-medium">
                        Ver mapa
                    </Text>
                </TouchableOpacity>

                {/* Overlay de gradiente - ahora correctamente contenido */}
                <View className="absolute bottom-0 w-full h-1/3">
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)']}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            </View>

            {/* Resto del contenido permanece igual */}
            <View className="w-full pl-3 pr-3 pt-3">
                <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                        <ThemedText
                            type="semi-bold"
                            className="text-xl text-gray-900 dark:text-white"
                        >
                            {place.titulo}
                        </ThemedText>
                        <View className="flex-row items-center mt-1">
                            <Ionicons name="location-sharp" size={14} color="#6B7280" />
                            <ThemedText
                                className="text-gray-600 dark:text-gray-300 ml-1 text-sm"
                            >
                                Cusco, Perú
                            </ThemedText>
                        </View>
                    </View>

                    <View className="bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded flex-row items-center">
                        <Ionicons name="star" size={14} color="#F59E0B" />
                        <Text className="text-amber-800 dark:text-amber-500 ml-1 text-sm font-bold">
                            {place.calificacion}
                        </Text>
                    </View>
                </View>

                <View className="border-b border-gray-100 dark:border-gray-700 my-3" />

                <View className="flex-row justify-between">
                    <View className="flex-row items-center">
                        <Ionicons name="walk" size={16} color="#10B981" />
                        <Text className="text-gray-600 dark:text-gray-400 ml-2 text-xs">
                            Trekking
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                        <Ionicons name="time" size={16} color="#3B82F6" />
                        <Text className="text-gray-600 dark:text-gray-400 ml-2 text-xs">
                            Full day
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                        <Ionicons name="cash" size={16} color="#8B5CF6" />
                        <Text className="text-gray-600 dark:text-gray-400 ml-2 text-xs">
                            $50+
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default FeaturedDestinationCard 