import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUserAPI, createUser } from '@service/userApi';
import type { UserInfo } from '@service/userApi';

interface UserKeys {
  uid: string;
  username: string;
  email: string;
  gender: string;
  role: string;
}

interface User {
  profile: UserKeys;
  isAuthenticaton: boolean;
}

const getUserInfoByToken = createAsyncThunk(
  // string action type value: 이 값에 따라 pending, fulfilled, rejected 가 붙어
  // action creator을 반환한다.
  // ex) GET_USER_INFO.pending
  'users/getByToken',
  // payload creator callback
  async (token: string) => {
    const response = await getUserAPI(token);
    return response.data;
  },
  // 3 param: condition을 통해 비동기 함수 실행 전 실행을 취소 할 수 있다.
);

const createUserBySelf = createAsyncThunk(
  'users/createUser',
  async (userInfo: UserInfo) => {
    const response = await createUser(userInfo);
    return response.data;
  },
);

const initialState: User = {
  profile: {
    uid: '',
    username: '',
    email: '',
    gender: '',
    role: '',
  },
  isAuthenticaton: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signOut: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfoByToken.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isAuthenticaton = true;
    });
    builder.addCase(getUserInfoByToken.rejected, (state, action) => {
      if (action?.error?.message === 'NEW_USER') {
        return;
      }
      console.log('error while operating getUserInfoByToken: ', action);
    });
    builder.addCase(
      createUserBySelf.fulfilled,
      (state, action) => action.payload,
    );
    builder.addCase(createUserBySelf.rejected, (state, action) => {
      console.error('error while operating createUserBySelf:');
      localStorage.removeItem('token');
    });
  },
});

const { actions, reducer } = userSlice;
export const { signOut } = actions;
export { getUserInfoByToken, createUserBySelf };
export type { User };

export default reducer;
