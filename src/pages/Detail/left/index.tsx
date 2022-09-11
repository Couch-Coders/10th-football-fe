import { Tag } from 'antd';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useAppSelector } from '@app/store';
import Button from '@components/button';
import Card from '@components/card/simpleCard';
import { ErrorToast } from '@components/toasts';
import type { MatchInfoProps } from '@redux/matchSlice';
import { applyMatchApi } from '@service/matchApi';
import { checkUserToken } from '@utils/user';

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

const LeftSideDetail = () => {
  const matchInfo = useAppSelector<MatchInfoProps>((state) => state.match);
  const user = useAppSelector((state) => state.user);

  const applyMatch = async () => {
    if (checkUserToken()) {
      alert('로그인 후 이용해주세요!');
      return;
    }
    try {
      const { id } = matchInfo;
      const res = await applyMatchApi(id);
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
      <Card>
        <MatchRequestCard>
          <div>{matchInfo.startAt.split('.')[0]}</div>
          <div>{matchInfo.stadium.name}</div>
          <div>{matchInfo.stadium.address}</div>
          <Button onClick={applyMatch} disabled={matchInfo.rest === 0}>
            신청하기
            <br />
            <span>마감까지 {matchInfo.rest}자리 남았어요!</span>
          </Button>
        </MatchRequestCard>
      </Card>
      {checkUserToken() && user.profile.role === 'ADMIN' && (
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
      )}
    </Container>
  );
};

export default LeftSideDetail;
