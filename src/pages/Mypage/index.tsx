import React from 'react';
import styled from 'styled-components';

import { useAppSelector } from '@app/store';
import CommonLayout from '@components/commonLayout';
import type { User } from '@redux/userSlice';

import AdminMyPage from './admin';
import UserMyPage from './user';

const H1 = styled.h1`
  font-size: 20px;
  font-weight: 500;
  > span {
    font-weight: bold;
  }
`;

interface UserKeys {
  uid: number;
  username: string;
  email: string;
  gender: string;
  role: string;
}

const Mypage = () => {
  const { profile } = useAppSelector<User>((state) => state.user);
  return (
    <CommonLayout>
      <H1>
        <span>{profile.username}</span>님 안녕하세요!
      </H1>
      <section>
        {profile.role === 'ROLE_ADMIN' ? <AdminMyPage /> : <UserMyPage />}
        {/* <AdminMyPage /> */}
      </section>
    </CommonLayout>
  );
};

export default Mypage;
