import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getMatch } from '@service/matchApi';

interface MatchInfoProps {
  startAt: string;
  stadium: {
    name: string;
    address: string;
  };
  matchApplicants: Array<{
    uid: number | string;
    username: string;
  }>;
}

const initialState: MatchInfoProps = {
  startAt: '',
  stadium: {
    name: '',
    address: '',
  },
  matchApplicants: [{ uid: '', username: '' }],
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    getMatchInfo: (state, action: PayloadAction<MatchInfoProps>) =>
      action.payload,
  },
});

export const { getMatchInfo } = matchSlice.actions;
export default matchSlice.reducer;
