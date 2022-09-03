import React, { useState } from 'react';
import Modal from '@components/modal';
import type { ModalProps } from '@components/modal';

const StadiumCreateModal = ({ ...rest }: ModalProps) => {
  return <Modal {...rest}>hello world</Modal>;
};

export default StadiumCreateModal;
