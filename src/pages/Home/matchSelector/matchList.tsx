import React, { useContext, useEffect, useState } from 'react';
import { MatchInfoContext } from './MatchInfoProvider';
import { List } from 'antd';
import { getMatches } from '@service/matchApi';
import { MATCH_NUM_TO_STRING, GENDER_TO_KOR } from '@utils/parse';

interface MatchListProps {
  id: number;
  startAt: string;
  gender: 'MALE' | 'FEMALE' | 'ALL';
  stadium: {
    address: string;
    name: string;
  };
  matchNum: 10 | 12 | 18;
  status: 'OPEN' | 'CLOSE';
}

const MatchList = () => {
  const { matchData } = useContext(MatchInfoContext);
  const { matchDay, gender, status, personnel, stadiumName } = matchData;
  const [matchList, setMatchList] = useState<any[]>();

  // Question
  // Context API을 사용하기 때문에 매번 setstate가 발생할때 마다 서버에 요청을 보냄
  // 한번만 보내는 방법이 있을까?
  useEffect(() => {
    const queryString = Object.entries(matchData)
      .filter((d) => d[1])
      .map((d) => d.join('='))
      .join('&');
    void getAllMatches(queryString);
  }, [matchDay, gender, status, personnel, stadiumName]);

  const getAllMatches = async (queryString: string) => {
    const res = await getMatches(queryString);
    setMatchList(res);
  };

  return (
    <List
      size="large"
      bordered
      dataSource={matchList}
      renderItem={(item: MatchListProps) => (
        <List.Item
          id={item.id.toString()}
          onClick={() => {}}
          style={{ cursor: 'pointer' }}
        >
          <span>{item.startAt.split('T')[1].slice(0, 5)}</span>
          <span>{item.stadium.address + ' ' + item.stadium.name}</span>
          <span>{GENDER_TO_KOR[item.gender]}</span>
          <span>{MATCH_NUM_TO_STRING[item.matchNum]}</span>
          <span>{item.status}</span>
        </List.Item>
      )}
    />
  );
};

export default MatchList;
