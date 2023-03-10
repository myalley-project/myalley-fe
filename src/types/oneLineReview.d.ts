export interface OnelineReviewPostType {
  exhibitionId: number;
  date: {
    year: string;
    month: string;
    day: string;
  };
  time: string;
  congestion: string;
  rate: number;
  content: string;
}

export type OnelineReviewCardType = {
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

export type MypageOnelineReviewCardType = {
  id: number;
  viewDate: string;
  rate: number;
  content: string;
  time: string;
  congestion: string;
  exhibitionInfo?: {
    id: number;
    title: string;
  };
};

export interface OnelineReviewReadType {
  simpleInfo: OnelineReviewCardType[];
  pageInfo: {
    page: number;
    size: number;
    totalElement: number;
    totalPage: number;
  };
}
