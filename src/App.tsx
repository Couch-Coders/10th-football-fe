import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAppDispatch } from '@app/store';
import { getUserInfoByToken } from '@redux/userSlice';
import { checkUserToken } from '@utils/user';

import Detail from './pages/detail';
import Home from './pages/home';
import Mypage from './pages/myPage';

import '@assets/common.scss';

const App: React.FC = () => {
  // refact/Question
  // header의 signin, 여기 siginin 함수 재사용 되고있다.
  // 합치는 작업 필요
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = checkUserToken();
    if (token) {
      const signIn = () => {
        try {
          void dispatch(getUserInfoByToken(token)).unwrap();
        } catch (error: any) {
          console.error(error);
        }
      };
      signIn();
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:matchId" element={<Detail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/test/test2" element={<div>hello world</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
