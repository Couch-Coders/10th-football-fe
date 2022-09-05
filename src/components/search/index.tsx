import React, { Dispatch, useState, SetStateAction } from 'react';
import { Select } from 'antd';
import { AxiosResponse } from 'axios';

const { Option } = Select;

let timeout: ReturnType<typeof setTimeout> | null;

const fetch = (
  value: string,
  callback: (data: Array<{ value: string; text: string }>) => void,
  searchApi: (address: string) => Promise<AxiosResponse<any, any>>,
) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }

  const fake = () => {
    searchApi(value)
      .then((res) => {
        const list = res.data.map(
          (d: { id: number; name: string; address: string }) => ({
            value: d.id,
            text: `${d.name}(${d.address})`,
          }),
        );
        callback(list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  timeout = setTimeout(fake, 300);
};

/* 수정 필요 (검색 후)
    handleChange을 통해 사용자가 input field에 입력한 단어가 검색 함수를 거친 후 그대로 남음
    따라서, 사용자가 검색 후 나온 값을 선택 할 경우 input field를 비워주는 액션이 필요해 보임.
*/

interface SearchSelectProps {
  placeholder: string;
  style: React.CSSProperties;
  searchApi: (address: string) => Promise<AxiosResponse<any, any>>;
  value: number;
  onChange: (d: number) => void;
}

const SearchInput: React.FC<SearchSelectProps> = (props) => {
  const [data, setData] = useState<any[]>([]);
  // const [value, setValue] = useState<string>();

  const handleSearch = (newValue: string) => {
    if (newValue) {
      fetch(newValue, setData, props.searchApi);
    } else {
      setData([]);
    }
  };

  const handleChange = (newValue: number) => {
    props.onChange(newValue);
  };

  const options = data.map((d) => <Option key={d.value}>{d.text}</Option>);

  return (
    <Select
      showSearch
      value={props.value ? props.value : null}
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

const SearchSelect = ({
  placeholder,
  style,
  searchApi,
  value,
  onChange,
}: SearchSelectProps) => (
  <SearchInput
    placeholder={placeholder}
    style={style}
    searchApi={searchApi}
    value={value}
    onChange={onChange}
  />
);
export default SearchSelect;
