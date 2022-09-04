import axios from 'axios';
import { apiUrl } from './config';
import authHeader from './authHeader';

export const createMatch = (matchInfo: {
  stadiumId: number;
  matchNum: number;
  gender: string;
  content: string;
  startAt: string;
}) => {
  return axios.post(`${apiUrl}/matches`, matchInfo, authHeader());
};
