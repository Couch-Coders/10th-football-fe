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

const LeftSideDetail = () => {
  const matchInfo = useAppSelector<MatchInfoProps>((state) => state.match);
  return (
    <Container>
      <Card>
        <MatchRequestCard>
          <div>{matchInfo.startAt.split('.')[0]}</div>
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
