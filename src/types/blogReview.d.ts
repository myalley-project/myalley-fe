export interface BlogReviewPost {
  blogInfo: {
    title: string;
    viewDate: string;
    time: string;
    transportation: string;
    revisit: string;
    congestion: string;
    content: string;
    exhibition: number;
  };
  images: FormData[] | [];
}

export interface BlogReviewPatch {
  viewDate: string;
  title: string;
  transportation: string;
  revisit: string;
  congestion: string;
  time: string;
  content: string;
}

// interface BlogImagePost {

// }
