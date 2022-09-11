import { Card } from 'antd';
import cs from 'classnames';
import csb from 'classnames/bind';
import React from 'react';
import '@assets/card.scss';

interface SimpleCardProps {
  children: React.ReactNode;
  background?: string;
  title?: string;
  classNames?: string;
  headerColor?: string;
  borderRadius?: boolean;
  style?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg' | '';
}

const SimpleCard = ({
  children,
  background = '#ebe6e6',
  classNames = '',
  headerColor = 'black',
  borderRadius = false,
  style,
  size = '',
  ...rest
}: SimpleCardProps) => {
  return (
    <Card
      className={cs(
        'simple-card',
        classNames,
        `header-${headerColor}`,
        { borderRadius },
        size,
      )}
      style={{ ...style, backgroundColor: background }}
      {...rest}
    >
      {children}
    </Card>
  );
};

export default SimpleCard;
