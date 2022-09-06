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
    console.log('error!!!!!!!: ', error);
    if (
      error.response &&
      error.response.status === 401
      // error.request.responseURL ===
      //   'https://football-matching.herokuapp.com/users/me'
    ) {
      console.log('need signup');
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('NEW_USER');
    }
    // if (error.response && error.response.status === 404) {
    //   // eslint-disable-next-line prefer-promise-reject-errors
    //   return Promise.reject('NEW_USER');
    // }
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
