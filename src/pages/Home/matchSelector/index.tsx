import React from 'react';
import { MatchInfoProvider } from './MatchInfoProvider';
import DateSelect from './dateSelect';
import FilterMatch from './filterMatch';
import MatchList from './matchList';

const MatchSelector = () => {
  return (
    <MatchInfoProvider>
      <DateSelect />
      <FilterMatch />
      <MatchList />
    </MatchInfoProvider>
  );
};

export default MatchSelector;
