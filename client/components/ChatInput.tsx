import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Keyboard, Image, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '@/storage/authenticacion-staore';
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const ChatInput = () => {
    const navigation = useNavigation()
    const { estado } = useAuthStore((state) => state)
    const [message, setMessage] = React.useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleSend = () => {
        if (message.trim()) {
            if (estado === false) {
                navigation.navigate("auth")
            } else {
                console.log('Mensaje enviado:', message);
                setMessage('');
                Keyboard.dismiss();
            }
        }
    };

    const pickImageAsync = async () => {
        // Solicitar permisos
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Se necesitan permisos para acceder a la galería');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Corregido aquí
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setSelectedImage(result.assets[0].uri);
        }
    }


    return (
        <View
            className="bg-white pt-3 px-4 pb-5 border-t border-gray-200 w-full
                     dark:bg-slate-800 dark:border-gray-700
                     shadow-lg shadow-gray-300/50 dark:shadow-gray-900/50"
        >
            {/* Mostrar imagen seleccionada */}
            {selectedImage && (
                <View style={styles.imagePreviewContainer}>
                    <Image 
                        source={{ uri: selectedImage }} 
                        style={styles.selectedImage} 
                    />
                    <TouchableOpacity 
                        style={styles.removeImageButton}
                        onPress={() => setSelectedImage(null)}
                    >
                        <MaterialIcons name="close" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            )}

            <View
                className="flex-row items-end bg-gray-100 rounded-2xl px-4 py-2 
                           dark:bg-gray-700
                           border border-gray-200 dark:border-gray-600
                           transition-all duration-200 focus-within:border-blue-400"
            >
                {/* Botón adjuntar - AHORA CON LA FUNCIÓN DE SELECCIÓN DE IMAGEN */}
                <TouchableOpacity 
                    className="mr-3 pb-1.5"
                    activeOpacity={0.7}
                    accessibilityLabel="Adjuntar archivo"
                    accessibilityRole="button"
                    onPress={pickImageAsync} // Añadido aquí
                >
                    <MaterialIcons
                        name="attach-file"
                        size={24}
                        color="#6b7280"
                        className="dark:text-gray-300"
                    />
                </TouchableOpacity>

                {/* Campo de texto */}
                <TextInput
                    className="flex-1 py-1 px-2 text-gray-800 dark:text-gray-100 max-h-32"
                    placeholder="Escribe un mensaje..."
                    placeholderTextColor="#9ca3af"
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    scrollEnabled
                    textAlignVertical="center"
                    style={{ fontSize: 16, lineHeight: 20 }}
                    accessibilityLabel="Campo de texto para mensaje"
                />

                {/* Botón emojis */}
                {!message && (
                    <TouchableOpacity 
                        className="mx-3 pb-1.5"
                        activeOpacity={0.7}
                        accessibilityLabel="Abrir emojis"
                    >
                        <FontAwesome
                            name="smile-o"
                            size={24}
                            color="#6b7280"
                            className="dark:text-gray-300"
                        />
                    </TouchableOpacity>
                )}

                {/* Botón enviar/microfono */}
                <TouchableOpacity 
                    className={`p-2 rounded-full ml-2 ${message ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                    activeOpacity={0.8}
                    onPress={handleSend}
                    accessibilityLabel={message ? "Enviar mensaje" : "Grabar audio"}
                >
                    {message ? (
                        <MaterialCommunityIcons
                            name="send"
                            size={20}
                            color="white"
                        />
                    ) : (
                        <FontAwesome
                            name="microphone"
                            size={20}
                            color={message ? 'white' : '#6b7280'}
                            className="dark:text-gray-300"
                        />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imagePreviewContainer: {
        position: 'relative',
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    selectedImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
    },
    removeImageButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
        padding: 3,
    }
});

export default ChatInput;