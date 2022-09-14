import { Input, List, message } from 'antd';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '@app/store';
import Button from '@components/button';
import SimpleCard from '@components/card/simpleCard';
import BaseModal from '@components/modal';
import { ErrorToast, SuccessToast } from '@components/toasts';
import { AppliedMatchInfoProps } from '@custype/stadiumTypes';
import { getAppliedMatchListBySelf } from '@redux/userSlice';
import {
  createReviewBySelfApi,
  deleteReviewBySelfApi,
} from '@service/reviewApi';
import { getSelfReviewApi } from '@service/userApi';

const Container = styled.div`
  width: 100%;
`;

const AppliedMatchListContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div:nth-child(1) {
    display: flex;
    flex-direction: column;
  }
`;

const UserMyPage = () => {
  const dispatch = useAppDispatch();
  const { appliedMatch } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectReviewInfo, setSelectedReviewInfo] = useState<{
    id: number;
    matchId: number;
    content: string;
  }>({
    id: 0,
    matchId: 0,
    content: '',
  });
  const [isSavePossible, setIsSavePossible] = useState(false);

  useEffect(() => {
    void getAppliedMatchList();
  }, []);

  // hacky way
  // 후기를 작성하지 않은 경우 content=null;
  // 따라서 정책상 후기를 작성했다면 수정은 불가하기 때문에 content=null일 경우 저장버튼을 보여주지 않음
  useEffect(() => {
    if (!isReviewModalOpen) {
      setIsSavePossible(false);
    }
  }, [isReviewModalOpen]);

  // useEffect(() => {
  //   if (!isReviewModalOpen && selectReviewInfo.matchId !== 0) {
  //     setIsReviewModalOpen(true);
  //   }
  // }, [selectReviewInfo.matchId]);

  const getAppliedMatchList = async () => {
    // {}: paginationProps 정보가 들어가야 한다.
    void dispatch(getAppliedMatchListBySelf({}));
  };

  const getMatchReview = async (matchId: number) => {
    try {
      const res = await getSelfReviewApi(matchId);
      setSelectedReviewInfo({
        matchId,
        ...res.data,
      });
      if (res.data.content === null) setIsSavePossible(true);
      setIsReviewModalOpen(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        ErrorToast(error.message);
      } else {
        ErrorToast();
        console.error(error);
      }
    }
  };

  const createReview = async () => {
    if (!selectReviewInfo.content) {
      alert('후기가 입력되지 않았습니다.');
      return;
    }
    try {
      await createReviewBySelfApi({
        matchId: selectReviewInfo.matchId,
        content: selectReviewInfo.content,
      });
      setIsReviewModalOpen(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        ErrorToast(error.message);
      } else {
        ErrorToast();
        console.error(error);
      }
    }
  };

  const deleteReview = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteReviewBySelfApi(selectReviewInfo.id);
        SuccessToast('삭제되었습니다.');
        setIsReviewModalOpen(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          ErrorToast(error.message);
        } else {
          ErrorToast();
          console.error(error);
        }
      }
    }
  };

  return (
    <>
      <BaseModal
        header="후기"
        visible={isReviewModalOpen}
        onOk={() => setIsReviewModalOpen(true)}
        onCancel={() => setIsReviewModalOpen(false)}
        height="auto"
      >
        <Input.TextArea
          value={selectReviewInfo.content ?? ''}
          onChange={(e) =>
            setSelectedReviewInfo({
              ...selectReviewInfo,
              content: e.target.value,
            })
          }
        />
        <div className="flex-row gap-1 mt-1" style={{ textAlign: 'right' }}>
          {isSavePossible && <Button onClick={createReview}>저장</Button>}
          <Button onClick={deleteReview} danger>
            삭제
          </Button>
        </div>
      </BaseModal>
      <Container>
        <SimpleCard title="신청내역" borderRadius size="md">
          <List
            bordered
            dataSource={appliedMatch}
            renderItem={(item: AppliedMatchInfoProps) => (
              <List.Item id={item.applicationId.toString()}>
                <AppliedMatchListContainer>
                  <div>
                    <div>{item.match.startAt}</div>
                    <div>{item.match.stadium.name}</div>
                    <div
                      style={{ cursor: 'pointer' }}
                      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                      onClick={() => navigate(`/detail/${item.match.id ?? ''}`)}
                    >
                      자세히 보러가기...
                    </div>
                  </div>
                  <Button
                    onClick={() => getMatchReview(item.match.id)}
                    disabled={item.match.status === 'OPEN'}
                  >
                    후기
                  </Button>
                </AppliedMatchListContainer>
              </List.Item>
            )}
          />
        </SimpleCard>
      </Container>
    </>
  );
};

export default UserMyPage;
