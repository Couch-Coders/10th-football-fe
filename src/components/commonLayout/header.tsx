import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@components/button';
import Modal from '@components/modal';
import useFirebaseAuth from '@utils/firebase';

const AbsoluteHeader = styled.div`
  position: relative;
  height: 50px;
  z-index: 9999;
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
  const [isOpen, setIsOpen] = useState(false);
  const { signInGoogle } = useFirebaseAuth();

  // Question
  const signIn = async () => {
    const data = await signInGoogle();
  };

  return (
    <>
      <Modal
        visible={isOpen}
        onOk={() => setIsOpen(true)}
        onCancel={() => setIsOpen(false)}
        header={'Log In'}
      >
        <button onClick={signIn}>로그인</button>
      </Modal>
      <AbsoluteHeader>
        <div>
          <div>
            <div>Football</div>
            <div>
              <Button onClick={() => setIsOpen(!isOpen)}>로그인</Button>
            </div>
          </div>
        </div>
      </AbsoluteHeader>
    </>
  );
};

export default Header;
