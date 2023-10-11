import { AxiosInstance } from 'axios';

export const interceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      // const accessToken = getCookie('jwt-access-token');
      // config.headers!.Authorization = `${accessToken}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};