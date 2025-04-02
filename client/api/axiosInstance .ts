import axios from 'axios'


export const axiosInstance  = axios.create({
    baseURL: "http://192.168.123.245:3030/api",
    withCredentials: true
})