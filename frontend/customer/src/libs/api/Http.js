
import axios from "axios";
const BASE_API = process.env.BASE_API

export const Http = axios.create({
    baseURL: "http://localhost:8000/api/v1",
})