import axios, { AxiosRequestConfig } from 'axios';

import { PaginationProps } from '@custype/matchTypes';

import { apiUrl } from './config';

export interface UserInfo {
  gender: 'MALE' | 'FEMALE' | '';
  phone: string;
}

const userAxios = axios.create({ baseURL: `${apiUrl}/users` });
userAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
  };
  return config;
});
userAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data === '해당 회원이 존재하지 않습니다'
    ) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('NEW_USER');
      // return Promise.reject('NEW_USER');
    }
    return Promise.reject(error);
  },
);

export const getUserAPI = (token: string) => {
  return userAxios.get(`/me`, {
    // 중복해서 header을 보낼 경우 어떻게
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createUser = (userInfo: UserInfo) => {
  return userAxios.post(``, userInfo, {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

export const getAppliedMatchListBySelfApi = (pageInfo: PaginationProps) => {
  return userAxios.get(`/me/applications`, {
    params: pageInfo,
  });
};

export const getSelfReviewApi = (matchId: number) => {
  return userAxios.get(`/me/reviews/${matchId}`);
};
