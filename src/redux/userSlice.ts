import { getUserAPI } from '@service/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
    // token = undefined 일때 방어로직 삽입
    if (token) {
      try {
        const response = await getUserAPI(token);
        console.log('response: ', response);
        return response.data;
      } catch (err) {
        console.log('error handling in getUserInfo');
        return 'error handling in getUserInfo';
      }
    }
  },
  // 3 param: condition을 통해 비동기 함수 실행 전 실행을 취소 할 수 있다.
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
      console.log(state.user);
      console.log(action.payload.user);
      state.user = action.payload.user;
      console.log('state: ', state.user);
      // return action.payload;
    });
    builder.addCase(getUserInfoByToken.rejected, (state, action) => {
      console.log('error while operating getUserInfoByToken: ', action);
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
export { getUserInfoByToken };

export default reducer;
