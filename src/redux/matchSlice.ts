import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    files: Array<{ id: number; imageUrl: string }>;
  };
  matchApplicants: Array<{
    [key: string]: any;
    uid: number | string;
    username: string;
  }>;
  rest: number;
  gender: 'MALE' | 'FEMALE' | 'ALL';
  matchNum: 10 | 12 | 18;
  content: string;
  matchReviews: Array<{
    uid: string;
    content: string;
    createdDate: string;
    username: string;
  }>;
  likeStatus?: boolean;
  applyStatus?: boolean;
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
    files: [],
  },
  matchApplicants: [{ uid: '', username: '' }],
  rest: 0,
  matchNum: 10,
  gender: 'MALE',
  content: '',
  matchReviews: [],
  likeStatus: false,
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
        likeStatus: boolean;
        applyStatus: boolean;
      }>,
    ) => {
      const combinedMatchInfo = {
        ...action.payload.match,
        matchApplicants: action.payload.matchApplicants,
        matchReviews: action.payload.matchReviews,
        likeStatus: action.payload.likeStatus,
        applyStatus: action.payload.applyStatus,
      };
      return combinedMatchInfo;
    },
    increaseLikeCount: (state) => {
      state.stadium = {
        ...state.stadium,
        likeCount: state.stadium.likeCount + 1,
      };
      state.likeStatus = true;
    },
    decreaseLikeCount: (state) => {
      state.stadium = {
        ...state.stadium,
        likeCount: state.stadium.likeCount - 1,
      };
      state.likeStatus = false;
    },
  },
});

export const { getMatchInfo, increaseLikeCount, decreaseLikeCount } =
  matchSlice.actions;
export type { MatchInfoProps };
export default matchSlice.reducer;
