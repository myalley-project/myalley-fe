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

export interface BlogReviewCardProps {
  id: number;
  title: string;
  writer: string;
  viewDate: string;
  viewCount: number;
  imageInfo: {
    id: number;
    url: string;
  };
}

type ImageInfo = {
  id: string;
  url: string;
};

export interface BlogReviewInfo {
  id: number;
  title: string;
  writer: string;
  viewDate: string;
  viewCount: number;
  imageInfo: {
    id: string;
    url: string;
  };
}

type PageInfo = {
  page: number;
  size: number;
  totalElement: number;
  totalPage: number;
};

export interface BlogReviewResponse {
  blogInfo: BlogReviewInfo[];
  pageInfo: PageInfo;
}
