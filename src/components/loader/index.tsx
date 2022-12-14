import { Spin } from 'antd';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = () => {
  return (
    <Container>
      <Spin />
    </Container>
  );
};

export default Loader;
