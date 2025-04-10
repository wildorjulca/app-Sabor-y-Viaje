// import { lugaresTuristicosCusco } from "@/data/lugaresTuristicos";
import { BackendError, getFiltroByCategoria, getLugaresTuristicos } from "@/api/services/lugaresTuristicos";
import { LugaresTuristicoPorRegionType, LugareTuristicoType } from "@/interface/lugaresTuristicos";
import { AxiosError } from "axios";
import { create } from 'zustand';

interface State {

    dataLugarTuristico: LugaresTuristicoPorRegionType[]; // Definimos el tipo de datos
    fetchFiltroRegion: (cod_region: number) => void,
    fechFiltroByCategoria: (idRegion: number, codCategoria: number) => void,

    loadingFiltroRegion: boolean,
    loadingFiltroByCategoria: boolean,
    error: BackendError | null,
}

const useLugarTuristicoStore = create<State>((set, get) => ({
    loadingFiltroRegion: false,
    loadingFiltroByCategoria: false,
    error: null,
    dataLugarTuristico: [],
    fetchFiltroRegion: async (cod_region: number): Promise<void> => {
        set({ loadingFiltroRegion: true, dataLugarTuristico: [] })
        try {
            const resoponse = await getLugaresTuristicos(cod_region)
            if (resoponse.data.length > 0) {
                setTimeout(() => {
                    set({ dataLugarTuristico: resoponse.data, loadingFiltroRegion: false, error: null })
                }, 1000);
            }
        } catch (error) {
            const err = error as AxiosError<BackendError>;
            console.log(err)
        }
    },
    fechFiltroByCategoria: async (idRegion: number, codCategoria: number) => {
        try {
            const response  = await getFiltroByCategoria(idRegion, codCategoria)
            if(response.data){
                set({ dataLugarTuristico: response.data, loadingFiltroByCategoria: false, error: null })
            }
            
        } catch (error) {
            const err = error as AxiosError<BackendError>;
            console.log(err)
            
        }

    }
}));

export default useLugarTuristicoStore;
