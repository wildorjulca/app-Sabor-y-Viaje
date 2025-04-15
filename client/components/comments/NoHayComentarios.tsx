import { View} from 'react-native'
import React from 'react'
import ThemedView from '@/presentation/shared/ThemedView'
import { Ionicons } from '@expo/vector-icons'
import ThemedText from '@/presentation/shared/ThemedText'

const NoHayComentarios = () => {
    return (
        <ThemedView className="flex-1 relative top-[30px] items-center justify-center py-12 px-4 bg-white dark:bg-gray-800">
            <View className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Ionicons name="chatbox-ellipses-outline" size={40} color="#9CA3AF" />
            </View>
            <ThemedText className="text-xl font-semibold text-center text-gray-700 dark:text-gray-300 mb-2">
                No hay comentarios aún
            </ThemedText>
            <ThemedText className="text-center text-gray-500 dark:text-gray-400 mb-6 max-w-[280px]">
                Sé el primero en compartir tu experiencia sobre este lugar
            </ThemedText>
        </ThemedView>
    )
}

export default NoHayComentarios