import React from 'react';
import styled from 'styled-components';

import SimpleCard from '@components/card/simpleCard';

const Container = styled.div`
  width: 100%;
`;

const UserMyPage = () => {
  return (
    <Container>
      <SimpleCard title="신청내역" borderRadius size="md">
        헬로
      </SimpleCard>
    </Container>
  );
};

export default UserMyPage;
