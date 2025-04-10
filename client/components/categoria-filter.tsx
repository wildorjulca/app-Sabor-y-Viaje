import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import useLugarTuristicoStore from '@/storage/lugar-turisticos-store';

const categories = [
    {
        id: 1,
        name: 'Playa',
        icon: 'umbrella-outline' // Alternativa: 'water-outline'
    },
    {
        id: 2,
        name: 'Montaña',
        icon: 'terrain-outline' // Alternativa: 'mountain-outline'
    },
    {
        id: 3,
        name: 'Arqueológico',
        icon: 'time-outline' // Alternativa: 'archive-outline'
    },
    {
        id: 4,
        name: 'Ciudad',
        icon: 'business-outline' // Alternativa: 'city-outline' (si está disponible)
    },
    {
        id: 5,
        name: 'Aventura',
        icon: 'bicycle-outline' // Alternativa: 'rocket-outline'
    }
];

const CategoryFilters = () => {

    const { fechFiltroByCategoria, dataLugarTuristico } = useLugarTuristicoStore()
    const [selectedId, setSelectedId] = useState(1);

    return (
        <View className="bg-white dark:bg-gray-800 pt-[20px] pb-[20px] shadow-md">
            <Text className="text-lg font-bold text-gray-800 dark:text-gray-200 px-5 mb-3">
                Filtrar por categoría
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="px-5"
                contentContainerStyle={{ alignItems: 'center' }}
            >

                {categories.map((category) => {
                    const isActive = selectedId === category.id;
                    return (
                        <TouchableOpacity
                            key={category.id}
                            onPress={() => {
                                fechFiltroByCategoria(dataLugarTuristico[0].idRegion, category.id)
                                setSelectedId(category.id)
                            }}
                            className={`flex-row items-center justify-center mr-3 px-6 py-[15px] rounded-full ${isActive
                                ? 'bg-blue-600 dark:bg-blue-500'
                                : 'bg-gray-100 dark:bg-gray-700'
                                }`}
                            style={{ minWidth: 90 }}
                        >
                            <Ionicons
                                name={category.icon}
                                size={16}
                                color={isActive ? 'white' : '#4b5563'}
                                className="mr-2"
                            />
                            <Text
                                className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                                    }`}
                            >
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default CategoryFilters;