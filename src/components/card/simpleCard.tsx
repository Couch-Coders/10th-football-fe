import React from 'react';
import { Card } from 'antd';
import '@assets/card.scss';

interface SimpleCardProps {
  children: React.ReactNode;
  background?: string;
}

const SimpleCard = ({ children, background = '#FAFAFA' }: SimpleCardProps) => {
  return (
    <Card className="simple-card" style={{ backgroundColor: background }}>
      {children}
    </Card>
  );
};

export default SimpleCard;
