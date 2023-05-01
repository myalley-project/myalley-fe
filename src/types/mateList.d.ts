export interface Mate {
  mateId: number;
  title: string;
  availableDate: string; // YYYY-MM-DD
  status: "모집 중" | "모집 완료";
  mateGender: "남성" | "여성" | "성별무관";
  mateAge: string; // n0대 x반 ~ n0대 x반
  createdAt: string; // YYYY-MM-DD
  viewCount: number;
  memberId?: number; // 메이트글 목록페이지, 전시글 상세페이지 메이트찾기 탭에 해당
  memberNickname?: string; // 메이트글 목록페이지, 전시글 상세페이지 메이트찾기 탭에 해당
  exhibition: {
    exhibitionId: number;
    exhibitionTitle: string;
    posterUrl: string;
    exhibitionStatus: "지난 전시" | "현재 전시" | "예정 전시";
  };
}

export interface MateListType {
  mates: Mate[];
  title: string;
  totalPage: number;
}
