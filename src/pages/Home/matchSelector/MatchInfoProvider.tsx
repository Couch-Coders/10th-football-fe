import moment from 'moment';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

export interface MatchKeys {
  matchDay?: string;
  gender?: string;
  status?: string;
  personnel?: number;
  stadiumName?: string;
}

interface MatchInfoProps {
  matchData: MatchKeys;
  setMatchData: Dispatch<SetStateAction<any>>;
}
export const MatchInfoContext = createContext<MatchInfoProps>({
  matchData: {
    matchDay: moment().format('YYYY-MM-DD'),
    status: '',
    gender: '',
    stadiumName: '',
    personnel: 0,
  },
  setMatchData: () => {},
});

export const MatchInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [matchInfo, setMatchInfo] = useState({
    matchDay: moment().format('YYYY-MM-DD'),
    status: '',
    gender: '',
    personnel: 0,
    stadiumName: '',
  });
  return (
    <MatchInfoContext.Provider
      value={{
        matchData: matchInfo,
        setMatchData: setMatchInfo,
      }}
    >
      {children}
    </MatchInfoContext.Provider>
  );
};
