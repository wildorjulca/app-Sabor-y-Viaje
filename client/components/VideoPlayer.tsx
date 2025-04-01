// components/VideoModal.tsx
import React, { useRef, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useVideoStore } from '@/storage/modal-video';
import { useThemeColor } from '@/hooks/useThemeColor';

const { width } = Dimensions.get('window');

const VideoModal = () => {
  const videoRef = useRef<Video>(null);
  const { isVisible, videoUrl, videoInfo, hideVideo } = useVideoStore();
  const themeColor = useThemeColor({}, 'background')

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.playAsync();
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      transparent={false}
      animationType="slide"
      onRequestClose={hideVideo}
    >
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        {/* Header */}
        <View style={{
          padding: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.8)'
        }}>
          <TouchableOpacity onPress={hideVideo}>
            <Text style={{ color: 'white', fontSize: 18 }}>✕</Text>
          </TouchableOpacity>

          <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
            {videoInfo?.title || 'Reproductor'}
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* Video Player - Contenedor con dimensiones fijas */}
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black'
        }}>
          <Video
            ref={videoRef}
            source={{ uri: videoUrl }} // Usa videoUrl del store
            style={{
              width: width * 0.9, // 90% del ancho de pantalla
              height: width * 0.5, // Relación de aspecto 16:9 aprox
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={isVisible}
            isLooping
          />
        </View>

        {/* Info adicional */}
        {videoInfo?.description && (
          <View style={{ padding: 16, backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <Text style={{ color: 'white' }}>{videoInfo.description}</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default VideoModal;