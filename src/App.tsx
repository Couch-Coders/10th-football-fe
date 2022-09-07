import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Detail from './pages/detail';
import Home from './pages/home';
import Mypage from './pages/myPage';
import '@assets/common.scss';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:matchId" element={<Detail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
