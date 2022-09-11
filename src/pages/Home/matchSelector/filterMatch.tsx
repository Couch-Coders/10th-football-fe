import { Select } from 'antd';
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from '@components/button';
import SearchInput from '@components/searchSelect';
import Tag from '@components/tag';

import { MatchInfoContext } from './MatchInfoProvider';

const { Option } = Select;

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  gap: 20px;
  align-items: center;
  > div {
    flex-basis: 100px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterMatch = () => {
  const { matchData, setMatchData } = useContext(MatchInfoContext);
  const { status } = matchData;

  const onChange = (value: number | string, optionObj: any) => {
    const key = optionObj?.key.split('Option')[0];
    setMatchData({
      ...matchData,
      [key]: value,
    });
  };
  return (
    <Container>
      <SearchContainer>
        <SearchInput />
      </SearchContainer>
      {status === '' ? (
        <Button
          value={'OPEN'}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const [value, optionObj] = [
              e.currentTarget.value,
              { key: 'statusOption' },
            ];
            onChange(value, optionObj);
          }}
        >
          마감가리기
        </Button>
      ) : (
        <Button
          value={''}
          color="yellow"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const [value, optionObj] = [
              e.currentTarget.value,
              { key: 'statusOption' },
            ];
            onChange(value, optionObj);
          }}
        >
          전체조회
        </Button>
      )}
      <Select onChange={onChange} placeholder="성별">
        {[
          { label: '남', value: 'MALE' },
          { label: '여', value: 'FEMALE' },
          { label: '남/여', value: 'ALL' },
        ].map((str, index) => {
          return (
            <Option key={`genderOption${index}`} value={str.value}>
              {str.label}
            </Option>
          );
        })}
      </Select>
      <Select onChange={onChange} placeholder="인원">
        {[
          { label: '5vs5', value: 10 },
          { label: '6vs6', value: 12 },
          { label: '9vs9', value: 18 },
        ].map((str, index) => {
          return (
            <Option key={`personnelOption${index}`} value={str.value}>
              {str.label}
            </Option>
          );
        })}
      </Select>
    </Container>
  );
};

export default FilterMatch;
