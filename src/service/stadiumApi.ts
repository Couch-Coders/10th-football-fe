import axios from 'axios';
import { apiUrl } from './config';
import authHeader from './authHeader';

// Question
// const token = authHeader()을 함수 실행 전 매번 붙여줘야 한다.
// 매번 안붙이고 선행으로 authHeader값을 선언하지 않고 하는 방법

export const createMatch = () => {
  return axios.post(`${apiUrl}/matches`, authHeader());
};
