import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserAPI, createUser } from '@service/userApi';
import type { UserInfo } from '@service/userApi';

interface UserKeys {
  uid: number;
  name: string;
  email: string;
  gender: string;
  role: string;
}

interface User {
  user: UserKeys | null;
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
  user: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfoByToken.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(getUserInfoByToken.rejected, (state, action) => {
      console.log('error while operating getUserInfoByToken: ', action);
    });
    builder.addCase(createUserBySelf.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(createUserBySelf.rejected, (state, action) => {
      console.error('error while operating createUserBySelf:');
      console.log('delete token');
      localStorage.removeItem('token');
    });
  },
});

// reducer example
// const userSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers: {
//       getUser(state, action: PayloadAction<UserState>) {
//         const { id, name, email, gender, role } = action.payload;
//         state.id = id;
//         state.name = name;
//         state.email = email;
//         state.gender = gender;
//         state.role = role;
//       },
//     },
//   });

const { actions, reducer } = userSlice;
export { getUserInfoByToken, createUserBySelf };

export default reducer;
