export interface MateRes {
  id: number;
  title: string;
  status: "모집 중" | "모집 완료";
  mateGender: "여성" | "남성" | "성별 무관";
  mateAge: "연령 무관" | string; // n0대 초,중,후반 ~ n0대 초,중,후반
  availableDate: string; // yyyy-mm-dd
  content: string;
  contact: string;
  viewCount: number;
  createdAt: string; // LocalDateTime 2021-11-08T11:44:30.327959
  bookmarkCount: number;
  bookmarked: false;
  exhibition: {
    exhibitionId: number;
    exhibitionTitle: string;
    exhibitionSpace: string;
    exhibitionType: string;
    posterUrl: string;
    exhibitionDuration: string; // yyyy-mm-dd ~ yyyy-mm-dd
    status: "현재 전시" | "예정 전시" | "지난 전시";
    type: string;
  };
  member: {
    memberId: number;
    memberNickname: string;
    memberProfileImg: string;
    memberGender: "W" | "M";
    memberAge: string; // yyyy
  };
}

export interface MateWriteType {
  title: string;
  status: "모집 중" | "모집 완료";
  mateGender: "성별 무관" | "남성" | "여성";
  mateAge: "연령 무관" | string; // n0대 x반 ~ n0대 x반
  availableDate: "미정" | string; // YYYY-MM-DD
  content: string;
  contact: string;
  exhibitionId: number;
}
