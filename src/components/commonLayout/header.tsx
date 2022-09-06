import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import type { RootState } from '@app/store';
import { useAppDispatch, useAppSelector } from '@app/store';
import Button from '@components/button';
import Modal from '@components/modal';
import { getUserInfoByToken } from '@redux/userSlice';
import { signInWithGoogle, signOutGoogle } from '@utils/firebase';

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
  // const dispatch = useDispatch();
  // const { users } = useSelector((state: RootState) => state)
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  // Question
  // Home => Mypage 로 갔을 때 사실상user 정보는 변함이 없다
  // 하지만 useEffect에서는 여전히 console.log가 실행된다
  // 막을 최적화 방법
  useEffect(() => {
    console.log('users: ', user);
  }, [user]);

  const signIn = async () => {
    try {
      const token = await signInWithGoogle();
      if (!token) {
        alert('token error!');
        return;
      }
      await dispatch(getUserInfoByToken(token)).unwrap();
    } catch (err) {
      console.log('error: ', err);
    }
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
