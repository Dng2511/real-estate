import axios from "axios"
import { apiUrl } from "../utils/connect"

export const Http = axios.create({
    baseURL: apiUrl,
})
