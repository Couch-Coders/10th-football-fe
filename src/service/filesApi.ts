import axios, { AxiosRequestConfig } from 'axios';

import { checkUserToken } from '@utils/user';

import { apiUrl } from './config';

const fileAxios = axios.create({ baseURL: `${apiUrl}/files` });
fileAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (checkUserToken()) {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
    };
    return config;
  }
  return config;
});

export const saveFileInFirebaseStorageByAdminApi = (
  filesFormData: FormData,
) => {
  return fileAxios.post(``, filesFormData);
};
