import React, { useState, useEffect } from 'react';
import Modal from '@components/modal';
import type { ModalProps } from '@components/modal';
import InputForm, { Section } from '@src/components/inputForm';
import { DatePicker, Input } from 'antd';
import type { DatePickerProps } from 'antd';
import 'moment/locale/ko';
import locale from 'antd/es/locale/ko_KR';
import moment from 'moment';
import Search from '@components/search';
import { getStadiumList } from '@service/stadiumApi';
import RadioGroup from '@components/radioGroup';
import Button from '@src/components/button';
import { createMatch } from '@service/matchApi';

interface MatchInfoProps {
  startAt: string;
  stadiumId: number;
  gender: string;
  content: string;
  matchNum: number;
}

const MatchCreateModal = ({ ...rest }: ModalProps) => {
  const [matchInfo, setMatchInfo] = useState<MatchInfoProps>({
    startAt: '',
    stadiumId: 0,
    gender: '',
    content: '',
    matchNum: 0,
  });
  console.log(matchInfo);
  useEffect(() => {
    // Question componentwillunmount 생명주기 방법?
    // 현업에서는 어떻게 사용하는지 궁금합니다.
    return function cleanup() {
      if (rest.visible) {
        setMatchInfo({
          startAt: '',
          stadiumId: 0,
          gender: '',
          content: '',
          matchNum: 0,
        });
      }
    };
  }, [rest.visible]);

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    setMatchInfo({
      ...matchInfo,
      startAt: dateString,
    });
  };

  const createAction = () => {};

  return (
    <Modal height="auto" {...rest}>
      <InputForm>
        <Section header="경기날짜">
          <DatePicker showTime onChange={onDateChange} />
        </Section>
        <Section header="경기장">
          <Search
            value={matchInfo.stadiumId}
            onChange={(d) => {
              setMatchInfo({
                ...matchInfo,
                stadiumId: d,
              });
            }}
            placeholder="지역, 구장 이름으로 찾기"
            style={{ width: '300px' }}
            searchApi={getStadiumList}
          />
        </Section>
        <Section header="성별">
          <RadioGroup
            options={[
              { label: '남', value: 'male' },
              { label: '여', value: 'female' },
              { label: '남여모두', value: 'all' },
            ]}
            onChange={(e) =>
              setMatchInfo({
                ...matchInfo,
                gender: e.target.value,
              })
            }
            value={matchInfo.gender}
          />
        </Section>
        <Section header="매치인원">
          <RadioGroup
            options={[
              { label: '5vs5', value: 10 },
              { label: '6vs6', value: 12 },
              { label: '9vs9', value: 18 },
            ]}
            onChange={(e) =>
              setMatchInfo({
                ...matchInfo,
                matchNum: e.target.value,
              })
            }
            value={matchInfo.matchNum}
          />
        </Section>
        <Section header="매치안내">
          <Input
            onChange={(e) => {
              setMatchInfo({
                ...matchInfo,
                content: e.target.value,
              });
            }}
          />
        </Section>
        <Button onClick={createAction}>저장</Button>
      </InputForm>
    </Modal>
  );
};

export { MatchInfoProps };
export default MatchCreateModal;
