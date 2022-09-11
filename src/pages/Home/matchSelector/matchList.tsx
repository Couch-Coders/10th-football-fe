import { List } from 'antd';
import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import MatchListComponent from '@components/matchList';
import type { MatchListProps } from '@custype/matchTypes';
import { getMatch, getMatchesApi } from '@service/matchApi';
import { MATCH_NUM_TO_STRING, GENDER_TO_KOR } from '@utils/parse';

import { MatchInfoContext } from './MatchInfoProvider';

const MatchList = () => {
  const { matchData } = useContext(MatchInfoContext);
  const { matchDay, gender, status, personnel, stadiumName } = matchData;
  const [matchList, setMatchList] = useState<MatchListProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const queryStringObject = JSON.parse(JSON.stringify(matchData));
    for (const key in queryStringObject) {
      if (!queryStringObject[key]) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete queryStringObject[key];
      }
    }
    const requestGetMatch = async () => {
      const res = await getMatchesApi(queryStringObject);
      setMatchList(res);
    };
    void requestGetMatch();
  }, [matchDay, gender, status, personnel, stadiumName]);

  return (
    <MatchListComponent
      onClick={(e) => navigate(`/detail/${e.currentTarget.id}`)}
      dataSource={matchList}
    />
  );
};

export default MatchList;
