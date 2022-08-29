import React, { useState } from 'react';
import styled from 'styled-components';
import SearchInput from '@components/searchSelect';
import Tag from '@src/components/tag';
import { Select } from 'antd';

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
  const [selectInfo, setSelectInfo] = useState({
    deadline: 0,
    sex: 0,
    numOfPeople: 0,
  });
  // !!!!!!!!!!!!!!!!!!
  // optionObj..?
  // optionObj = {key: string, value: number, children: string}
  const onChange = (value: number, optionObj: any) => {
    const key = optionObj?.key.split('Option')[0];
    setSelectInfo({
      ...selectInfo,
      [key]: value,
    });
  };
  console.log(selectInfo);
  return (
    <Container>
      <SearchContainer>
        <SearchInput />
        <div>
          <Tag>Tag Example1</Tag>
          <Tag>Tag Example2</Tag>
          <Tag>Tag Example3</Tag>
        </div>
      </SearchContainer>
      <Select onChange={onChange} defaultValue={0}>
        {['마감 가리기', '마감 보이기'].map((str, index) => {
          return (
            <Option key={`deadlineOption${index}`} value={index}>
              {str}
            </Option>
          );
        })}
      </Select>

      <Select onChange={onChange} defaultValue={0}>
        {['남', '여', '남/여'].map((str, index) => {
          return (
            <Option key={`sexOption${index}`} value={index}>
              {str}
            </Option>
          );
        })}
      </Select>
      <Select onChange={onChange} defaultValue={0}>
        {['5vs5', '6vs6', '9vs9'].map((str, index) => {
          return (
            <Option key={`numOfPeopleOption${index}`} value={index}>
              {str}
            </Option>
          );
        })}
      </Select>
    </Container>
  );
};

export default FilterMatch;
