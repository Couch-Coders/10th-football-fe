import { List } from 'antd';
import React, { useContext, useEffect, useState } from 'react';

import { getMatch, getMatches } from '@service/matchApi';
import { MATCH_NUM_TO_STRING, GENDER_TO_KOR } from '@utils/parse';

import { MatchInfoContext } from './MatchInfoProvider';

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

  useEffect(() => {
    const queryStringObject = JSON.parse(JSON.stringify(matchData));
    for (const key in queryStringObject) {
      if (!queryStringObject[key]) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete queryStringObject[key];
      }
    }
    const requestGetMatch = async () => {
      const res = await getMatches(queryStringObject);
      setMatchList(res);
    };
    void requestGetMatch();
  }, [matchDay, gender, status, personnel, stadiumName]);

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
