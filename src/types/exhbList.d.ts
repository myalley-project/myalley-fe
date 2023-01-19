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

export type FilterType = "전체" | "영상" | "특별" | "기획" | "상설" | "소장품";

export interface PagesState {
  started: number;
  selected: number;
}

export interface ExhbTypeFilters {
  selected: FilterType;
  applied: FilterType;
}
