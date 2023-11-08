import axios, { CreateAxiosDefaults } from 'axios';
import { interceptors } from './storage';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const axiosApi = (url: string, options?: CreateAxiosDefaults) => {
  const instance = axios.create({
    baseURL: url,
    withCredentials: true,
    ...options,
  });
  return instance;
};

const axiosAuthApi = (url: string, options?: any) => {
  const instance = axios.create({
    baseURL: url,
    withCredentials: true,
    ...options,
  });
  interceptors(instance);
  return instance;
};

export const baseApi = axiosApi(BASE_URL + '/api');
export const authApi = axiosAuthApi(BASE_URL + '/api');
