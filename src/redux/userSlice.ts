import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@src/app/store';

interface UserState {
  id: number;
  name: string;
  email: string;
  gender: string;
  role: string;
}

const initialState: UserState = {
  id: 0,
  name: '',
  email: '',
  gender: '',
  role: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUser(state, action: PayloadAction<UserState>) {
      const { id, name, email, gender, role } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.gender = gender;
      state.role = role;
    },
  },
});

export const { getUser } = userSlice.actions;

export const selectUser = (state: RootState) => state;

export default userSlice.reducer;
