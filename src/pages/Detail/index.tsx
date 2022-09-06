import React, { useEffect } from 'react';
import CommonLayout from '@src/components/commonLayout';
import TempImg from '@assets/images/football1.jpg';
import styled from 'styled-components';
import LeftSideDetail from './left';
import RightSideDetail from './right';
import { useParams } from 'react-router-dom';
import { getMatch } from '@src/service/matchApi';
import { useAppDispatch, useAppSelector } from '@src/app/store';
import { getMatchInfo } from '@src/redux/matchSlice';

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
