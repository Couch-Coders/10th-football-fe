import axios, { AxiosRequestConfig } from 'axios';

import type {
  CreateStadiumProps,
  StadiumListProps,
} from '@custype/stadiumTypes';
import { checkUserToken } from '@utils/user';

import { apiUrl } from './config';

const stadiumAxios = axios.create({ baseURL: `${apiUrl}/stadiums` });
stadiumAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (checkUserToken()) {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
    };
    return config;
  }
  return config;
});
stadiumAxios.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error);
  },
);

export const createStadiumApi = (stadiumInfo: CreateStadiumProps) => {
  return stadiumAxios.post(``, stadiumInfo);
};

export const getStadiumList = (address: string) => {
  return stadiumAxios.get('', {
    params: {
      address,
    },
  });
};

export const getAllStadiumApi = () => {
  return stadiumAxios.get(`all`).then((res) => res.data);
};

export const deleteStadiumApi = (stadiumId: number) => {
  return stadiumAxios.delete(`${stadiumId}`);
};

export const updateStadiumApi = (
  stadiumId: number,
  stadiumInfo: CreateStadiumProps,
) => {
  const temp = JSON.parse(JSON.stringify(stadiumInfo));
  delete temp.id;
  delete temp.likeCount;
  temp.files = temp.files.map((_: any) => _.imageUrl);
  return stadiumAxios.patch(`${stadiumId}`, temp);
};
