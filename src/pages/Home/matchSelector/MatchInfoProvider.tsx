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
  setMatchData: Dispatch<SetStateAction<{}>>;
}
export const MatchInfoContext = createContext<MatchInfoProps>({
  matchData: {},
  setMatchData: () => {},
});

export const MatchInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [matchInfo, setMatchInfo] = useState({});
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
