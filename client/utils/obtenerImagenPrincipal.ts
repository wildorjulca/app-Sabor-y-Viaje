export const obtenerImagenPrincipal = (item: any) => {
    try {
      // Si el item tiene imágenes en formato JSON string
      if (item.Imagenes) {
        const imagenes = JSON.parse(item.Imagenes);
        if (Array.isArray(imagenes) && imagenes.length > 0) {
          // Buscar la imagen principal o tomar la primera
          const imagenPrincipal = imagenes.find(img => img.ImagenEsPrincipal) || imagenes[0];
          return { uri: imagenPrincipal.ImagenUrl };
        }
      }
      // Si no hay imágenes, devolver una por defecto
      return require('../assets/default-place.jpg');
    } catch (error) {
      console.error('Error al procesar imágenes:', error);
      return require('../assets/default-place.jpg');
    }
  };