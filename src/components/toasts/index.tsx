import { message } from 'antd';
import React from 'react';

const SuccessToast = (msg: string = '성공') => {
  void message.success(msg);
};

const ErrorToast = (error: string = '오류가 발생했습니다') => {
  void message.error(error);
};

export { SuccessToast, ErrorToast };
