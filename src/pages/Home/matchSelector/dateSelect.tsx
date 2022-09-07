import { DatePicker as AntdDatePicker, ConfigProvider, DatePickerProps } from 'antd';
import locale from 'antd/es/locale/ko_KR';
import moment from 'moment';
import React, { useContext, useState, useEffect } from 'react';

import { MatchInfoContext } from './MatchInfoProvider';

import 'moment/locale/ko';

const DatePicker = () => {
  const { matchData, setMatchData } = useContext(MatchInfoContext);
  useEffect(() => {
    setMatchData({
      ...matchData,
      matchDay: moment().format('YYYY-MM-DD'),
    });
  }, []);
  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    setMatchData({
      ...matchData,
      matchDay: dateString,
    });
  };
  return (
    <ConfigProvider locale={locale}>
      <AntdDatePicker onChange={onDateChange} defaultValue={moment()} />
    </ConfigProvider>
  );
};

export default DatePicker;
