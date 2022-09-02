import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Select } from 'antd';
import { MatchInfoContext } from '@src/pages/home/matchSelector/MatchInfoProvider';

const { Option } = Select;
const dummy = ['강남구', '마포구', '송파구'];

// https://ant.design/components/select/
// fetch: handleSearch 함수를 통해 불리우며, 검색한 단어와 검색 후
// 수행할 callback 함수를 받아 수행 debounce 사용

// 실제 데이터를 가져올 경우 getSearchMatchList 함수만 수정하면 될 것 같아 보임.
let timeout: any;
let currentValue: string;

const fetch = (value: string, callback: Dispatch<SetStateAction<any[]>>) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  const getSearchMatchList = () => {
    /* 수정 필요
    1. dummy => 백엔드에서 받은 주소로 대체
    2. dummy 배열을 통해 includes 매서드로만 구분
    */
    const tempArray = dummy
      .filter((addr) => addr.includes(currentValue))
      .map((addr) => ({ value: addr, text: addr }));
    callback(tempArray);
  };

  timeout = setTimeout(getSearchMatchList, 300);
};

/* 수정 필요 (검색 후)
    handleChange을 통해 사용자가 input field에 입력한 단어가 검색 함수를 거친 후 그대로 남음
    따라서, 사용자가 검색 후 나온 값을 선택 할 경우 input field를 비워주는 액션이 필요해 보임.
*/
const SearchInput: React.FC<{
  placeholder: string;
  style: React.CSSProperties;
}> = (props) => {
  const [data, setData] = useState<any[]>([]);
  const [value, setValue] = useState<string>();
  const { matchData, setMatchData } = useContext(MatchInfoContext);

  const handleSearch = (newValue: string) => {
    if (newValue) {
      fetch(newValue, setData);
    } else {
      setData([]);
    }
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setMatchData({
      ...matchData,
      address: newValue,
    });
  };

  const options = data.map((d) => <Option key={d.value}>{d.text}</Option>);

  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
    >
      {options}
    </Select>
  );
};

const SearchSelect = () => (
  <SearchInput
    placeholder="선호하시는 지역을 입력해주세요."
    style={{ width: '300px' }}
  />
);
export default SearchSelect;
