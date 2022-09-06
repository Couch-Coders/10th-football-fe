import React from 'react';
import { Button as AntdButton } from 'antd';
import '@assets/button.scss';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  color?: string;
  style?: React.CSSProperties;
}

const Button = ({ children, color, ...rest }: Props) => {
  return (
    <AntdButton type="primary" {...rest} className={color}>
      {children}
    </AntdButton>
  );
};

export default Button;
