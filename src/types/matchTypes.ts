interface MatchInfo {
  stadiumId: number;
  matchNum: number;
  gender: string;
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

export type { MatchInfo, MatchKeys };
