import { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
import { Mate } from "../types/mateList";
import { PageInfo } from "../types/pageInfo";
import { Exhibition } from "../types/exhbList";

// 내정보 조회(회원, 관리자 공통) api_박예선_23.02.08
export const getMyInfoApi = async () => {
  const res: AxiosResponse<MyInfoRes> = await apiInstance.get("/api/me");
  return res;
};

// 내 정보 수정
export const editMyInfoApi = async (reqBody: FormData) => {
  const res: AxiosResponse<EditMyInfoRes> = await apiInstance.put(
    "/api/me",
    reqBody
  );
  return res;
};

// 회원 탈퇴
export const withdrawalsApi = async () => {
  const res: AxiosResponse<EditMyInfoRes> = await apiInstance.delete(
    "/api/me/withdrawals"
  );
  return res;
};

// 내가 쓴 한줄 리뷰 목록 조회
export const mySimpleReviewsApi = async (pageNo: number) => {
  const res: AxiosResponse<MySimpleReviewRes> = await apiInstance.get(
    "/api/simple-reviews/me",
    {
      params: {
        page: pageNo,
      },
    }
  );
  return res;
};

// 내가 쓴 블로그 리뷰 목록 조회
export const myBlogReviewsApi = async (pageNo: number) => {
  const res: AxiosResponse<BlogReviewListRes> = await apiInstance.get(
    "/api/blogs/me",
    {
      params: {
        page: pageNo,
      },
    }
  );
  return res;
};

// 내가 쓴 메이트 모집글 목록 조회
export const myMatesApi = async (pageNo: number) => {
  const res: AxiosResponse<MateRes> = await apiInstance.get("api/mates/me", {
    params: {
      page: pageNo,
    },
  });
  return res;
};

// 북마크한 전시회 목록 조회
export const BookMarkedExhbApi = async (pageNo: number) => {
  const res: AxiosResponse<ExhibitionListRes> = await apiInstance.get(
    "/api/exhibitions/bookmarks/me",
    {
      params: {
        page: pageNo,
      },
    }
  );
  return res;
};

// 북마크한 블로그 목록 조회
export const BookMarkedBlogApi = async (pageNo: number) => {
  const res: AxiosResponse<BlogReviewListRes> = await apiInstance.get(
    "/api/blogs/bookmarks/me",
    {
      params: {
        page: pageNo,
      },
    }
  );
  return res;
};

// 북마크한 메이트 목록 조회
export const BookMarkedMateApi = async (pageNo: number) => {
  const res: AxiosResponse<MateRes> = await apiInstance.get(
    "/api/mates/bookmarks/me",
    {
      params: {
        page: pageNo,
      },
    }
  );
  return res;
};

// 좋아요한 블로그리뷰 목록 조회
export const LikedBlogReviewApi = async (pageNo: number) => {
  const res: AxiosResponse<BlogReviewListRes> = await apiInstance.get(
    `/api/blogs/likes/me?page=${pageNo}`
  );
  return res;
};

export interface MateRes {
  mates: Mate[] | [];
  totalElement: number;
  totalPage: number;
}

export interface MyInfoRes {
  memberId: number;
  email: string;
  nickname: string;
  gender: "W" | "M";
  age: number;
  birth: string; // YYYY-MM-DD
  level: "level1" | "level2" | "level3" | "level4";
  memberImage: string | "";
  authority: "ROLE_USER" | "ROLE_ADMIN";
}

export interface EditMyInfoRes {
  resultCode: number;
}

export interface EditMyInfoType {
  password: string | null;
  nickname: string;
  gender: string;
  birth: string;
}

export interface MySimpleReviewRes {
  simpleInfo: SimpleInfo[] | [];
  pageInfo: PageInfo;
}

export interface SimpleInfo {
  id: number;
  viewDate: string;
  rate: number;
  content: string;
  time: string;
  congestion: string;
  exhibitionInfo: {
    id: number;
    title: string;
  };
}

// 추후 동규님 타입과 합치기
export interface BlogReviewListRes {
  blogInfo: BlogInfo[] | [];
  pageInfo: PageInfo;
}

export interface BlogInfo {
  id: number;
  title: string;
  viewDate: string;
  writer: string;
  viewCount: number;
  imageInfo: {
    id: number;
    url: string;
  };
}

export interface ExhibitionListRes {
  exhibitions: Exhibition[];
  totalPage: number;
}
