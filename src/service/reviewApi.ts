import axios, { AxiosRequestConfig } from 'axios';

import type { PaginationProps } from '@custype/matchTypes';

const reviewAxios = axios.create({ baseURL: '/reviews' });
reviewAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
  };
  return config;
});
reviewAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export const createReviewBySelfApi = (reviewInfo: {
  matchId: number;
  content: string;
}) => {
  return reviewAxios.post(``, reviewInfo);
};

export const getReviewListApi = (pageInfo: PaginationProps) => {
  return axios
    .get(``, {
      params: pageInfo,
    })
    .then((res) => res.data)
    .catch(() => []);
};

export const deleteReviewBySelfApi = (reviewId: number) => {
  return axios.delete(`/${reviewId}`);
};
