import React, { useContext, useState, useEffect } from 'react';
import { DatePicker as AntdDatePicker, ConfigProvider } from 'antd';
import type { DatePickerProps } from 'antd';
import 'moment/locale/ko';
import locale from 'antd/es/locale/ko_KR';
import { MatchInfoContext } from './MatchInfoProvider';
import moment from 'moment';

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
