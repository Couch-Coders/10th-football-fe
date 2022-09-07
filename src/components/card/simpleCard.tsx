import { Card } from 'antd';
import cs from 'classnames';
import React from 'react';
import '@assets/card.scss';

interface SimpleCardProps {
  children: React.ReactNode;
  background?: string;
  title?: string;
  classNames?: string;
  headerColor?: string;
  borderRadius?: boolean;
}

const SimpleCard = ({
  children,
  background = '#ebe6e6',
  classNames = '',
  headerColor = 'black',
  borderRadius = false,
  ...rest
}: SimpleCardProps) => {
  return (
    <Card
      className={cs('simple-card', classNames, `header-${headerColor}`, {
        borderRadius,
      })}
      style={{ backgroundColor: background }}
      {...rest}
    >
      {children}
    </Card>
  );
};

export default SimpleCard;
