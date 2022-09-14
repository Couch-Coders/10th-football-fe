import { Input } from 'antd';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';

import Button from '@components/button';
import Checkbox from '@components/checkboxGroup';
import InputForm, { Section } from '@components/inputForm';
import Modal from '@components/modal';
import type { ModalProps } from '@components/modal';
import { ErrorToast, SuccessToast } from '@components/toasts';
import type {
  CreateStadiumProps,
  StadiumListProps,
} from '@custype/stadiumTypes';
import { saveFileInFirebaseStorageByAdminApi } from '@service/filesApi';
import { createStadiumApi, updateStadiumApi } from '@service/stadiumApi';

const { TextArea } = Input;

interface StadiumCreateModalProps extends ModalProps {
  stadiumInfoForUpdate?: StadiumListProps | null;
}

const StadiumCreateModal = ({
  stadiumInfoForUpdate,
  ...rest
}: StadiumCreateModalProps) => {
  const [stadiumInfo, setStadiumInfo] = useState<CreateStadiumProps>({
    name: '',
    content: '',
    parking: false,
    rental: false,
    address: '',
    files: [],
  });
  console.log(stadiumInfoForUpdate);
  const [imgFormData, setImgFormData] = useState<FormData | null>(null);

  useEffect(() => {
    setStadiumInfo(
      stadiumInfoForUpdate ?? {
        name: '',
        content: '',
        parking: false,
        rental: false,
        address: '',
        files: [],
      },
    );
  }, [stadiumInfoForUpdate?.id]);

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

  const createStadium = async (type: string) => {
    const { address, content, name } = stadiumInfo;
    if (!address || !content || !name) {
      ErrorToast('작성하지 않으신 부분이 있습니다. 확인 후 다시 시도해주세요.');
      return;
    }
    try {
      if (type === 'update') {
        await updateStadiumApi(stadiumInfoForUpdate?.id ?? 0, stadiumInfo);
      } else {
        await createStadiumApi(stadiumInfo);
      }
      alert('저장되었습니다!');
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
            value={stadiumInfo.address}
          />
        </Section>
        <Section header="경기장 이름">
          <Input
            name="name"
            placeholder="경기장 이름을 입력하세요"
            onChange={onChange}
            value={stadiumInfo.name}
          />
        </Section>
        <Section header="경기장 특이사항">
          <div className="flex-column gap-1">
            <TextArea
              name="content"
              onChange={onChange}
              value={stadiumInfo.content}
            />
            <Checkbox
              className={stadiumInfoForUpdate ? 'display-none' : ''}
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
        <Section
          header="경기장 사진 등록"
          className={stadiumInfoForUpdate ? 'display-none' : ''}
        >
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
        {stadiumInfoForUpdate ? (
          <Button
            onClick={() => createStadium('update')}
            style={{ marginTop: '1rem' }}
          >
            수정
          </Button>
        ) : (
          <Button onClick={() => createStadium('create')}>저장</Button>
        )}
      </InputForm>
    </Modal>
  );
};

export default StadiumCreateModal;
