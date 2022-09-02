// const APIURL = https://football-matching.herokuapp.com
import axios from 'axios';

const tempURL = 'http://localhost:3001';

export const getUserAPI = (token: string) => {
  // return axios.get(`${tempURL}/users/me`, {
  return axios.get(`${tempURL}/temp`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
