import DatePicker from '@src/components/datePicker';
import React from 'react';
import FilterMatch from './filterMatch';
import MatchList from './matchList';

const MatchSelector = () => {
  return (
    <>
      <DatePicker />
      <FilterMatch />
      <MatchList />
    </>
  );
};

export default MatchSelector;
