import { List } from 'antd';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '@app/store';
import Button from '@components/button';
import SimpleCard from '@components/card/simpleCard';
import { AppliedMatchInfoProps } from '@custype/stadiumTypes';
import { getAppliedMatchListBySelf } from '@redux/userSlice';
import { getAppliedMatchListBySelfApi } from '@service/userApi';

const dummy = [
  {
    applicationId: 3,
    match: {
      id: 2,
      stadium: {
        createdDate: '2022-09-06T15:02:24.206519',
        lastModifiedDate: '2022-09-06T15:02:24.206519',
        id: 1,
        files: [],
        name: '하늘풋살장',
        content: '깔끔',
        parking: true,
        rental: false,
        address: '서울특별시 영등포구 1234',
        likeCount: 0,
      },
      matchNum: 1,
      applicantNum: 1,
      status: 'CLOSE',
      gender: 'FEMALE',
      content: '테스트2222222222222222',
      startAt: '2022-09-06T17:02:31.548419',
      rest: 0,
    },
  },
  {
    applicationId: 4,
    match: {
      id: 5,
      stadium: {
        createdDate: '2022-09-06T15:02:26.630725',
        lastModifiedDate: '2022-09-06T15:02:26.630725',
        id: 2,
        files: [],
        name: '옥상풋살장',
        content: '더러움',
        parking: true,
        rental: false,
        address: '서울특별시 구로구 3333',
        likeCount: 0,
      },
      matchNum: 10,
      applicantNum: 1,
      status: 'OPEN',
      gender: 'ALL',
      content: '테스트55555555555555',
      startAt: '2022-09-09T21:02:34.485174',
      rest: 9,
    },
  },
];

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

  useEffect(() => {
    void getAppliedMatchList();
  }, []);

  const getAppliedMatchList = async () => {
    // {}: paginationProps 정보가 들어가야 한다.
    void dispatch(getAppliedMatchListBySelf({}));
  };

  return (
    <Container>
      <SimpleCard title="신청내역" borderRadius size="md">
        <List
          bordered
          dataSource={dummy}
          renderItem={(item: AppliedMatchInfoProps) => (
            <List.Item id={item.applicationId.toString()}>
              <AppliedMatchListContainer>
                <div>
                  <div>{item.match.startAt}</div>
                  <div>{item.match.stadium.name}</div>
                  <div
                    style={{ cursor: 'pointer' }}
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    onClick={() => navigate(`/${item.match.id ?? ''}`)}
                  >
                    자세히 보러가기...
                  </div>
                </div>
                <Button
                  onClick={() => {}}
                  disabled={item.match.status === 'CLOSE'}
                >
                  후기
                </Button>
              </AppliedMatchListContainer>
            </List.Item>
          )}
        />
      </SimpleCard>
    </Container>
  );
};

export default UserMyPage;
