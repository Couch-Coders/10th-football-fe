import React from 'react';
import Header from './header';

interface Props {
  children: JSX.Element | string;
}

const CommonLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
    </>
  );
};

export default CommonLayout;
