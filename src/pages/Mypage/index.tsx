import React from 'react';
import CommonLayout from '@src/components/commonLayout';
import styled from 'styled-components';
import { useAppSelector } from '@src/app/store';
import AdminMyPage from './admin';
import UserMyPage from './user';

interface UserKeys {
  uid: number;
  name: string;
  email: string;
  gender: string;
  role: string;
}

interface User {
  user: UserKeys | null;
}

const dummy: User = {
  user: {
    uid: 1,
    name: '관리자',
    email: 'admin@gamil.com',
    gender: 'MALE',
    role: 'ADMIN',
  },
};

const H1 = styled.h1`
  font-size: 20px;
  font-weight: 500;
  > span {
    font-weight: bold;
  }
`;

const Mypage = () => {
  // const { user } = useAppSelector((state) => state.user);
  const { user } = dummy;
  return (
    <CommonLayout>
      <H1>
        <span>{user?.name}</span>님 안녕하세요!
      </H1>
      <section>
        {user?.role === 'ADMIN' ? <AdminMyPage /> : <UserMyPage />}
      </section>
    </CommonLayout>
  );
};

export default Mypage;
