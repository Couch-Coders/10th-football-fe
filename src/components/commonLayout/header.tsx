import { TeamOutlined } from '@ant-design/icons';
import { Avatar, Input, Select } from 'antd';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '@app/store';
import GButton from '@assets/images/GButton.jpg';
import Button from '@components/button';
import InputForm, { Section } from '@components/inputForm';
import Modal from '@components/modal';
import { ErrorToast, SuccessToast } from '@components/toasts';
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
  z-index: 9998;
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
  const [isSignupOpen, setIsSignupOpen] = useState(false);
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
      if (error.message === 'NEW_USER') {
        setIsSignupOpen(true);
      } else {
        console.error(error);
      }
    }
  };

  const signUp = async () => {
    const { gender, phone } = signupInfo;
    if (!gender) {
      ErrorToast('????????? ??????????????????!');
      return;
    }
    if (!phone) {
      ErrorToast('??????????????? ??????????????????!');
      return;
    }
    try {
      await dispatch(createUserBySelf(signupInfo)).unwrap();
      setIsSignupOpen(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('1: ', error);
      } else {
        console.log(error);
      }
    }
  };

  const signOut = async () => {
    await signOutGoogle();
    deleteTokenInLocalStorage();
    dispatch(signOutAction());
    SuccessToast('???????????? ??????!');
  };

  return (
    <>
      <Modal
        visible={isSignupOpen}
        onOk={() => setIsSignupOpen(true)}
        onCancel={() => setIsSignupOpen(false)}
        header={'Sign up'}
        height="auto"
      >
        <InputForm>
          <Section header="????????????">
            <Input
              type="text"
              value={signupInfo.phone}
              placeholder={'000-0000-0000'}
              onChange={(e) => {
                setSignupInfo({
                  ...signupInfo,
                  phone: e.target.value,
                });
              }}
            />
          </Section>
          <Section header="??????">
            <Select
              onChange={(gender) =>
                setSignupInfo({
                  ...signupInfo,
                  gender,
                })
              }
              value={signupInfo.gender}
            >
              <Option value={'MALE'}>???</Option>
              <Option value={'FEMALE'}>???</Option>
            </Select>
          </Section>
          <Button onClick={signUp}>????????????</Button>
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
            <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <span>
                <TeamOutlined style={{ fontSize: '1.5rem' }} /> ?????????
              </span>
            </div>
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
                  <Button onClick={signOut}>????????????</Button>
                </div>
              ) : (
                <Button onClick={() => setIsOpen(!isOpen)}>?????????</Button>
              )}
            </div>
          </div>
        </div>
      </AbsoluteHeader>
    </>
  );
};

export default Header;
