import { List } from 'antd';
import { AxiosError } from 'axios';
import moment from 'moment';
import React from 'react';

import Button from '@components/button';
import { ErrorToast, SuccessToast } from '@components/toasts';
import { MatchListProps as MatchListData } from '@custype/matchTypes';
import { StadiumListProps } from '@custype/stadiumTypes';
import { deleteMatchByAdminApi, getMatchesApi } from '@service/matchApi';
import { GENDER_TO_KOR, MATCH_NUM_TO_STRING } from '@utils/parse';

interface MatchListProps {
  dataSource: MatchListData[];
  onClick: React.MouseEventHandler<HTMLElement>;
  patchDelete?: boolean;
  deleteMatchCallback?: (d: number) => void;
  onClickForUpdate?: (matchId: number) => void;
}

const MatchList = ({
  onClick,
  patchDelete,
  deleteMatchCallback,
  onClickForUpdate,
  ...rest
}: MatchListProps) => {
  const deleteMatch = async (matchId: number) => {
    try {
      await deleteMatchByAdminApi(matchId);
      SuccessToast('삭제되었습니다.');
      deleteMatchCallback?.(matchId);
    } catch (error) {
      if (error instanceof AxiosError) {
        ErrorToast(error.message);
      } else {
        console.error(error);
        ErrorToast();
      }
    }
  };

  return (
    <List
      size="large"
      {...rest}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 8,
      }}
      renderItem={(item: MatchListData) => (
        <List.Item
          id={item.id.toString()}
          onClick={onClick}
          style={{ cursor: 'pointer', fontSize: '1rem' }}
        >
          <span style={{ fontWeight: 'bold', width: '10%' }}>
            {item.startAt.split('T')[1].slice(0, 5)}
          </span>
          <span style={{ fontSize: '1.5rem', width: '50%' }}>{`${
            item.stadium.address + ' ' + item.stadium.name
          }`}</span>
          <span style={{ width: '10%' }}>{GENDER_TO_KOR[item.gender]}</span>
          <span style={{ width: '10%' }}>
            {MATCH_NUM_TO_STRING[item.matchNum] || ''}
          </span>
          {patchDelete ? (
            <span>
              <Button
                style={{ marginRight: '1rem' }}
                onClick={() => onClickForUpdate?.(item.id)}
              >
                수정
              </Button>
              <Button onClick={() => deleteMatch(item.id)} danger>
                삭제
              </Button>
            </span>
          ) : (
            <span style={{ width: '10%', textAlign: 'center' }}>
              <Button onClick={() => {}}>
                {item.status === 'OPEN' ? '신청가능' : '마감'}
              </Button>
            </span>
          )}
        </List.Item>
      )}
    />
  );
};

export default MatchList;
