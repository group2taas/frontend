import { NEXT_PUBLIC_SERVER_URL } from '@/configs/configs';
import { ERROR_MESSAGE } from '@/constants/error-message';
import { getToken } from '@/utils/token';
import axios, { AxiosError } from 'axios';


const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_SERVER_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject(new Error(ERROR_MESSAGE.AXIOS_ERROR_MESSAGE.NETWORK_ERROR));
    }

    const statusCode = error.response.status;
    switch (statusCode) {
      case 400:
        return Promise.reject(new Error(ERROR_MESSAGE.AXIOS_ERROR_MESSAGE[400]));
      case 401:
        return Promise.reject(new Error(ERROR_MESSAGE.AXIOS_ERROR_MESSAGE[401]));
      case 403:
        return Promise.reject(new Error(ERROR_MESSAGE.AXIOS_ERROR_MESSAGE[403]));
      case 404:
        return Promise.reject(new Error(ERROR_MESSAGE.AXIOS_ERROR_MESSAGE[404]));
      case 500:
        return Promise.reject(new Error(ERROR_MESSAGE.AXIOS_ERROR_MESSAGE[500]));
      default:
        return Promise.reject(new Error(ERROR_MESSAGE.AXIOS_ERROR_MESSAGE.UNKNOWN_ERROR));
    }
  }
);

export default axiosInstance;
