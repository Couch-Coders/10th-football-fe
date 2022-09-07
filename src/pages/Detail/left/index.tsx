import { Tag } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useAppSelector } from '@app/store';
import Button from '@components/button';
import Card from '@components/card/simpleCard';
import type { MatchInfoProps } from '@redux/matchSlice';

const Container = styled.div`
  > *:nth-child(2) {
    margin-top: 20px;
  }
`;

const MatchRequestCard = styled.div`
  > * {
    :not(:nth-child(1)) {
      margin-top: 15px;
    }
  }
  > div {
    :nth-child(2) {
      font-weight: bold;
    }
    :nth-child(3) {
      margin-top: 0px !important;
      font-size: 14px;
    }
  }
  > button {
    width: 100% !important;
    border-radius: 20px !important;
    height: auto;
    > span {
      :nth-child(1) {
        font-weight: bold;
      }
      :nth-child(3) {
        font-size: 12px;
      }
    }
  }
`;

const ApplicantsContainer = styled.div``;

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

const LeftSideDetail = () => {
  const matchInfo = useAppSelector<MatchInfoProps>((state) => state.match);
  return (
    <Container>
      <Card>
        <MatchRequestCard>
          <div>{matchInfo.startAt.split(' ')[0]}</div>
          <div>{matchInfo.stadium.name}</div>
          <div>{matchInfo.stadium.address}</div>
          <Button onClick={() => {}} disabled={matchInfo.rest === 0}>
            신청하기
            <br />
            <span>마감까지 {matchInfo.rest}자리 남았어요!</span>
          </Button>
        </MatchRequestCard>
      </Card>
      {/* Admin일 경우에만 해당 컴포넌트가 보여야 한다. */}
      <Card>
        <ApplicantsContainer>
          {matchInfo.matchApplicants.map((applicant) => {
            return (
              <Tag key={`badge_${applicant.uid}`}>
                {`${applicant.username}(${applicant.uid})`}
              </Tag>
            );
          })}
        </ApplicantsContainer>
      </Card>
    </Container>
  );
};

export default LeftSideDetail;
