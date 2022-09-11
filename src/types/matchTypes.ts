interface PaginationProps {
  page?: number;
  size?: number;
}

interface CreateMatchInfo {
  stadiumId: number;
  matchNum: number;
  matchGender: string;
  content: string;
  startAt: string;
}

interface MatchKeys {
  matchDay?: string;
  gender?: string;
  status?: string;
  personnel?: number;
  stadiumName?: string;
}

interface MatchListProps {
  id: number;
  startAt: string;
  gender: 'MALE' | 'FEMALE' | 'ALL';
  stadium: {
    address: string;
    name: string;
  };
  matchNum: 10 | 12 | 18;
  status: 'OPEN' | 'CLOSE';
}

export type { PaginationProps, CreateMatchInfo, MatchKeys, MatchListProps };
