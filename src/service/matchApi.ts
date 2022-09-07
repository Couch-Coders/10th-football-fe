import axios, { AxiosError, AxiosResponse } from 'axios';

import authHeader from './authHeader';
import { apiUrl } from './config';

const matchAxios = axios.create({ baseURL: `${apiUrl}/matches` });
// matchAxios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     return Promise.reject(error);
//   },
// );

interface matchInfo {
  stadiumId: number;
  matchNum: number;
  gender: string;
  content: string;
  startAt: string;
}

interface MatchKeys {
  matchDay?: string;
  gender?: string;
  status?: string;
  personnel?: number;
  stadiumName?: string;
}

// export const createMatch = (matchInfo: matchInfo) => {
//   return matchAxios.post(`${apiUrl}/matches`, matchInfo, authHeader());
// };

export const createMatch = async (matchInfo: matchInfo) => {
  return await wrapper(matchAxios.post('', matchInfo, authHeader()));
};

export const getMatches = async (queryString: MatchKeys): Promise<any[]> => {
  const res = await wrapper(
    matchAxios.get(``, {
      params: queryString,
    }),
  );
  if (res.data) {
    return res.data.content;
  } else {
    return [];
  }
};

export const getMatch = async (matchId: number) => {
  const res = await wrapper(matchAxios.get(`${matchId}`));
  if (res) return res.data;
  else return null;
};

const wrapper = async (
  myFunc: Promise<AxiosResponse<any, any>>,
): Promise<any> => {
  try {
    return await myFunc;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      return error.message;
    } else {
      console.error(error);
      return error;
    }
  }
};
