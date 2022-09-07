import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getMatch } from '@service/matchApi';

interface MatchInfoProps {
  startAt: string;
  stadium: {
    name: string;
    address: string;
    likeCount: number;
    parking: boolean;
    rental: boolean;
  };
  matchApplicants: Array<{
    uid: number | string;
    username: string;
  }>;
  rest: number;
  gender: 'MALE' | 'FEMALE' | 'ALL';
  matchNum: 10 | 12 | 18;
  content: string;
  matchReviews: [{ uid: string; content: string; createdDate: string }];
}

const initialState: MatchInfoProps = {
  startAt: '',
  stadium: {
    name: '',
    address: '',
    likeCount: 0,
    parking: false,
    rental: false,
  },
  matchApplicants: [{ uid: '', username: '' }],
  rest: 0,
  matchNum: 10,
  gender: 'MALE',
  content: '',
  matchReviews: [{ uid: '', content: '', createdDate: '' }],
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
