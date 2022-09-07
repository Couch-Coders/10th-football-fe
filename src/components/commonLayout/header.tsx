import { Avatar, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import type { RootState } from '@app/store';
import { useAppDispatch, useAppSelector } from '@app/store';
import GButton from '@assets/images/GButton.jpg';
import Button from '@components/button';
import InputForm, { Section } from '@components/inputForm';
import Modal from '@components/modal';
import {
  getUserInfoByToken,
  createUserBySelf,
  signOut as signOutAction,
} from '@redux/userSlice';
import type { UserInfo } from '@service/userApi';
import { signInWithGoogle, signOutGoogle } from '@utils/firebase';
import { deleteTokenInLocalStorage } from '@utils/user';

const { Option } = Select;

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
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [signupInfo, setSignupInfo] = useState<UserInfo>({
    gender: '',
    phone: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuthenticaton } = useAppSelector((state) => state.user);
  useEffect(() => {
    // console.log('users: ', user);
    if (isAuthenticaton) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [isAuthenticaton]);

  const signIn = async () => {
    try {
      const token = await signInWithGoogle();
      setIsOpen(false);
      if (!token) {
        alert('token error!');
        return;
      }
      localStorage.setItem('token', token);
      await dispatch(getUserInfoByToken(token)).unwrap();
    } catch (error: any) {
      // Question
      // 이게 맞는 error handling 방식?
      // custom error message을 보냈을 경우 어떻게 해야 하는지
      if (error.message === 'NEW_USER') {
        setSignupOpen(true);
      } else {
        console.error(error);
      }
    }
  };

  const signUp = async () => {
    await dispatch(createUserBySelf(signupInfo)).unwrap();
    setSignupOpen(false);
  };

  const signOut = async () => {
    await signOutGoogle();
    deleteTokenInLocalStorage();
    dispatch(signOutAction());
  };

  return (
    <>
      <Modal
        visible={isSignupOpen}
        onOk={() => setIsOpen(true)}
        onCancel={() => setIsOpen(false)}
        header={'Sign up'}
        height="auto"
      >
        <InputForm>
          <Section header="전화번호">
            <Input
              type="text"
              value={signupInfo.phone}
              onChange={(e) => {
                setSignupInfo({
                  ...signupInfo,
                  phone: e.target.value,
                });
              }}
            />
          </Section>
          <Section header="성별">
            <Select
              onChange={(gender) =>
                setSignupInfo({
                  ...signupInfo,
                  gender: gender,
                })
              }
              value={signupInfo.gender}
            >
              <Option value={'MALE'}>남</Option>
              <Option value={'FEMALE'}>여</Option>
            </Select>
          </Section>
          <Button onClick={signUp}>회원가입</Button>
        </InputForm>
      </Modal>
      <Modal
        visible={isOpen}
        onOk={() => setIsOpen(true)}
        onCancel={() => setIsOpen(false)}
        header={'Log In'}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <img
            src={GButton}
            width="70%"
            onClick={signIn}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </Modal>
      <AbsoluteHeader>
        <div>
          <div>
            <div onClick={() => navigate('/')}>Football</div>
            <div>
              {isLoggedIn ? (
                <div className="flex">
                  <Avatar
                    src="https://joeschmoe.io/api/v1/random"
                    alt="user"
                    className="mr-1"
                    style={{ backgroundColor: 'white', cursor: 'pointer' }}
                    onClick={() => navigate('/mypage')}
                  />
                  <Button onClick={signOut}>로그아웃</Button>
                </div>
              ) : (
                <Button onClick={() => setIsOpen(!isOpen)}>로그인</Button>
              )}
            </div>
          </div>
        </div>
      </AbsoluteHeader>
    </>
  );
};

export default Header;
