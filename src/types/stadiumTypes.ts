interface CreateStadiumProps {
  name: string;
  content: string;
  parking: boolean;
  rental: boolean;
  address: string;
  imageUrl: string;
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

export type { CreateStadiumProps, AppliedMatchInfoProps };
