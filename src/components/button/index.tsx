import React from 'react';
import { Button as AntdButton } from 'antd';

interface Props {
  children: JSX.Element | string;
}

const Button = ({ children }: Props) => {
  return <AntdButton type="primary">{children}</AntdButton>;
};

export default Button;
