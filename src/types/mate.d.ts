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
    posterUrl: string;
    exhibitionDuration: string; // yyyy-mm-dd ~ yyyy-mm-dd
    status: "현재 전시" | "예정 전시" | "지난 전시";
  };
  member: {
    memberId: number;
    memberNickname: string;
    memberProfileImg: string;
    memberGender: "W" | "M";
    memberAge: string; // yyyy
  };
}
