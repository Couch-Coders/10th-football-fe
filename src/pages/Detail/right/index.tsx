/* global kakao */
import {
  LikeOutlined,
  LikeFilled,
  CarOutlined,
  SkinOutlined,
} from '@ant-design/icons';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
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

const { kakao } = window;

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

const RightSideDetail = () => {
  const dispatch = useAppDispatch();
  const matchInfo = useAppSelector<MatchInfoProps>((state) => state.match);
  const { matchReviews, likeStatus } = matchInfo;
  useEffect(() => {
    console.log(kakao);
  }, []);
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
        if (window.confirm('경기장 좋아요를 취소하시겠습니까?')) {
          res = await decreaseLikeCountApi(matchInfo.stadium.id);
          dispatch(decreaseLikeCount());
        }
      }
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
            !likeStatus ? (
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
          {matchReviews.length === 0 ? (
            <div>후기가 없습니다.</div>
          ) : (
            matchReviews.map((applicant, index) => {
              return (
                <Comments
                  key={index}
                  username={applicant.username}
                  content={applicant.content}
                />
              );
            })
          )}
        </Card>
      </section>
    </Container>
  );
};

export default RightSideDetail;
