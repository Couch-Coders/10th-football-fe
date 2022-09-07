import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getMatch } from '@service/matchApi';

interface MatchInfoProps {
  startAt: string;
  stadium: {
    name: string;
    address: string;
    likeCount: number;
  };
  matchApplicants: Array<{
    uid: number | string;
    username: string;
  }>;
  rest: number;
  gender: string;
  matchNum: number;
}

const initialState: MatchInfoProps = {
  startAt: '',
  stadium: {
    name: '',
    address: '',
    likeCount: 0,
  },
  matchApplicants: [{ uid: '', username: '' }],
  rest: 0,
  matchNum: 0,
  gender: 'MALE',
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
export type { MatchInfoProps };
export default matchSlice.reducer;
