import { Carousel, Spin } from 'antd';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '@app/store';
import TempImg from '@assets/images/football1.jpg';
import CommonLayout from '@components/commonLayout';
import Loader from '@components/loader';
import { getMatchInfo } from '@redux/matchSlice';
import { getMatch } from '@service/matchApi';
import { firebaseStorage } from '@utils/firebase';

import LeftSideDetail from './left';
import RightSideDetail from './right';

const Container = styled.div`
  display: flex;
  > :nth-child(1) {
    min-width: 220px;
  }
  > :nth-child(2) {
    flex: 1;
    margin-left: 20px;
  }
`;

const Detail = () => {
  const { matchId } = useParams();
  const dispatch = useAppDispatch();
  const { files } = useAppSelector((state) => state.match.stadium);
  const [stadiumImgUrl, setStadiumImgUrl] = useState<string[]>([TempImg]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (matchId) {
      const getMatchBySelf = async () => {
        // refactor:
        // api호출하는 부분과 action을 하는 부분을 합쳐 pending, fulfilled, rejected값을 이용한다.
        // ex) files의 길이가 0이 아닐 경우의 페이지 진입 후 바로 0 인 페이지에 진입 할 경우
        // 이전 loadStadiumImgFiles함수가 실행되어 이전 match의 사진 정보를 렌더링한다.
        // hacky way loading state 값으로 해결
        // 1) match 정보를 모두 불러올 경우 setloading을  false로 변경
        // 2) loading, files 모두 deps로 보고 둘다 값에 충족할 경우에만 loadStadiumImgfiles함수호출
        const res = await getMatch(parseInt(matchId));
        dispatch(getMatchInfo(res));
        setLoading(false); // 1)
      };
      void getMatchBySelf();
    }
  }, []);

  useEffect(() => {
    // 2
    if (files.length === 0 || loading) {
      return;
    }
    loadStadiumImgFiles(files.map((file) => file.imageUrl));
  }, [files, loading]);

  const loadStadiumImgFiles = (files: string[]) => {
    const refArr = files.map((file) => ref(firebaseStorage, file));
    const imageUrls = refArr.map((ref) => getDownloadURL(ref));
    Promise.all(imageUrls)
      .then((res) => {
        setStadiumImgUrl(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <CommonLayout>
      <section style={{ height: '450px' }}>
        {loading ? (
          <Loader />
        ) : (
          <Carousel>
            {stadiumImgUrl.map((url, index) => {
              return (
                <div
                  key={`imgUrl_${index}`}
                  style={{ width: '100%', height: '450px' }}
                >
                  <img
                    width="100%"
                    height="100%"
                    src={url}
                    className="object-fit-cover"
                  />
                </div>
              );
            })}
          </Carousel>
        )}
      </section>
      <section>
        <Container>
          <LeftSideDetail />
          <RightSideDetail />
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Detail;
