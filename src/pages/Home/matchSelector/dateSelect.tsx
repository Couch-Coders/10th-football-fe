import React, { useContext, useState } from 'react';
import { DatePicker as AntdDatePicker, ConfigProvider } from 'antd';
import type { DatePickerProps } from 'antd';
import 'moment/locale/ko';
import locale from 'antd/es/locale/ko_KR';
import { MatchInfoContext } from './MatchInfoProvider';

const DatePicker = () => {
  const { matchData, setMatchData } = useContext(MatchInfoContext);
  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    setMatchData({
      ...matchData,
      date: dateString,
    });
  };
  return (
    <ConfigProvider locale={locale}>
      <AntdDatePicker onChange={onDateChange} />
    </ConfigProvider>
  );
};

export default DatePicker;
