import React, { useContext, useEffect, useState } from 'react';
import { MatchInfoContext } from './MatchInfoProvider';
import { MatchKeys } from '@src/pages/home/matchSelector/MatchInfoProvider';

interface MatchInfoProps {
  matchData: {
    time?: string;
    gender?: string;
    deadline?: boolean;
    num?: number;
    address?: string;
  };
}

interface ObjType {
  [key: string]: string | undefined | boolean | number;
}

const MatchList = () => {
  const { matchData } = useContext(MatchInfoContext);
  const { time, gender, deadline, num, address } = matchData;
  const [test, setTest] = useState<ObjType>({});
  useEffect(() => {
    setTest({
      ...test,
      time,
      gender,
      deadline,
      num,
      address,
    });
  }, [matchData]);

  // return (
  //   <div>
  //     {Object.keys(test).map((key) => {
  //       return (
  //         <div key={`tempKey_${key}`}>
  //           {`${key}: ${JSON.stringify(test[key])}`}
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
  return (
    <div>
      {Object.keys(matchData)
        .map((key) => key as unknown as keyof MatchKeys)
        .map((key) => {
          return (
            <div key={`tempKey_${key}`}>
              {`${key}: ${JSON.stringify(matchData[key])}`}
            </div>
          );
        })}
    </div>
  );
};

export default MatchList;
