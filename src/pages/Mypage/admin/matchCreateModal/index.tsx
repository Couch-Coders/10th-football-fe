import React, { useState } from 'react';
import Modal from '@components/modal';
import type { ModalProps } from '@components/modal';
import InputForm, { Section } from '@src/components/inputForm';
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import 'moment/locale/ko';
import locale from 'antd/es/locale/ko_KR';
import moment from 'moment';

interface MatchInfoProps {
  startAt: string;
  stadium: string;
  gender: string;
  content: string;
  matchNum: number;
}

const MatchCreateModal = ({ ...rest }: ModalProps) => {
  const [matchInfo, setMatchInfo] = useState<MatchInfoProps>({
    startAt: '',
    stadium: '',
    gender: '',
    content: '',
    matchNum: 0,
  });

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    setMatchInfo({
      ...matchInfo,
      startAt: dateString,
    });
  };

  return (
    <Modal height="auto" {...rest}>
      <InputForm>
        <Section header="경기날짜">
          <DatePicker showTime onChange={onDateChange} />
        </Section>
        <Section header="경기장"></Section>
        <Section header="성별"></Section>
        <Section header="매치인원"></Section>
        <Section header="매치안내"></Section>
      </InputForm>
    </Modal>
  );
};

export default MatchCreateModal;
