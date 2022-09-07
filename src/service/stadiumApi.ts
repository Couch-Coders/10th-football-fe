import axios, { AxiosRequestConfig } from 'axios';

import authHeader from './authHeader';
import { apiUrl } from './config';

const stadiumAxios = axios.create({ baseURL: `${apiUrl}/` });
stadiumAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    // localStorage.getItem('token') ?? ''
    // => localstorage.getItem('token')!==(null || undefined) ? localstorage.getItem('token') : ''
    Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
  };
  return config;
});

// Question
// const token = authHeader()을 함수 실행 전 매번 붙여줘야 한다.
// 매번 안붙이고 선행으로 authHeader값을 선언하지 않고 하는 방법

export const createStadium = (stadiumInfo: {
  name: string;
  content: string;
  parking: boolean;
  rental: boolean;
  address: string;
  imageUrl: string;
}) => {
  return axios.post(`${apiUrl}/stadiums`, stadiumInfo, authHeader());
};

export const getStadiumList = (address: string) => {
  return stadiumAxios.get('/stadium', {
    params: {
      address,
    },
  });
};
