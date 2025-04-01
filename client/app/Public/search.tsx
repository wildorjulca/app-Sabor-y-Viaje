// App.tsx
import VideoModal from '@/components/VideoPlayer';
import { useVideoStore } from '@/storage/modal-video';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const App = () => {
  const { showVideo } = useVideoStore();

  const openSampleVideo = () => {
    showVideo(
      'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      {
        title: 'Video de ejemplo',
        description: 'Este es un video de demostración para mostrar el reproductor.'
      }
    );
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-xl mb-6">Bienvenido a la App</Text>
      
      <TouchableOpacity
        onPress={openSampleVideo}
        className="bg-blue-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white">Reproducir Video</Text>
      </TouchableOpacity>
      
      {/* El modal debe estar en el nivel más alto de tu app */}
      <VideoModal />
    </View>
  );
};

export default App;