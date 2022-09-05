import axios, { AxiosError, AxiosResponse } from 'axios';
import { apiUrl } from './config';
import authHeader from './authHeader';

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

// export const createMatch = (matchInfo: matchInfo) => {
//   return matchAxios.post(`${apiUrl}/matches`, matchInfo, authHeader());
// };

export const createMatch = async (matchInfo: matchInfo) => {
  return await wrapper(matchAxios.post('', matchInfo, authHeader()));
};

export const getMatches = async (queryString: string): Promise<any[]> => {
  const res = await wrapper(axios.get(`${apiUrl}/matches?${queryString}`));
  if (res.data) {
    return res.data.content;
  } else {
    return [];
  }
};

// const Wrapper = async (myFunc: () => Promise<AxiosResponse<any, any>>) => {
//   try {
//     const res = await myFunc();
//     return res.data;
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       return error.message;
//     } else {
//       return error;
//     }
//   }
// };

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
