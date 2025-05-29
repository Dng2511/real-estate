import axios from "axios"

export const Http = axios.create({
    baseURL: "http://localhost:8000/api/v1",
})