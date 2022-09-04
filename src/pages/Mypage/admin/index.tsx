import React, { useState } from 'react';
import Button from '@src/components/button';
import styled from 'styled-components';
import MatchCreateModal from './matchCreateModal';
import StadiumCreateModal from './stadiumCreateModal';

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
`;

const AdminMyPage = () => {
  const [isStadiumModalOpen, setIsStadiumModalOpen] = useState(false);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

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
    </>
  );
};

export default AdminMyPage;
