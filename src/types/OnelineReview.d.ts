export interface OnelineReviewPostType {
  exhibitionId: number;
  date: {
    year: string;
    month: string;
    day: string;
  };
  time: {
    enterence: string;
    exit: string;
  };
  congestion: string;
  rate: number;
  content: string;
}
