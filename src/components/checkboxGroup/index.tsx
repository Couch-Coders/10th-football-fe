import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import styled from 'styled-components';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

interface CheckboxGroupProps {
  options: Array<{ label: string; value: string | number }>;
  onChange: (d: CheckboxValueType[]) => void;
}

const CheckboxGroup = ({ options, onChange }: CheckboxGroupProps) => {
  return <Checkbox.Group options={options} onChange={onChange} />;
};

export default CheckboxGroup;
