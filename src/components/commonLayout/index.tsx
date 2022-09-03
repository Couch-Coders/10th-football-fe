import React from 'react';
import Header from './header';
import styled from 'styled-components';

const Body = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  min-height: 1000px;
  margin-top: 20px;
  > section {
    margin-top: 40px;
  }
`;

interface Props {
  // children: JSX.Element | string | JSX.Element[];
  children: React.ReactNode;
}

const CommonLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Body>{children}</Body>
    </>
  );
};

export default CommonLayout;
