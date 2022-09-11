import { message } from 'antd';
import React from 'react';

const SuccessToast = () => {
  void message.success('성공');
};

const ErrorToast = (error: string = '오류가 발생했습니다') => {
  void message.error(error);
};

export { SuccessToast, ErrorToast };
