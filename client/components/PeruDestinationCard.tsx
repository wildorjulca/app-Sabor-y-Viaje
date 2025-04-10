import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useFonts } from 'expo-font';

// import {} from 

const widthFull= Dimensions.get('window').width;
// const CARD_WIDTH = width *;

interface DestinationProps {
  titulo: string;
  descripcion: string;
  imagen: string;
  onPress?: () => void;
}

export default function PeruDestinationCard({ titulo, descripcion, imagen, onPress }: DestinationProps) {
  return (
    <Pressable onPress={onPress} style={styles.cardContainer}>
      <View style={styles.card}>
        <Image
          source={{ uri: imagen }}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(23, 230, 51, 0.35)']}
          style={styles.gradient}
        >
          <Text className='relative  text-white text-[30px] font-WorkSans-SemiBold'>{titulo}</Text>
          <Text className='text-white'  numberOfLines={2}>
            {descripcion}
          </Text>
        </LinearGradient>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: widthFull,
    height: 300,
    // marginVertical: 10,
    // alignSelf: 'center',
  },
  card: {
    flex: 1,
    // borderRadius: 15,
    // overflow: 'hidden',
    // backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    padding: 20,
    // justifyContent: 'flex-end',
  },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 30,
//   },
//   description: {
//     fontSize: 14,
//     color: '#fff',
//     lineHeight: 20,
//   },
});