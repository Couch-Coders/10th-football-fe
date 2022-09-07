import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '@app/store';
import TempImg from '@assets/images/football1.jpg';
import CommonLayout from '@components/commonLayout';
import { getMatchInfo } from '@redux/matchSlice';
import { getMatch } from '@service/matchApi';

import LeftSideDetail from './left';
import RightSideDetail from './right';

const Container = styled.div`
  display: flex;
  > :nth-child(1) {
    min-width: 220px;
  }
  > :nth-child(2) {
    flex: 1;
    margin-left: 20px;
  }
`;

const Detail = () => {
  const { matchId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (matchId) {
      const getMatchBySelf = async () => {
        const res = await getMatch(parseInt(matchId));
        dispatch(getMatchInfo(res));
      };
      void getMatchBySelf();
    }
  }, []);

  return (
    <CommonLayout>
      <section>
        <img src={TempImg} width="100%" height="360px" />
      </section>
      <section>
        <Container>
          <LeftSideDetail />
          <RightSideDetail />
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Detail;
