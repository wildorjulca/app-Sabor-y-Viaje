// import { lugaresTuristicosCusco } from "@/data/lugaresTuristicos";
import { BackendError, getLugaresTuristicos } from "@/api/services/lugaresTuristicos";
import { LugaresTuristicoPorRegionType, LugareTuristicoType } from "@/interface/lugaresTuristicos";
import { AxiosError } from "axios";
import { create } from 'zustand';

interface State {

    dataLugarTuristico: LugaresTuristicoPorRegionType[]; // Definimos el tipo de datos
    fetchFiltroRegion: (cod_region: number) => void,
    loadingFiltroRegion: boolean,
    error: BackendError | null,

}

const useLugarTuristicoStore = create<State>((set, get) => ({
    loadingFiltroRegion: false,
    error: null,
    dataLugarTuristico: [],
    fetchFiltroRegion: async (cod_region: number):Promise<void> => {
        set({loadingFiltroRegion: true, dataLugarTuristico: []})
        try {
            const resoponse = await getLugaresTuristicos(cod_region)
            if(resoponse.data.length>0){
                setTimeout(() => {
                set({dataLugarTuristico: resoponse.data, loadingFiltroRegion:false, error: null })
                }, 2000);
            }
        } catch (error) {
             const err = error as AxiosError<BackendError>;
             console.log(err)
        }
    }
}));

export default useLugarTuristicoStore;
