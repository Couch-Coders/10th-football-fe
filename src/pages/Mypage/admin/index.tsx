import { ConfigProvider, DatePicker, DatePickerProps, List } from 'antd';
import axios, { AxiosError } from 'axios';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from '@components/button';
import ListComponent from '@components/matchList';
import { ErrorToast, SuccessToast } from '@components/toasts';
import { MatchListProps } from '@custype/matchTypes';
import { StadiumListProps } from '@custype/stadiumTypes';
import { apiUrl } from '@service/config';
import { deleteMatchByAdminApi, getMatchesApi } from '@service/matchApi';
import { deleteStadiumApi, getAllStadiumApi } from '@service/stadiumApi';

import MatchCreateModal from './matchCreateModal';
import StadiumCreateModal from './stadiumCreateModal';

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
`;

const ListContainer = styled.section`
  > header {
    font-size: 1.5rem;
    margin-top: 50px;
  }
  > div:nth-child(2) {
    margin-top: 20px;
  }
  > div:nth-child(3) {
    margin-top: 20px;
  }
`;

const AdminMyPage = () => {
  const [isStadiumModalOpen, setIsStadiumModalOpen] = useState(false);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [matchList, setMatchList] = useState<MatchListProps[]>([]);
  const [stadiumList, setStadiumList] = useState<StadiumListProps[]>([]);
  const [date, setDate] = useState(moment());

  useEffect(() => {
    void getAllMatchList();
    void getAllStadium();
  }, []);

  const getAllMatchList = async (
    matchDay: string = moment().format('YYYY-MM-DD'),
  ) => {
    const res = await getMatchesApi({
      status: 'OPEN',
      matchDay,
    });
    setMatchList(res);
  };

  const getAllStadium = async () => {
    try {
      const stadiumList = await getAllStadiumApi();
      setStadiumList(stadiumList.sort((a: any, b: any) => a.id - b.id));
    } catch (error) {
      setStadiumList([]);
    }
  };

  const deleteMatchCallback = (deletedMatchId: number) => {
    const filtered = matchList.filter((d) => d.id !== deletedMatchId);
    setMatchList(filtered);
  };

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (date) setDate(date);
    void getAllMatchList(dateString);
  };

  const deleteStadium = async (stadiumId: number) => {
    try {
      await deleteStadiumApi(stadiumId);
      setStadiumList(stadiumList.filter((item) => item.id !== stadiumId));
      SuccessToast('삭제 성공!');
    } catch (error) {
      if (error instanceof AxiosError) {
        ErrorToast(error.message);
      } else {
        console.error(error);
        ErrorToast();
      }
    }
  };

  return (
    <>
      <MatchCreateModal
        visible={isMatchModalOpen}
        onOk={() => setIsMatchModalOpen(true)}
        onCancel={() => setIsMatchModalOpen(false)}
        header="경기 생성"
      />
      <StadiumCreateModal
        visible={isStadiumModalOpen}
        onOk={() => setIsStadiumModalOpen(true)}
        onCancel={() => setIsStadiumModalOpen(false)}
        header="경기장 생성"
      />
      <Container>
        <Button onClick={() => setIsStadiumModalOpen(true)} color={'yellow'}>
          경기장 등록
        </Button>
        <Button onClick={() => setIsMatchModalOpen(true)}>경기 등록</Button>
      </Container>
      <ListContainer>
        <header>매치 리스트</header>
        <ConfigProvider>
          <DatePicker onChange={onDateChange} value={date} />
        </ConfigProvider>
        <ListComponent
          patchDelete
          onClick={() => {}}
          dataSource={matchList}
          deleteMatchCallback={deleteMatchCallback}
        />
      </ListContainer>
      <ListContainer>
        <header>경기장 리스트</header>
        <List
          size="large"
          dataSource={stadiumList}
          renderItem={(item: StadiumListProps) => (
            <List.Item>
              <div style={{ width: '10%' }}>{item.id}</div>
              <div style={{ width: '40%' }}>{item.address}</div>
              <div style={{ width: '20%' }}>{item.name}</div>
              <Button onClick={() => {}}>수정</Button>
              <Button onClick={() => deleteStadium(item.id)} danger>
                삭제
              </Button>
            </List.Item>
          )}
        />
      </ListContainer>
    </>
  );
};

export default AdminMyPage;
