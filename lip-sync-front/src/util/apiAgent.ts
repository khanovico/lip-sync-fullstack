import axios from "axios";
import { APIBASEURL } from "./constant";

const api = axios.create({
    baseURL: APIBASEURL
});

export const endpoints = {
    // Generate
    generate: (formData: FormData) => api.post('generate/', formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'blob'
        }
    ),
}
