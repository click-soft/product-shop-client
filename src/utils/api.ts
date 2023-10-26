import axios from 'axios';
import { interceptors } from './storage';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

interface GqlResponse {
  data: any;
  errors: GqlErorrsResponse[];
}

interface GqlErorrsResponse {
  message: string;
  locations: [{ line: number; column: number }];
  path: string[];
  extensions: {
    code: string;
    stacktrace: string[];
    originalError: {
      message: string;
      error: string;
      statusCode: number;
    };
  };
}

const axiosApi = (url: string, options?: any) => {
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
export const gqlPost = async (data: any): Promise<GqlResponse> => {
  const url = BASE_URL + '/graphql';
  const response = await axios.post(url, data, { withCredentials: true });

  return response.data;
};
