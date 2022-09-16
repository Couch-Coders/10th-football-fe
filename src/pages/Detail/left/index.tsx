import { Tag } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useAppSelector } from '@app/store';
import Button from '@components/button';
import Card from '@components/card/simpleCard';
import { ErrorToast } from '@components/toasts';
import type { MatchInfoProps } from '@redux/matchSlice';
import { applyMatchApi, retractMatchApi } from '@service/matchApi';
import { checkUserToken } from '@utils/user';

const Container = styled.div`
  width: 220px;
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
  const { applyStatus } = matchInfo;
  const user = useAppSelector((state) => state.user);

  const applyMatch = async () => {
    if (!checkUserToken()) {
      alert('로그인 후 이용해주세요!');
      return;
    }
    const { id } = matchInfo;
    void applyRetractMatchFunc(
      () => applyMatchApi(id),
      '신청하시겠습니까?',
      '신청되었습니다!',
    );
  };

  const retractMatch = () => {
    const { id } = matchInfo;
    void applyRetractMatchFunc(
      () => retractMatchApi(id),
      '정말 취소하시겠습니까?',
      '취소되었습니다!',
    );
  };

  const applyRetractMatchFunc = async (
    callback: () => Promise<AxiosResponse<any, any>>,
    confirmMessage: string,
    successMessage: string,
  ) => {
    if (window.confirm(confirmMessage)) {
      try {
        await callback();
        alert(successMessage);
        location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          ErrorToast(error.response?.data.message || error.message);
        } else {
          console.error(error);
          ErrorToast();
        }
      }
    }
  };
  return (
    <Container>
      <Card>
        <MatchRequestCard>
          <div>{matchInfo.startAt}</div>
          <div>{matchInfo.stadium.name}</div>
          <div>{matchInfo.stadium.address}</div>
          {applyStatus ? (
            <Button onClick={retractMatch} danger>
              신청취소
            </Button>
          ) : (
            <Button
              onClick={applyMatch}
              disabled={matchInfo.rest === 0 || matchInfo.status === 'CLOSE'}
            >
              신청하기
              <br />
              <span>마감까지 {matchInfo.rest}자리 남았어요!</span>
            </Button>
          )}
        </MatchRequestCard>
      </Card>
      {checkUserToken() && user.profile.role === 'ROLE_ADMIN' && (
        <Card>
          <ApplicantsContainer>
            {matchInfo.matchApplicants.map((applicant, index) => {
              return (
                <Tag key={`badge_${index}`}>
                  {`${applicant.username} (${applicant.phone})`}
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
