// Define el objeto inicial de errores
export let initialErrorUser = {
    "name": "",
    "email": "",
    "password": "",
};

// Interfaz para los elementos que llegan del backend
export interface ErrorItemusario {
    location: string; // La ubicación del error (e.g., "body")
    msg: string; // El mensaje de error asociado
    path: string; // Cambiado a string para ser compatible
    type: string; // Tipo de error (e.g., "field")
    value: string; // Valor actual del campo que generó el error
}

// Función de validación que procesa los errores
export const validacionUsuario = (errors: ErrorItemusario[] | undefined) => {

    if (errors) {
        // Clona el objeto inicial de errores para no mutarlo
        const EsquemaUsuario = { ...initialErrorUser };

        // Itera sobre los errores y asigna el mensaje al campo correspondiente
        errors.forEach(({ path, msg }) => {
            if (path in EsquemaUsuario) {
                EsquemaUsuario[path as keyof typeof EsquemaUsuario] = msg;
            }
        });
        return { error: EsquemaUsuario };

    }


    // Retorna el objeto de errores y un estado HTTP simulado
    // return { error: EsquemaUsuario, status: 400 };

};