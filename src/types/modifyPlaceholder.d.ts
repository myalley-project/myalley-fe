export type ModifyPlaceholder = {
  id: number;
  viewDate: string;
  rate: number;
  content: string;
  time: string;
  congestion: string;
  memberInfo?: {
    memberId: number;
    nickname: string;
    memberImage: string;
  };
};
