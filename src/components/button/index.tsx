import { Button as AntdButton } from 'antd';
import React from 'react';
import '@assets/button.scss';

interface Props {
  children: React.ReactNode;
  onClick: (e: any | null) => void;
  color?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  value?: any;
  danger?: any;
}

const Button = ({ children, color, ...rest }: Props) => {
  return (
    <AntdButton type="primary" {...rest} className={color}>
      {children}
    </AntdButton>
  );
};

export default Button;
