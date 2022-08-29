import React, { useEffect } from 'react';
import '@assets/home.scss';
import { Carousel } from 'antd';
import CommonLayout from '@src/components/commonLayout';
import MatchSelector from './matchSelector';
import axios from 'axios';

const Home = (): any => {
  // test heroku server by proxy setting in package.json
  // useEffect(() => {
  //   axios
  //     .get('/front')
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  return (
    <CommonLayout>
      <Carousel className="home-caro">
        <div>
          <div className="item first">1</div>
        </div>
        <div>
          <div className="item second">2</div>
        </div>
        <div>
          <div className="item third">3</div>
        </div>
      </Carousel>
      <MatchSelector />
    </CommonLayout>
  );
};

export default Home;
