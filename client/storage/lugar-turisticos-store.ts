import { lugaresTuristicosCusco } from "@/data/lugaresTuristicos";
import { LugareTuristicoType } from "@/interface/lugaresTuristicos";
import { create } from 'zustand';

interface State {
    dataLugarTuristico: LugareTuristicoType[]; // Definimos el tipo de datos
}

const useLugarTuristicoStore = create<State>((set, get) => ({
    dataLugarTuristico:lugaresTuristicosCusco ,
}));

export default useLugarTuristicoStore;
