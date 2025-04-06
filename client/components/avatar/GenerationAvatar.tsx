import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Función para generar el avatar
const  generarAvatar =(nombre:string)=> {
  const colores = [
    "#9f1e26", "#5b2eb0", "#5733FF", "#FF33A8",
    "#33A8FF", "#3b3a37", "#617406", "#067466",
  ];

  const colorFondo = colores[Math.floor(Math.random() * colores.length)];
  const palabras = nombre.split(" ");
  const iniciales = palabras
    .map((palabra) => palabra.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return {
    iniciales,
    colorFondo,
  };
}

// Componente Avatar
export const Avatar = ({ nombre }) => {
  const { iniciales, colorFondo } = generarAvatar(nombre);

  return (
    <View className="justify-center items-center w-[40px] h-[40px] rounded-full" style={ { backgroundColor: colorFondo }}>
      <Text className="text-[#f8f2f2] text-[18px] font-bold" style={styles.iniciales}>{iniciales}</Text>
    </View>
  );
};
// Estilos
const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },

});
export default Avatar