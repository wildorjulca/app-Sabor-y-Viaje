import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Keyboard, Image, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '@/storage/authenticacion-staore';
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const ChatInput = () => {
    const navigation: any = useNavigation();
    const { isAuthenticated } = useAuthStore((state) => state);
    const [message, setMessage] = React.useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleSend = () => {
        if (message.trim()) {
            if (isAuthenticated === false) {
                navigation.navigate("auth");
            } else {
                console.log('Mensaje enviado:', message);
                setMessage('');
                Keyboard.dismiss();
            }
        }
    };

    const pickImageAsync = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Se necesitan permisos para acceder a la galería');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setSelectedImage(result.assets[0].uri);
        }
    };
    return (
        <View
            className=""
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
                className="flex-row  bg-gray-100 px-2 pt-5 pb-2 dark:bg-gray-900"
            >
                {/* Botón adjuntar */}
                <TouchableOpacity
                    className="mr-3 pb-1.5"
                    activeOpacity={0.7}
                    accessibilityLabel="Adjuntar archivo"
                    onPress={pickImageAsync}
                >
                    <MaterialIcons
                        name="attach-file"
                        size={24}
                        color="#6b7280"
                        className="dark:text-blue-700"
                    />
                </TouchableOpacity>

                {/* Campo de texto */}
                <TextInput
                    className="flex-1 py-[15px] shadow-2xl bg-white rounded-3xl px-2 text-gray-800 dark:text-gray-100 max-h-32 dark:bg-slate-800"
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
                    className={`p-2 rounded-full ml-2 ${message ? 'bg-blue-500' : 'bg-green-400 dark:bg-green-500'}`}
                    activeOpacity={0.8}
                    onPress={handleSend}
                >
                    {message ? (
                        <MaterialCommunityIcons
                            name="send"
                            size={20}
                            color="#fff"
                        />
                    ) : (
                        <FontAwesome
                            name="microphone"
                            size={20}
                            color={message ? 'white' : '#fff'}
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
