interface CreateStadiumProps {
  name: string;
  content: string;
  parking: boolean;
  rental: boolean;
  address: string;
  files: any[];
}

interface AppliedMatchInfoProps {
  applicationId: number;
  match: {
    id: number;
    stadium: {
      id: number;
      name: string;
    };
    startAt: string;
    status: string;
  };
}

interface StadiumListProps extends CreateStadiumProps {
  id: number;
}

export type { CreateStadiumProps, AppliedMatchInfoProps, StadiumListProps };
