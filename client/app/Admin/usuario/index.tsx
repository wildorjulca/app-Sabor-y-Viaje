import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ThemedView from '@/presentation/shared/ThemedView'
import ThemedText from '@/presentation/shared/ThemedText'
import ThemedTextInput from '@/presentation/shared/ThemedTextInput '

const UsuarioDrawer = () => {
  return (
    <ThemedView className='px-3 gap-3'>
      <View>
        <ThemedText className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'>Nombres</ThemedText>
        <ThemedTextInput placeholder='Ingrese su nombre' type='normal' />
      </View>
      <View>
        <ThemedText className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'>Email</ThemedText>
        <ThemedTextInput placeholder='Ingrese su email' type='normal' />
      </View>
      <View>
        <ThemedText className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'>Password</ThemedText>
        <ThemedTextInput placeholder='Ingrese su email' type='normal' />
      </View>
      <View>
        <ThemedText className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'>Foto Perfill</ThemedText>
        <ThemedTextInput placeholder='Ingrese su email' type='normal' />
      </View>
      <View className='flex-row justify-end gap-4 relative top-4'>
        <TouchableOpacity className='py-[14px] px-6 
         bg-indigo-50 
         dark:bg-dark-primary  rounded-lg cursor-pointer  shadow-xs transition-all duration-500 hover:bg-indigo-100'>
          <Text className='text-indigo-500 dark:text-white  text-[13px] font-semibold text-center'>Agregar</Text>
        </TouchableOpacity>
        <TouchableOpacity className='py-[14px] px-6  bg-red-50 dark:bg-dark-tertiary  rounded-lg cursor-pointer  shadow-xs transition-all duration-500 hover:bg-indigo-100'>
          <Text className='text-red-500 text-[13px] font-semibold text-center dark:text-white '>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  )
}

export default UsuarioDrawer  