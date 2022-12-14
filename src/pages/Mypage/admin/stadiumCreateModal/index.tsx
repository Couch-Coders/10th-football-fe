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
      SuccessToast('?????????????????????!');
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
      ErrorToast('???????????? ????????? ????????? ????????????. ?????? ??? ?????? ??????????????????.');
      return;
    }

    try {
      if (type === 'update') {
        await updateStadiumApi(stadiumInfoForUpdate?.id ?? 0, stadiumInfo);
      } else {
        await createStadiumApi(stadiumInfo);
      }
      alert('?????????????????????!');
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
        <Section header="????????? ??????">
          <Input
            name="address"
            placeholder="????????? ????????? ???????????????"
            onChange={onChange}
            value={stadiumInfo.address}
          />
        </Section>
        <Section header="????????? ??????">
          <Input
            name="name"
            placeholder="????????? ????????? ???????????????"
            onChange={onChange}
            value={stadiumInfo.name}
          />
        </Section>
        <Section header="????????? ????????????">
          <div className="flex-column gap-1">
            <TextArea
              name="content"
              onChange={onChange}
              value={stadiumInfo.content}
            />
            <Checkbox
              className={stadiumInfoForUpdate ? 'display-none' : ''}
              options={[
                { label: '?????? ??????', value: 'rental' },
                { label: '?????? ??????', value: 'parking' },
              ]}
              onChange={(d) => {
                const CHECK_VALUES = ['rental', 'parking'];
                const checkObj = CHECK_VALUES.map((value) =>
                  d.includes(value) ? { [value]: true } : { [value]: false },
                );
                const temp = Object.assign({}, ...checkObj);
                setStadiumInfo({
                  ...stadiumInfo,
                  ...temp,
                });
              }}
            />
          </div>
        </Section>
        <Section
          header="????????? ?????? ??????"
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
            {stadiumInfo.files.length !== 0 ? '????????????' : '????????????'}
          </Button>
        </Section>
        {stadiumInfoForUpdate ? (
          <Button
            onClick={() => createStadium('update')}
            style={{ marginTop: '1rem' }}
          >
            ??????
          </Button>
        ) : (
          <Button onClick={() => createStadium('create')}>??????</Button>
        )}
      </InputForm>
    </Modal>
  );
};

export default StadiumCreateModal;
