import React from 'react';
import styled from 'styled-components';

import { useAppSelector } from '@app/store';
import Card from '@components/card/simpleCard';
import Comments from '@components/comments';
import type { MatchInfoProps } from '@redux/matchSlice';
import { GENDER_TO_KOR, MATCH_NUM_TO_STRING } from '@utils/parse';

const Container = styled.div`
  width: 100%;
  :not(:nth-child(1)) {
    margin-top: 20px;
  }
  > section {
    :not(:nth-child(1)) {
      margin-top: 30px;
    }
    &.head {
      display: flex;
      > span:not(:nth-child(1)) {
        margin-left: 40px;
      }
    }
    &.match-info {
      display: flex;
      flex-wrap: wrap;
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
  const matchInfo = useAppSelector<MatchInfoProps>((state) => state.match);
  return (
    <Container>
      <section className="head">
        <span>like {matchInfo.stadium.likeCount}</span>
        {/* <span>{GENDER_TO_KOR[dummy.gender]}</span> */}
        <span>{GENDER_TO_KOR[matchInfo.gender]}</span>
        <span>{MATCH_NUM_TO_STRING[matchInfo.matchNum]}</span>
      </section>
      <section className="match-info">
        <div>{matchInfo.stadium.parking ? '주차가능' : '주차불가능'}</div>
        <div>{matchInfo.stadium.rental ? '대여가능' : '대여불가능'}</div>
      </section>
      <section>
        <Card title="주의사항">{matchInfo.content}</Card>
      </section>
      <section className="map">지도</section>
      <section>
        {/* <Card title="경기후기">
          {[1, 2, 3].map((applicant, index) => { */}
        <Card title="경기후기">
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
