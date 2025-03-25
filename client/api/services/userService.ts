import { UserType } from "@/interface/user"
import { axiosInstance } from "../axiosInstance "
import axios from "axios";
import { Axios } from "axios";



interface NewUsuarioResponse {
    mensaje: string;
    success?: boolean;
    status: number;
    errors?: any
}
export const createUser = async(user: UserType) : Promise<NewUsuarioResponse>=>{
    try {
        const response = await axiosInstance.post<NewUsuarioResponse>('/postUsuario',user )
        return response.data
        // console.log(response)
    } catch (error) {

        // if(axios.isAxiosError(error)){
        //    if(error.)
            
        // }
    }

}
