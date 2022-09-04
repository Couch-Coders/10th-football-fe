import React from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

interface RadioGroupProps {
  options: Array<{ label: string; value: string | number }>;
  onChange: (d: RadioChangeEvent) => void;
  value: string | number;
}

const RadioGroup = ({ options, onChange, value }: RadioGroupProps) => {
  return (
    <Radio.Group onChange={onChange} value={value}>
      {options.map(({ label, value }, index) => {
        return (
          <Radio key={`radio_${value}_${index}`} value={value}>
            {label}
          </Radio>
        );
      })}
    </Radio.Group>
  );
};

export default RadioGroup;
