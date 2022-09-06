import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Detail from './pages/Detail';
import Home from './pages/Home';
import Mypage from './pages/Mypage';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
