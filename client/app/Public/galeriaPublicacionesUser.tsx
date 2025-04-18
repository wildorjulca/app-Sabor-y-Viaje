import { useInformationTuristicoStore } from "@/storage/information-lugar-store";
import { NavigationProp } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

// Datos simulados de un solo usuario con sus historias
const usuario = {
    id: "1",
    nombre: "Carlos Martínez",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    historias: [
        {
            id: "1",
            uri: "https://images.pexels.com/photos/17836687/pexels-photo-17836687/free-photo-of-religion-catedral-catolico-urbano.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            fecha: "Hace 2 horas",
        },
        {
            id: "2",
            uri: "https://images.pexels.com/photos/17836687/pexels-photo-17836687/free-photo-of-religion-catedral-catolico-urbano.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            fecha: "Hace 1 hora",
        },
        {
            id: "3",
            uri: "https://img.freepik.com/premium-photo/man-standing-against-waterfall_1048944-14176690.jpg?w=740",
            fecha: "Hace 30 minutos",
        },
    ],
};



const HistoriasUsuario = ({ navigation }) => {

    const { informacionLugar } = useInformationTuristicoStore((state) => state)
    const [indiceHistoria, setIndiceHistoria] = useState(0);
    const [pausado, setPausado] = useState(false);
    const [progreso, setProgreso] = useState(0);

    const historiaActual = usuario.historias[indiceHistoria];
    let NombreUsuario = informacionLugar?.comentarios?.[0]?.Usuario || "User not found"
    let fecha = informacionLugar?.comentarios?.[0]?.FechaComentario || "No date"


    // Efecto para la barra de progreso
    useEffect(() => {
        if (pausado) return;

        const duracion = 5000; // 5 segundos por historia
        const intervalo = 50; // Actualización cada 50ms para suavidad
        let frame = 0;

        const intervaloProgreso = setInterval(() => {
            frame++;
            const tiempoTranscurrido = frame * intervalo;
            setProgreso(Math.min((tiempoTranscurrido / duracion) * 100, 100));

            if (tiempoTranscurrido >= duracion) {
                clearInterval(intervaloProgreso);
                siguienteHistoria();
            }
        }, intervalo);

        return () => clearInterval(intervaloProgreso);
    }, [indiceHistoria, pausado]);

    const siguienteHistoria = () => {
        if (indiceHistoria < usuario.historias.length - 1) {
            setIndiceHistoria(indiceHistoria + 1);
            setProgreso(0);
        } else {
            navigation.goBack();
        }
    };

    const historiaAnterior = () => {
        if (indiceHistoria > 0) {
            setIndiceHistoria(indiceHistoria - 1);
            setProgreso(0);
        }
    };

    const cerrarHistorias = () => {
        navigation.goBack();
    };

    return (
        <View className="flex-1 bg-black">
            {/* Imagen de la historia actual */}
            <View className="flex-1 justify-center items-center">
                <Image
                    source={{ uri: historiaActual.uri }}
                    style={{
                        width: width - 40, // Ancho uniforme con margen
                        height: width - 40, // Alto igual al ancho para una forma cuadrada
                    }}
                    resizeMode="cover" // Alternativa: 'contain' si prefieres que no se recorte nada
                />
            </View>

            {/* Overlay superior para mejor contraste */}
            <View className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/80 to-transparent z-10">
                {/* Información del usuario */}
                <View className="flex-row items-center mt-12 mx-4">
                    <Image
                        source={{ uri: usuario.avatar }}
                        className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <View className="ml-3">
                        <Text className="text-white font-bold text-lg">{NombreUsuario}</Text>
                        <Text className="text-white/80 text-sm">
                            {new Date(fecha).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </Text>
                    </View>
                </View>

                {/* Barras de progreso */}
                <View className="flex-row mt-4 mx-4">
                    {usuario.historias.map((_, index) => (
                        <View
                            key={index}
                            className="h-1.5 rounded-full mx-0.5 bg-gray-500/50 flex-1 overflow-hidden"
                        >
                            {index === indiceHistoria && (
                                <View
                                    className="h-full rounded-full bg-white"
                                    style={{ width: `${progreso}%` }}
                                />
                            )}
                            {index < indiceHistoria && (
                                <View className="h-full rounded-full bg-white w-full" />
                            )}
                        </View>
                    ))}
                </View>
            </View>

            {/* Controles de navegación (invisibles pero clickeables) */}
            <TouchableOpacity
                className="absolute left-0 w-1/2 h-full"
                onPress={historiaAnterior}
                onPressIn={() => setPausado(true)}
                onPressOut={() => setPausado(false)}
                activeOpacity={1}
            />
            <TouchableOpacity
                className="absolute right-0 w-1/2 h-full"
                onPress={siguienteHistoria}
                onPressIn={() => setPausado(true)}
                onPressOut={() => setPausado(false)}
                activeOpacity={1}
            />

            {/* Botón de cerrar */}
            <TouchableOpacity
                className="absolute top-12 right-5 w-10 h-10 justify-center items-center rounded-full z-20"
                onPress={cerrarHistorias}
            >
                <Text className="text-white font-bold text-xl">×</Text>
            </TouchableOpacity>

            {/* Contador de historias */}
            <View className="absolute bottom-10 left-0 right-0 items-center">
                <Text className="text-white/80 text-sm">
                    {indiceHistoria + 1}/{usuario.historias.length}
                </Text>
            </View>
        </View>
    );
};

export default HistoriasUsuario;
