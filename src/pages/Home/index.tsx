import { Carousel } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import Img1 from '@assets/images/football1.jpg';
import Img2 from '@assets/images/football2.jpg';
import Img3 from '@assets/images/football3.jpg';
import CommonLayout from '@components/commonLayout';
import '@assets/home.scss';

import MatchSelector from './matchSelector';

const MatchContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  > div {
    margin-top: 20px;
    &:nth-child(1) {
      margin-top: 0;
    }
  }
`;

const Home = () => {
  return (
    <CommonLayout>
      <Carousel className="home-caro" autoplay>
        <div>
          <div className="item first">
            {/* <img src={Img1} width="100%" /> */}
          </div>
        </div>
        <div>
          <div className="item second">
            {/* <img src={Img2} width="100%" /> */}
          </div>
        </div>
        <div>
          <div className="item third">
            {/* <img src={Img3} width="100%" /> */}
          </div>
        </div>
      </Carousel>
      <MatchContainer>
        <MatchSelector />
      </MatchContainer>
    </CommonLayout>
  );
};

export default Home;
