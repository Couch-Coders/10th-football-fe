import axios from 'axios';

import authHeader from './authHeader';
import { apiUrl } from './config';

export const getUserAPI = (token: string) => {
  // return axios.get(`${apiUrl}/users/me`, {
  return axios.get(`${apiUrl}/temp`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
