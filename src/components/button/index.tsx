import React from 'react';
import { Button as AntdButton } from 'antd';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ children, ...rest }: Props) => {
  return (
    <AntdButton type="primary" {...rest}>
      {children}
    </AntdButton>
  );
};

export default Button;
