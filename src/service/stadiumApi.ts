import axios, { AxiosRequestConfig } from 'axios';

import type { CreateStadiumProps } from '@custype/stadiumTypes';

import { apiUrl } from './config';

const stadiumAxios = axios.create({ baseURL: `${apiUrl}/stadiums` });
stadiumAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    // localStorage.getItem('token') ?? ''
    // => localstorage.getItem('token')!==(null || undefined) ? localstorage.getItem('token') : ''
    Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
  };
  return config;
});
stadiumAxios.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error);
  },
);

export const createStadiumApi = (stadiumInfo: CreateStadiumProps) => {
  return stadiumAxios.post(``, stadiumInfo);
};

export const getStadiumList = (address: string) => {
  return stadiumAxios.get('', {
    params: {
      address,
    },
  });
};

export const getAllStadiumApi = () => {
  return stadiumAxios.get(`all`).then((res) => res.data);
};

export const deleteStadiumApi = (stadiumId: number) => {
  return stadiumAxios.delete(`${stadiumId}`);
};
