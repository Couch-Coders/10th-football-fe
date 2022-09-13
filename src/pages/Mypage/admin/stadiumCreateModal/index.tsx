import { Input } from 'antd';
import { AxiosError } from 'axios';
import React, { useState } from 'react';

import Button from '@components/button';
import Checkbox from '@components/checkboxGroup';
import InputForm, { Section } from '@components/inputForm';
import Modal from '@components/modal';
import type { ModalProps } from '@components/modal';
import { ErrorToast, SuccessToast } from '@components/toasts';
import type { CreateStadiumProps } from '@custype/stadiumTypes';
import { saveFileInFirebaseStorageByAdminApi } from '@service/filesApi';
import { createStadiumApi } from '@service/stadiumApi';

const { TextArea } = Input;

const StadiumCreateModal = ({ ...rest }: ModalProps) => {
  const [stadiumInfo, setStadiumInfo] = useState<CreateStadiumProps>({
    name: '',
    content: '',
    parking: false,
    rental: false,
    address: '',
    files: [],
  });
  const [imgFormData, setImgFormData] = useState<FormData | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setStadiumInfo({
      ...stadiumInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeImgFormData = (files: FileList | null) => {
    if (!files) return;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    setImgFormData(formData);
  };
  const fileUploads = async () => {
    if (!imgFormData) return;
    try {
      const res = await saveFileInFirebaseStorageByAdminApi(imgFormData);
      setStadiumInfo({
        ...stadiumInfo,
        files: res.data,
      });
      SuccessToast('등록되었습니다!');
    } catch (error) {
      if (error instanceof AxiosError) {
        ErrorToast(error.message);
      } else {
        console.error(error);
        ErrorToast();
      }
    }
  };

  const createStadium = async () => {
    const { address, content, files, name } = stadiumInfo;
    if (!address || !content || !name) {
      ErrorToast('작성하지 않으신 부분이 있습니다. 확인 후 다시 시도해주세요.');
      return;
    }
    try {
      const res = await createStadiumApi(stadiumInfo);
      alert('경기생성 성공!');
      location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        ErrorToast(error.message);
      } else {
        console.error(error);
        ErrorToast();
      }
    }
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
        <Section header="경기장 이름">
          <Input
            name="name"
            placeholder="경기장 이름을 입력하세요"
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
            multiple
            accept="image/png, image/gif, image/jpeg"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeImgFormData(e.target.files)
            }
          />
          <Button onClick={fileUploads} disabled={!imgFormData}>
            {stadiumInfo.files.length !== 0 ? '등록완료' : '파일등록'}
          </Button>
        </Section>
        <Button onClick={createStadium}>저장</Button>
      </InputForm>
    </Modal>
  );
};

export default StadiumCreateModal;
