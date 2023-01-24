export interface Mate {
  mateId: number;
  title: string;
  availableDate: string;
  status: string;
  mateGender: string;
  mateAge: string;
  createdAt: string;
  viewCount: number;
  memberId?: number;
  memberNickname?: string;
  exhibition: {
    exhibitionId: number;
    exhibitionTitle: string;
    exhibitionSpace: string;
    posterUrl: string;
    exhibitionStatus: string;
  };
}
