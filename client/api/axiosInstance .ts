import axios from 'axios'


export const axiosInstance  = axios.create({
    baseURL: "http://192.168.229.245:3030/api",
    withCredentials: true
})
