import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import type { CreateMatchInfo, MatchKeys } from '@custype/matchTypes';

import { apiUrl } from './config';

const matchAxios = axios.create({ baseURL: `${apiUrl}/matches` });
matchAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    // localStorage.getItem('token') ?? ''
    // => localstorage.getItem('token')!==(null || undefined) ? localstorage.getItem('token') : ''
    Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
  };
  return config;
});
matchAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export const createMatch = async (matchInfo: CreateMatchInfo) => {
  return await matchAxios.post('', matchInfo);
};

export const getMatches = async (queryString: MatchKeys): Promise<any[]> => {
  const res = await matchAxios.get(``, {
    params: queryString,
  });
  if (res.data) {
    return res.data.content;
  } else {
    return [];
  }
};

export const getMatch = async (matchId: number) => {
  const res = await matchAxios.get(`${matchId}`);
  if (res) return res.data;
  else return null;
};

export const applyMatchApi = (matchId: number) => {
  return matchAxios.post(`applications/${matchId}`);
};

// const wrapper = async (
//   myFunc: Promise<AxiosResponse<any, any>>,
// ): Promise<any> => {
//   try {
//     return await myFunc;
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       return await Promise.reject(error);
//     } else {
//       return await Promise.reject(error);
//     }
//   }
// };
