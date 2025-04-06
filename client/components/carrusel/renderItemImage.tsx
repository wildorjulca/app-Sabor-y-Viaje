

import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'

const renderItemImage = ({ item }) => {
    const { width: screenWidth } = Dimensions.get('window');
    return (
        <View style={{
            width: screenWidth - 40,
            height: 300,
            borderRadius: 15,
            overflow: 'hidden',
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        }}>
            <Image
                source={{ uri: item }}
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
            />
        </View>
    );
};

export default renderItemImage