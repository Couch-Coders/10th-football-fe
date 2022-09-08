import axios from 'axios';

import { apiUrl } from './config';

export interface UserInfo {
  gender: 'MALE' | 'FEMALE' | '';
  phone: string;
}

const userAxios = axios.create({ baseURL: `${apiUrl}/users` });
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
    // return axios.get(`${apiUrl}/temp`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createUser = (userInfo: UserInfo) => {
  return userAxios.post(``, userInfo, {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

export const getAppliedMatchListBySelf = () => {
  return userAxios.get(`/me/applications`);
};
