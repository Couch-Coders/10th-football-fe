import React from 'react';

import DateSelect from './dateSelect';
import FilterMatch from './filterMatch';
import { MatchInfoProvider } from './MatchInfoProvider';
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
