import { DatePicker, Input } from 'antd';
import type { DatePickerProps } from 'antd';
import React, { useState, useEffect } from 'react';

import Button from '@components/button';
import InputForm, { Section } from '@components/inputForm';
import Modal from '@components/modal';
import type { ModalProps } from '@components/modal';
import RadioGroup from '@components/radioGroup';
import Search from '@components/search';
import { createMatch } from '@service/matchApi';
import { getStadiumList } from '@service/stadiumApi';

import 'moment/locale/ko';
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
  // console.log(matchInfo);
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

  const createAction = async () => {
    const { startAt, stadiumId, gender, matchNum } = matchInfo;
    if (!startAt || !stadiumId || !gender || !matchNum) {
      console.log('입력되지 않은 필드가 있습니다.');
      return;
    }
    // Question 매번 try catch을 내에 api 함수를 넣고 해야 한다.
    // 하나의 컴포넌트나 훅으로 사용하는 예시?
    // + 에러헨들링
    // error: unknown | undefined이므로 error.message을 입력하지 못함
    try {
      const result = await createMatch(matchInfo);
      console.log('match save success: ', result);
    } catch (error) {
      console.log('create match error: ', error);
    }
    // const res = await request((matchInfo) => createMatch(matchInfo));
    // console.log('res: ', res);
  };

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
