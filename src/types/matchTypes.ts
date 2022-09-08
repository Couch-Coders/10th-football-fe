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

export type { CreateMatchInfo, MatchKeys };
