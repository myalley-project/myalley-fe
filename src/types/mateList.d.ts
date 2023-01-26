export interface Mate {
  mateId: number;
  title: string;
  availableDate: string;
  status: "모집 중" | "모집 완료";
  mateGender: "남성" | "여성" | "성별무관";
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
    exhibitionStatus: "지난 전시" | "현재 전시" | "예정 전시";
  };
}
