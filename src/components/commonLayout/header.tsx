import React from 'react';
import styled from 'styled-components';
import Button from '@components/button';

const AbsoluteHeader = styled.div`
  position: relative;
  height: 50px;
  > div:first-child {
    width: 100%;
    height: inherit;
    position: fixed;
    background: #191718;
    > div:first-child {
      width: 100%;
      max-width: 1024px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      color: #e0e5e9;
    }
  }
`;

const Header = () => {
  return (
    <AbsoluteHeader>
      <div>
        <div>
          <div>Football</div>
          <div>
            <Button>로그인</Button>
          </div>
        </div>
      </div>
    </AbsoluteHeader>
  );
};

export default Header;
