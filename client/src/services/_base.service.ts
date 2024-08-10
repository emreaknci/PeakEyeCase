
import axios from 'axios';
import StorageService from './storage.service';
import { toast } from 'react-toastify';
const base_url = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
    baseURL: `${base_url}`,
    headers: {
        "Content-type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Cache-Control": "no-cache"
    }
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = StorageService.getAccessToken();

        const bearerToken = token;

        config.headers.Authorization = `Bearer ${bearerToken}`;

        return config;
    },
    (error) => {
        console.log("InterceptorError: ", error)
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        
        if (response.config.method !== 'get') {
            const message = response.data.message;
            if (message) {
                toast.success(message);
            }
        }

        return Promise.resolve(response);
    },
    (error) => {

        const statusCode = error.response ? error.response.data.statusCode : null;
        const message = error.response ? error.response.data.message : "An unknown error occurred";

        let toastType: "error" | "warning" | "info" = "error";

        switch (statusCode) {
            case 400:
                toastType = "warning";
                break;
            case 401:
                toastType = "warning";
                break;
            case 403:
                toastType = "warning";
                break;
            case 404:
                toastType = "warning";
                break;
            case 500:
                toastType = "error";
                break;
            case 503:
                toastType = "error";
                break;
            default:
                toastType = "error";
                break;
        }

        console.log("Response Error: ", error);
        toast(message, { type: toastType });
        return Promise.reject(error);
    }
);

export enum StatusCode {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
}
export interface CustomResponse<T> {
    data?: T | T[];
    statusCode: StatusCode;
    message?: string;
}

export default axiosInstance;