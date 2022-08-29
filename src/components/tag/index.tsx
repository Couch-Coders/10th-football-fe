import { Tag as AntTag } from 'antd';
import React from 'react';

const Tag = ({ children }: { children: React.ReactNode }) => {
  return <AntTag>{children}</AntTag>;
};

export default Tag;
