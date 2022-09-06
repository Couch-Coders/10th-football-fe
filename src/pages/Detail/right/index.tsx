import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  :not(:nth-child(1)) {
    margin-top: 20px;
  }
  > section:nth-child(1) {
    display: flex;
    > span:not(:nth-child(1)) {
      margin-left: 40px;
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
  return (
    <Container>
      <section>
        <span>like 99</span>
        <span>남녀 모두</span>
        <span>6vs6</span>
      </section>
    </Container>
  );
};

export default RightSideDetail;
