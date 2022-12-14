import { DatePicker, Input } from 'antd';
import type { DatePickerProps } from 'antd';
import { AxiosError } from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';

import Button from '@components/button';
import InputForm, { Section } from '@components/inputForm';
import Modal from '@components/modal';
import type { ModalProps } from '@components/modal';
import RadioGroup from '@components/radioGroup';
import Search from '@components/search';
import { ErrorToast } from '@components/toasts';
import type { CreateMatchInfo } from '@custype/matchTypes';
import { createMatch, updateMatchApi } from '@service/matchApi';
import { getStadiumList } from '@service/stadiumApi';

import 'moment/locale/ko';

interface MatchCreateModalProps extends ModalProps {
  matchInfoForUpdate?: {
    matchInfo: CreateMatchInfo;
    matchId: number;
  } | null;
  matchId?: number;
}

const MatchCreateModal = ({
  matchInfoForUpdate,
  matchId,
  ...rest
}: MatchCreateModalProps) => {
  const [matchInfo, setMatchInfo] = useState<CreateMatchInfo>({
    startAt: '',
    stadiumId: 0,
    matchGender: '',
    content: '',
    matchNum: 0,
  });

  useEffect(() => {
    setMatchInfo(
      matchInfoForUpdate?.matchInfo ?? {
        startAt: '',
        stadiumId: 0,
        matchGender: '',
        content: '',
        matchNum: 0,
      },
    );
  }, [matchInfoForUpdate?.matchId]);

  useEffect(() => {
    return function cleanup() {
      if (rest.visible) {
        setMatchInfo({
          startAt: '',
          stadiumId: 0,
          matchGender: '',
          content: '',
          matchNum: 0,
        });
      }
    };
  }, [rest.visible]);

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (date) {
      setMatchInfo({
        ...matchInfo,
        startAt: date?.format('YYYY-MM-DD HH:mm:ss'),
      });
    }
  };

  const createAction = async (type: string) => {
    const { startAt, stadiumId, matchGender, matchNum } = matchInfo;
    if (!startAt || !stadiumId || !matchGender || !matchNum) {
      ErrorToast('???????????? ?????? ????????? ????????????.');
      return;
    }

    // hacky way
    let tempMatchInfo = JSON.parse(JSON.stringify(matchInfo));
    tempMatchInfo = {
      ...tempMatchInfo,
      stadiumId:
        typeof tempMatchInfo.stadiumId === 'string'
          ? parseInt(tempMatchInfo.stadiumId)
          : tempMatchInfo.stadiumId,
    };
    try {
      if (type === 'update') {
        if (matchInfoForUpdate) {
          await updateMatchApi(matchInfoForUpdate.matchId, tempMatchInfo);
        }
      } else {
        await createMatch(tempMatchInfo);
      }
      rest.onCancel();
      alert('?????????????????????!');
      location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(`????????????: ${error.message}`);
      } else {
        alert('????????????!');
      }
    }
  };

  return (
    <Modal height="auto" {...rest}>
      <InputForm>
        <Section header="????????????">
          <DatePicker
            format={'YYYY-MM-DD HH:mm'}
            showTime
            onChange={onDateChange}
            value={matchInfo.startAt ? moment(matchInfo.startAt) : null}
          />
        </Section>
        <Section
          header="?????????"
          className={matchInfoForUpdate ? 'display-none' : ''}
        >
          <Search
            value={matchInfo.stadiumId}
            onChange={(d) => {
              setMatchInfo({
                ...matchInfo,
                stadiumId: d,
              });
            }}
            placeholder="??????, ?????? ???????????? ??????"
            style={{ width: '300px' }}
            searchApi={getStadiumList}
          />
        </Section>
        <Section header="??????">
          <RadioGroup
            options={[
              { label: '???', value: 'male' },
              { label: '???', value: 'female' },
              { label: '????????????', value: 'all' },
            ]}
            onChange={(e) =>
              setMatchInfo({
                ...matchInfo,
                matchGender: e.target.value,
              })
            }
            value={matchInfo.matchGender.toLowerCase()}
          />
        </Section>
        <Section header="????????????">
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
        <Section header="????????????">
          <Input
            onChange={(e) => {
              setMatchInfo({
                ...matchInfo,
                content: e.target.value,
              });
            }}
            value={matchInfo.content}
          />
        </Section>
        {matchInfoForUpdate ? (
          <Button onClick={() => createAction('update')}>??????</Button>
        ) : (
          <Button onClick={() => createAction('create')}>??????</Button>
        )}
      </InputForm>
    </Modal>
  );
};

export default MatchCreateModal;
