import { View, Image, ActivityIndicator, StyleProp, ImageStyle } from 'react-native';
import React, { useState } from 'react';

interface Props {
    className?: string;
    style?: StyleProp<ImageStyle>;
    uri: string;
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

const FadeImage = ({ className, style, uri, resizeMode = 'cover' }: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <View style={[{ position: 'relative' }]}>
            {isLoading && (
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />

                </View>
            )}

            {hasError ? (
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
                    {/* You can replace this with your own error placeholder component */}
                    <ActivityIndicator />
                </View>
            ) : (
                <Image
                    style={[{ width: '100%', height: '100%' }, style]}
                    source={{ uri }}
                    resizeMode={resizeMode}
                    onLoadStart={() => setIsLoading(true)}
                    onLoadEnd={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false);
                        setHasError(true);
                    }}
                />
            )}
        </View>
    );
};

export default FadeImage;