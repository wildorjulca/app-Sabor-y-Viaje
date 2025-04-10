import { create } from "zustand"




interface State {
    estado : boolean
}


export const useAuthStore = create<State>((set,get) => ({
    estado: false
}))