import { View, Text, Image, ImageProps } from 'react-native'
import React from 'react'
import { obtenerImagenPrincipal } from '@/utils/obtenerImagenPrincipal'

interface Props {
    uri: any[],

}
const FadeImgTuristico = ({ uri }: Props) => {
    
    return (
        <Image
            source={obtenerImagenPrincipal(uri)}
            defaultSource={require('./../../assets/default-place.jpg')}
            className="w-full h-full"
            resizeMode="cover"
        />
    )
}

export default FadeImgTuristico