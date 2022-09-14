import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import styled from 'styled-components';

interface CheckboxGroupProps {
  options: Array<{ label: string; value: string | number }>;
  onChange: (d: CheckboxValueType[]) => void;
  className?: string;
}

const CheckboxGroup = ({
  options,
  onChange,
  className,
}: CheckboxGroupProps) => {
  return (
    <Checkbox.Group
      options={options}
      onChange={onChange}
      className={className}
    />
  );
};

export default CheckboxGroup;
