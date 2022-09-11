import axios from 'axios';

import { apiUrl } from './config';

const likeAxios = axios.create({ baseURL: `${apiUrl}/likes` });
likeAxios.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
  };
  return config;
});
likeAxios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  },
);

export const increaseLikeCountApi = (stadiumId: number) => {
  return likeAxios.post(`${stadiumId}`);
};

export const decreaseLikeCountApi = (stadiumId: number) => {
  return likeAxios.delete(`${stadiumId}`);
};
