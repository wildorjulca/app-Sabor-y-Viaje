import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { LugaresTuristicoPorRegionType } from '@/interface/lugaresTuristicos'
import ThemedText from '@/presentation/shared/ThemedText'
import { obtenerImagenPrincipal } from '@/utils/obtenerImagenPrincipal'
import { useNavigation } from 'expo-router'
import ThemedView from '@/presentation/shared/ThemedView'
import { Ionicons } from '@expo/vector-icons'



interface Props {
    placeLugar: LugaresTuristicoPorRegionType
}
const ItemLugarTuristico = ({ placeLugar }: Props) => {
    const [loading, setloading] = useState(true)
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            key={placeLugar.id}
            className="w-[48%] mb-4"
            activeOpacity={0.9}
            onPress={() => navigation.navigate('informationLugarTuristico', { id: 1 })}
        >
            <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Sección de imagen */}
                <View className="h-40 w-full relative">
                    {/* {loading && (

                        <ActivityIndicator className='absolute z-10 top-10  left-10 justify-center items-center' size={'large'} color="#00ff00" />
                    )} */}
                    {placeLugar.Imagenes ? (
                        <Image
                            source={obtenerImagenPrincipal(placeLugar)}
                            className="w-full h-full"
                            resizeMode="cover"
                            defaultSource={require('../assets/default-place.jpg')}
                            onLoadEnd={() => {
                                setTimeout(() => {
                                    setloading(false);
                                }, 1000); // Reducido a 1 segundo para mejor experiencia
                            }}
                        />
                    ) : (
                        <ThemedView className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                            <View className="flex items-center justify-center p-8 rounded-full bg-gray-200 dark:bg-gray-600">
                                <Ionicons
                                    name="image-outline"
                                    size={48}
                                    className="text-gray-400 dark:text-gray-300"
                                />
                            </View>
                        </ThemedView>
                    )}

                    {/* <FadeImgTuristico 
                    uri={}
                      
                    /> */}
                    <View className="absolute top-2 left-2 bg-black/60 px-3 py-1 rounded-full">
                        <Text className="text-white text-xs font-semibold">
                            {placeLugar.Nombre}
                        </Text>
                    </View>
                </View>

                {/* Sección de texto */}
                <View className="p-3">
                    <ThemedText className="mt-1" numberOfLines={3}>
                        {placeLugar.Descripcion}
                    </ThemedText>
                    <View className="flex-row items-center mt-3 justify-between">
                        <Text className="text-green-600 font-bold text-lg">
                            ${placeLugar.PrecioEntrada || '0'}
                        </Text>
                        <Text className="text-gray-400 text-xs">/persona</Text>
                    </View>
                    <Text className="text-xs text-gray-500 mt-2">
                        ⏰ {placeLugar.HorarioApertura || 'No especificado'}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemLugarTuristico