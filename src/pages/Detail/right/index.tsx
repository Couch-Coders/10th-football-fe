import {
  LikeOutlined,
  LikeFilled,
  CarOutlined,
  SkinOutlined,
} from '@ant-design/icons';
import { AxiosError } from 'axios';
import React from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '@app/store';
import Card from '@components/card/simpleCard';
import Comments from '@components/comments';
import { ErrorToast } from '@components/toasts';
import {
  decreaseLikeCount,
  increaseLikeCount,
  MatchInfoProps,
} from '@redux/matchSlice';
import { decreaseLikeCountApi, increaseLikeCountApi } from '@service/likesApi';
import { GENDER_TO_KOR, MATCH_NUM_TO_STRING } from '@utils/parse';
import { checkUserToken } from '@utils/user';

const Container = styled.div`
  width: 100%;
  :not(:nth-child(1)) {
    margin-top: 20px;
  }
  > section {
    :not(:nth-child(1)) {
      margin-top: 50px;
    }
    &.head {
      display: flex;
      font-size: 1.5rem;
      > span:not(:nth-child(1)) {
        margin-left: 80px;
      }
    }
    &.match-info {
      display: flex;
      flex-wrap: wrap;
      font-size: 1.5rem;
      > div {
        width: 48%;
        flex-wrap: wrap;
        padding-right: 10px;
        padding-bottom: 10px;
      }
    }
    &.map {
      width: 100%;
      height: 360px;
      border: 1px solid black;
    }
  }
`;

const dummy = {
  id: 1,
  matchStadium: {
    id: 1,
    name: '더 에프 풋살장',
    parking: true,
    rental: false,
    likeCount: 24,
    address: '서울시 영등포구 양평동 1234',
    createAt: '2022-08-15 16:40:00',
    imageUrl: '',
  },
  matchNum: 12,
  applicantNum: 11,
  status: 'OPEN',
  gender: 'MALE',
  content: '경기 시작 10분전에 도착',
  startAt: '2022-08-15 13:00:00',
  rest: 1,
  matchApplicants: [
    {
      uid: 'jwt1',
      username: 'tester1',
      email: 'tester1@gmail.com',
      gender: 'male',
      phone: '010-1234-5678',
    },
    {
      uid: 'jwt2',
      username: 'tester2',
      email: 'tester2@gmail.com',
      gender: 'female',
      phone: '010-1111-2222',
    },
  ],
  matchReviews: [
    {
      uid: 'jwt1',
      content: '경기장이 깨끗해요',
      createdDate: '2022-08-15 16:30:00',
    },
    {
      uid: 'jwt2',
      content: '실력차이가 심했어요',
      createdDate: '2022-08-15 18:00:00',
    },
  ],
};

const RightSideDetail = () => {
  const dispatch = useAppDispatch();
  const matchInfo = useAppSelector<MatchInfoProps>((state) => state.match);
  const likeStateOnChange = async (type: string) => {
    if (!checkUserToken()) {
      alert('로그인 후 이용해 주세요');
      return;
    }
    try {
      let res;
      if (type === 'like') {
        res = await increaseLikeCountApi(matchInfo.stadium.id);
        dispatch(increaseLikeCount());
      } else {
        res = await decreaseLikeCountApi(matchInfo.stadium.id);
        dispatch(decreaseLikeCount());
      }
      console.log('res: ', res);
    } catch (error) {
      if (error instanceof AxiosError) {
        ErrorToast(error.response?.data.message || error.message);
      } else {
        console.error(error);
        ErrorToast();
      }
    }
  };
  return (
    <Container>
      <section className="head">
        <span>
          {
            // eslint-disable-next-line no-constant-condition
            true ? (
              <LikeOutlined
                style={{ cursor: 'pointer' }}
                onClick={() => likeStateOnChange('like')}
              />
            ) : (
              <LikeFilled
                style={{ cursor: 'pointer' }}
                onClick={() => likeStateOnChange('dislike')}
              />
            )
          }{' '}
          {matchInfo.stadium.likeCount}
        </span>
        {/* <span>{GENDER_TO_KOR[dummy.gender]}</span> */}
        <span>{GENDER_TO_KOR[matchInfo.gender]}</span>
        <span>{MATCH_NUM_TO_STRING[matchInfo.matchNum]}</span>
      </section>
      <section className="match-info">
        <div>
          {matchInfo.stadium.parking ? (
            <span>
              <CarOutlined /> 주차가능
            </span>
          ) : (
            <span style={{ textDecoration: 'line-through', color: '#C1CCD6' }}>
              <CarOutlined /> 주차불가
            </span>
          )}
        </div>
        <div>
          {matchInfo.stadium.rental ? (
            <span>
              <SkinOutlined /> 대여가능
            </span>
          ) : (
            <span style={{ textDecoration: 'line-through', color: '#C1CCD6' }}>
              <SkinOutlined /> 대여불가
            </span>
          )}
        </div>
      </section>
      <section>
        <Card title="주의사항" borderRadius>
          {matchInfo.content}
        </Card>
      </section>
      <section className="map">지도</section>
      <section>
        {/* <Card title="경기후기">
          {[1, 2, 3].map((applicant, index) => { */}
        <Card title="경기후기" borderRadius>
          {/* {matchInfo.matchReviews.map((applicant, index) => { */}
          {dummy.matchReviews.map((applicant, index) => {
            return (
              <Comments
                key={index}
                username={applicant.uid}
                content={applicant.content}
              />
            );
          })}
        </Card>
      </section>
    </Container>
  );
};

export default RightSideDetail;
