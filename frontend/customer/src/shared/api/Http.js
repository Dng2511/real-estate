import axios from "axios"
import { apiUrl } from "../utils/connect"

export const Http = axios.create({
    baseURL: apiUrl,
})

Http.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
