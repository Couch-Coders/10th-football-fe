import { ConfigProvider, DatePicker, DatePickerProps } from 'antd';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from '@components/button';
import ListComponent from '@components/matchList';
import { MatchListProps } from '@custype/matchTypes';
import { deleteMatchByAdminApi, getMatchesApi } from '@service/matchApi';

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
  const [date, setDate] = useState(moment());

  useEffect(() => {
    void getAllMatchList();
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

  const deleteMatchCallback = (deletedMatchId: number) => {
    const filtered = matchList.filter((d) => d.id !== deletedMatchId);
    setMatchList(filtered);
  };

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (date) setDate(date);
    void getAllMatchList(dateString);
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
        <ListComponent onClick={() => {}} dataSource={[]} />
      </ListContainer>
    </>
  );
};

export default AdminMyPage;
