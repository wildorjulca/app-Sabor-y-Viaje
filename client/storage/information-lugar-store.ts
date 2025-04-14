import { create } from 'zustand';
import { AxiosError } from 'axios';
import { BackendError, getInformationLugarTuristico } from '@/api/services/informationTuristico';
import { Comentario, ImagenLugar, LugarDetalle } from '@/interface/lugaresTuristicos';


interface Store {
    informacionLugar: {
        sitio: LugarDetalle[],
        imagenes: ImagenLugar[],
        comentarios?: Comentario[]
    };
    loading: boolean;
    error: BackendError | null;
    fetchLugares: (id: number) => Promise<void>;
    clearPlaceData: () => void;
}

export const useInformationTuristicoStore = create<Store>((set) => ({
    informacionLugar: { sitio: [], imagenes: [] },
    loading: false,
    error: null,

    fetchLugares: async (id: number) => {
        set({ loading: true, error: null });
        try {
            const data = await getInformationLugarTuristico(id);
            setTimeout(() => {
                set({ informacionLugar: { sitio: data.lugar, imagenes: data.imagenes, comentarios: data.comentarios }, loading: false });
            }, 1000);
        } catch (error) {
            const err = error as AxiosError<BackendError>;
            set({
                error: {
                    message: err.response?.data?.message || err.message,
                    status: err.response?.status || 500,
                    success: false,
                    errors: err.response?.data?.errors || []
                },
                loading: false
            });
        }
    },

    clearPlaceData: () => set({ informacionLugar: { imagenes: [], sitio: [] }, error: null }),
}));