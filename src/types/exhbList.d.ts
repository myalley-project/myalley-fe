export interface Exhibition {
  id: number;
  title: string;
  posterUrl: string;
  duration: string;
  type: string;
  status: string;
  space: string;
  viewCount: number;
}

export type FilterType =
  | "전체 전시"
  | "영상 전시"
  | "특별 전시"
  | "기획 전시"
  | "상설 전시"
  | "소장품 전시"
  | "그림 전시"
  | "사진 전시"
  | "자유 출품 전시"
  | "기타";

export type SortType = "최신순" | "조회수순";
