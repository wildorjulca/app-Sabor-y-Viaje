import React from 'react';
import { View, Animated, Easing } from 'react-native';

const ItemLugarTuristico = () => {
  const pulseAnim = React.useRef(new Animated.Value(0.4)).current;

  React.useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: pulseAnim,
        width: '48%',
        marginBottom: 16
      }}
    >
      {/* Contenedor principal */}
      <View className="bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden">
        {/* Imagen */}
        <View className="h-40 w-full bg-gray-300 dark:bg-gray-600" />

        {/* Contenido */}
        <View className="p-3">
          <View className="h-5 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
          <View className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded mb-1" />
          <View className="h-4 w-5/6 bg-gray-300 dark:bg-gray-600 rounded mb-1" />
          <View className="h-4 w-2/3 bg-gray-300 dark:bg-gray-600 rounded mb-3" />

          {/* Precio y horario */}
          <View className="flex-row justify-between items-center">
            <View className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
            <View className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const SkeletonLugarTuristicoItem = () => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {[...Array(6)].map((_, index) => (
          <ItemLugarTuristico key={`skeleton-item-${index}`} />
        ))}
      </View>
    </View>
  );
};

export default SkeletonLugarTuristicoItem;