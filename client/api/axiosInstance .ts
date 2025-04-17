import axios from 'axios'


export const axiosInstance  = axios.create({
    baseURL: "http://192.168.17.245:3030/api",
    withCredentials: true
})
