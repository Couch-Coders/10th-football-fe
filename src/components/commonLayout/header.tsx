import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '@components/button';
import Modal from '@components/modal';
import { signInWithGoogle, signOutGoogle } from '@utils/firebase';
import { useAppDispatch, useAppSelector } from '@src/app/store';
import type { RootState } from '@src/app/store';
import { getUserInfoByToken, createUserBySelf } from '@src/redux/userSlice';
import { useNavigate } from 'react-router-dom';
import GButton from '@assets/images/GButton.jpg';
import InputForm, { Section } from '@components/inputForm';
import { Input, Select } from 'antd';
import type { UserInfo } from '@src/service/userApi';

const { Option } = Select;

interface NewUserError {
  message: string;
}

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
  // const dispatch = useDispatch();
  // const { users } = useSelector((state: RootState) => state)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    // console.log('users: ', user);
  }, [user]);

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
    } catch (error) {
      // Question!!
      // Error handling 방법..
      // axios.interceptor에서 사용자가 정의한 오류를 보냈을 경우.
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        const err = error as NewUserError;
        if (err.message === 'NEW_USER') {
          setSignupOpen(true);
        }
      }
    }
  };

  const signUp = async () => {
    await dispatch(createUserBySelf(signupInfo)).unwrap();
    setSignupOpen(false);
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
              <Button onClick={() => setIsOpen(!isOpen)}>로그인</Button>
            </div>
          </div>
        </div>
      </AbsoluteHeader>
    </>
  );
};

export default Header;
