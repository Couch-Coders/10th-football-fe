import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getMatch } from '@service/matchApi';

interface MatchInfoProps {
  id: number;
  startAt: string;
  stadium: {
    id: number;
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
  matchReviews: [
    { uid: string; content: string; createdDate: string; username: string },
  ];
}

const initialState: MatchInfoProps = {
  id: 0,
  startAt: '',
  stadium: {
    id: 0,
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
  matchReviews: [{ uid: '', content: '', createdDate: '', username: '' }],
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    getMatchInfo: (
      state,
      action: PayloadAction<{
        match: any;
        matchApplicants: any[];
        matchReviews: any[];
      }>,
    ) => {
      const combinedMatchInfo = {
        ...action.payload.match,
        matchApplicants: action.payload.matchApplicants,
        matchReviews: action.payload.matchReviews,
      };
      return combinedMatchInfo;
    },
    increaseLikeCount: (state) => {
      state.stadium = {
        ...state.stadium,
        likeCount: state.stadium.likeCount + 1,
      };
    },
    decreaseLikeCount: (state) => {
      state.stadium = {
        ...state.stadium,
        likeCount: state.stadium.likeCount - 1,
      };
    },
  },
});

export const { getMatchInfo, increaseLikeCount, decreaseLikeCount } =
  matchSlice.actions;
export type { MatchInfoProps };
export default matchSlice.reducer;
