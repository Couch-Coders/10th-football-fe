import axios from 'axios';
import { apiUrl } from './config';
import authHeader from './authHeader';

export const getUserAPI = (token: string) => {
  // return axios.get(`${apiUrl}/users/me`, {
  return axios.get(`${apiUrl}/temp`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
