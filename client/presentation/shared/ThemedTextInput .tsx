import { TextInput, TextInputProps, useColorScheme } from 'react-native';
import React from 'react';

type InputType = 'normal' | 'outlined' | 'filled';

interface Props extends TextInputProps {
    className?: string;
    type?: InputType;
}

const ThemedTextInput = ({ className, type = 'normal', ...rest }: Props) => {
    const colorScheme = useColorScheme(); // Detecta el tema actual

    return (
        <TextInput
            placeholderTextColor={colorScheme === 'dark' ? '#fff' : '#aaa'} // Asigna el color según el tema
            className={[
                'w-full rounded-lg text-base',
                'bg-white dark:bg-[#1a1b1f] text-gray-900 dark:text-gray-100', // Fondo y texto base
                // Estilos según el tipo
                type === 'normal'
                    ? 'border border-gray-300 dark:border-[#4362ee] shadow-sm focus:ring focus:ring-[#4362ee] dark:focus:ring-[#81a1c1]'
                    : '',
                type === 'outlined'
                    ? 'border-2 border-blue-500 dark:border-blue-400 bg-transparent focus:ring focus:ring-blue-300 dark:focus:ring-blue-500'
                    : '',
                type === 'filled'
                    ? 'bg-blue-100 dark:bg-blue-800 border border-blue-300 dark:border-blue-600 focus:ring focus:ring-blue-200 dark:focus:ring-blue-500'
                    : '',
                className,
            ].join(' ')}
            {...rest}
        />
    );
};

export default ThemedTextInput;
