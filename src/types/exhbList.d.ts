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

export interface ExhbTypeFilters {
  selected: FilterType;
  applied: FilterType;
}

export type FilterType =
  | "전체 전시"
  | "영상 전시"
  | "특별 전시"
  | "기획 전시"
  | "상설 전시"
  | "소장품 전시";
