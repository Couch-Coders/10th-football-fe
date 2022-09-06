import axios from 'axios';
import authHeader from './authHeader';
import { apiUrl } from './config';

export interface UserInfo {
  gender: 'MALE' | 'FEMALE' | '';
  phone: string;
}

const userAxios = axios.create({ baseURL: `${apiUrl}/users` });
userAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (
    //   error.response &&
    //   error.response.status === 401 &&
    //   error.request &&
    //   error.request.responseURL ===
    //     'https://football-matching.herokuapp.com/users/me'
    // ) {
    //   console.log('need signup');
    //   return Promise.reject('NEW_USER')

    // }
    if (error.response && error.response.status === 404) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('NEW_USER');
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
  return userAxios.post(``, userInfo, authHeader());
};
