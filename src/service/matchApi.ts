import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import type { CreateMatchInfo, MatchKeys } from '@custype/matchTypes';
import { checkUserToken } from '@utils/user';

import { apiUrl } from './config';

const matchAxios = axios.create({ baseURL: `${apiUrl}/matches` });
matchAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (checkUserToken()) {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
    };
    return config;
  }
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

export const getMatchesApi = async (
  queryString: MatchKeys = {},
): Promise<any[]> => {
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

export const retractMatchApi = (matchId: number) => {
  return matchAxios.delete(`applications/${matchId}`);
};

export const deleteMatchByAdminApi = (matchId: number) => {
  return matchAxios.delete(`${matchId}`);
};

export const updateMatchApi = (
  matchId: number,
  updateInfo: CreateMatchInfo,
) => {
  return matchAxios.patch(`${matchId}`, updateInfo);
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
