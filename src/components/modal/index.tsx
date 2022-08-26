import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import '@assets/modal.scss';

interface Props {
  children: React.ReactNode;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  header: string;
}

const BaseModal = ({ children, header, ...rest }: Props) => {
  useEffect(() => {
    if (rest.visible) {
      const headerEl = document.getElementsByClassName('ant-modal-close-x')[0];

      const mySpan = document.createElement('span');
      mySpan.innerHTML = header;

      headerEl.prepend(mySpan);
    }
  }, [rest.visible]);

  if (!rest.visible) return null;
  return (
    <Modal
      footer={null}
      {...rest}
      wrapClassName={'custom-antd-modal'}
      bodyStyle={{ height: '375px' }}
    >
      {children}
    </Modal>
  );
};

export default BaseModal;
