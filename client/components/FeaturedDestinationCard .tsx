import { View, Text, TouchableOpacity, Linking, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import ThemedText from '@/presentation/shared/ThemedText'
import { LinearGradient } from 'expo-linear-gradient'
import { RegionType } from '@/interface/regiones'
import FadeImage from './image/fade-image'
import useLugarTuristicoStore from '@/storage/lugar-turisticos-store'

interface Props {
    region: RegionType
    active?: boolean
    onPress: (cod_region: number) => void
}

const FeaturedDestinationCard = ({ region, active, onPress }: Props) => {


 
    const handleMapPress = () => {
        Linking.openURL(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(region.Nombre)}`
        )
    }

    return (
        <Pressable
            onPress={() => onPress(region.id)}
            className={`items-center space-y-3 bg-white dark:bg-gray-800 pt-0 pb-5 rounded-2xl shadow-lg w-64 overflow-hidden mr-4 
        ${active ? 'border-2 border-blue-500 dark:border-blue-400' : 'border-2 border-transparent'}`}
        >
            {/* Contenedor de imagen */}
            <View className="relative w-full h-40 rounded-xl overflow-hidden">
                <FadeImage
                    className="w-full h-full"
                    uri={region.ImagenPortada}
                    resizeMode="cover"
                />

                {/* Badge de ubicación */}
                <TouchableOpacity
                    className="absolute z-10 bottom-2 right-2 bg-white/90 dark:bg-gray-800/90 flex-row items-center px-3 py-1.5 rounded-full shadow-sm"
                    onPress={handleMapPress}
                >
                    <Ionicons name="map" size={16} color="#3B82F6" />
                    <Text className="text-blue-500 dark:text-blue-400 ml-1 text-xs font-medium">
                        Ver mapa
                    </Text>
                </TouchableOpacity>

                {/* Overlay de gradiente */}
                <View className="absolute bottom-0 w-full h-1/3">
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)']}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            </View>

            {/* Contenido */}
            <View className="w-full px-3 pt-3">
                <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                        <ThemedText
                            type="semi-bold"
                            className="text-xl text-gray-900 dark:text-white"
                        >
                            {region.Nombre}
                        </ThemedText>
                        <View className="flex-row items-center mt-1">
                            <Ionicons name="location-sharp" size={14} color="#6B7280" />
                            <ThemedText className="text-gray-600 dark:text-gray-300 ml-1 text-sm">
                                {region.Nombre}
                            </ThemedText>
                        </View>
                    </View>

                    <View className="bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded flex-row items-center">
                        <Ionicons name="star" size={14} color="#F59E0B" />
                        <Text className="text-amber-800 dark:text-amber-500 ml-1 text-sm font-bold">
                            4.3
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
        </Pressable>
    )
}

export default FeaturedDestinationCard