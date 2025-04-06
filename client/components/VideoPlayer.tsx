// components/VideoPlayer.tsx
import React, { useRef, useEffect } from 'react';
import { Modal, View, TouchableOpacity, Dimensions, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const { width } = Dimensions.get('window');

const VideoModal = ({ visible, onClose, videoUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (visible && videoRef.current) {
      videoRef.current.playAsync();
    } else if (videoRef.current) {
      videoRef.current.pauseAsync();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Fondo oscuro semitransparente */}
      <View className="flex-1 bg-black/80 justify-center items-center">
        {/* Contenedor del video */}
        <View className="w-[90%] bg-black rounded-xl overflow-hidden">
          {/* Botón de cerrar */}
          <TouchableOpacity
            className="absolute top-3 right-3 z-10 bg-black/50 w-8 h-8 rounded-full justify-center items-center"
            onPress={onClose}
          >
            <Text className="text-white text-lg font-bold">✕</Text>
          </TouchableOpacity>

          {/* Reproductor de video */}
          <Video
            ref={videoRef}
            source={{ uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
            className="w-full aspect-video"
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={visible}
            isLooping
          />
        </View>
      </View>
    </Modal>
  );
};

export default VideoModal;