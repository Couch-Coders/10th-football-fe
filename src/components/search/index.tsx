import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const fetch = (
  value: string,
  callback: (data: Array<{ value: string; text: string }>) => void,
) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  const fake = () => {
    // const str = qs.stringify({
    //   code: 'utf-8',
    //   q: value,
    // });
    // jsonp(`https://suggest.taobao.com/sug?${str}`)
    //   .then((response: any) => response.json())
    //   .then((d: any) => {
    //     if (currentValue === value) {
    //       const { result } = d;
    //       const data = result.map((item: any) => ({
    //         value: item[0],
    //         text: item[0],
    //       }));
    //       callback(data);
    //     }
    //   });
  };

  timeout = setTimeout(fake, 300);
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

  const handleSearch = (newValue: string) => {
    if (newValue) {
      fetch(newValue, setData);
    } else {
      setData([]);
    }
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
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

interface SearchSelectProps {
  placeholder: string;
  style: React.CSSProperties;
}

const SearchSelect = ({ placeholder, style }: SearchSelectProps) => (
  <SearchInput placeholder={placeholder} style={style} />
);
export default SearchSelect;
