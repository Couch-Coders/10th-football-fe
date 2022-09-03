import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import '@assets/modal.scss';

interface ModalProps {
  children?: React.ReactNode;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  header: string;
  height?: string;
}

const BaseModal = ({
  children,
  header,
  height = '375px',
  ...rest
}: ModalProps) => {
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
      bodyStyle={{ height }}
    >
      {children}
    </Modal>
  );
};

export type { ModalProps };
export default BaseModal;
