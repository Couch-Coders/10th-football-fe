import React, { useContext } from 'react';
import { MatchInfoContext } from './MatchInfoProvider';

const MatchList = () => {
  const { matchData } = useContext(MatchInfoContext);
  return <div>match list</div>;
};

export default MatchList;
