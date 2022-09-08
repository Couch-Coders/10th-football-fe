import { Input } from 'antd';
import React, { useState } from 'react';

import Checkbox from '@components/checkboxGroup';
import InputForm, { Section } from '@components/inputForm';
import Modal from '@components/modal';
import type { ModalProps } from '@components/modal';
import type { CreateStadiumProps } from '@custype/stadiumTypes';

const { TextArea } = Input;
const formData = new FormData();

const StadiumCreateModal = ({ ...rest }: ModalProps) => {
  const [stadiumInfo, setStadiumInfo] = useState<CreateStadiumProps>({
    name: '',
    content: '',
    parking: false,
    rental: false,
    address: '',
    imageUrl: '',
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setStadiumInfo({
      ...stadiumInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal height="auto" {...rest}>
      <InputForm>
        <Section header="경기장 주소">
          <Input
            name="address"
            placeholder="경기장 주소를 입력하세요"
            onChange={onChange}
          />
        </Section>
        <Section header="경기장 특이사항">
          <div className="flex-column gap-1">
            <TextArea name="content" onChange={onChange} />
            <Checkbox
              options={[
                { label: '풋살 대여', value: 'rental' },
                { label: '주차 여부', value: 'parking' },
              ]}
              onChange={(d) => {
                const CHECK_VALUES = ['rental', 'parking'];
                const checkObj = CHECK_VALUES.map((value) =>
                  d.includes(value) ? { [value]: true } : { [value]: false },
                );
                setStadiumInfo({
                  ...stadiumInfo,
                  ...checkObj,
                });
              }}
            />
          </div>
        </Section>
        <Section header="경기장 사진 등록">
          <input
            type="file"
            multiple={true}
            accept="image/png, image/gif, image/jpeg"
            // Question
            // image따위의 파일들은 FormData을 통해 서버에 보내야 한다.
            // 보내는 방법
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files?.[0]) {
                const data = new FormData();
                data.append('test', e.target.files[0]);
                console.log(data);
              }
            }}
          />
        </Section>
      </InputForm>
    </Modal>
  );
};

export default StadiumCreateModal;
