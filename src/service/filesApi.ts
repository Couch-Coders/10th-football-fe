import axios, { AxiosRequestConfig } from 'axios';

import { apiUrl } from './config';

const fileAxios = axios.create({ baseURL: `${apiUrl}/files` });
fileAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
  };
  return config;
});

export const saveFileInFirebaseStorageByAdminApi = (
  filesFormData: FormData,
) => {
  return fileAxios.post(``, filesFormData);
};
