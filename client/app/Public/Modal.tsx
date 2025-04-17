import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';
import { StyleSheet, Text, View } from 'react-native';

export default function Modalscreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText className=''>Modalscreen screen

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel velit tempora quia rem consectetur ab quibusdam? Voluptatem optio cum fuga quos quam sit quasi dignissimos, quibusdam vitae architecto cupiditate qui.
            </ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
       
    },
});
