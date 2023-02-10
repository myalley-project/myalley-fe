import { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
import { MateRes } from "./member";

// 전시글 상세 조회
export const exhbApi = async (id: number) => {
  const res: AxiosResponse<ExhibitionRes> = await apiInstance.get(
    `/exhibitions/${id}`,
    {
      headers: {
        memberId: localStorage.getItem("memberId"),
      },
    }
  );
  return res;
};

// 전시글 작성 중 이미지 업로드
export const exhbUploadImgApi = async (formData: FormData) => {
  const res: AxiosResponse<ExhbUploadImgRes> = await apiInstance.post(
    "/api/exhibitions/images",
    formData
  );
  return res;
};

// 전시글 작성
export const exhbCreateApi = async (detail: ExhbCreateRes) => {
  const res: AxiosResponse<ExhbCreateRes> = await apiInstance.post(
    "/api/exhibitions",
    detail
  );
  return res;
};

// 전시글 수정
export const exhbUpdateApi = async (id: number, reqbody: object) => {
  const res: AxiosResponse<string> = await apiInstance.put(
    `/api/exhibitions/${id}`,
    reqbody
  );
  return res;
};

// 전시글 삭제
export const exhbDeleteApi = async (id: number) => {
  const res: AxiosResponse<string> = await apiInstance.delete(
    `/api/exhibitions/${id}`
  );
  return res;
};

// 전시글 북마크
export const exhbBookMarkApi = async (id: number) => {
  const res: AxiosResponse<BookMarkRes> = await apiInstance.put(
    `/api/bookmarks/exhibitions/${id}`
  );
  return res;
};

// 전시글 - 메이트 목록 조회
export const exhbMateApi = async (id: number, pageNo: number) => {
  const res: AxiosResponse<MateRes> = await apiInstance.get(
    `/exhibitions/mates/${id}`,
    {
      params: {
        page: pageNo,
      },
    }
  );
  return res;
};

export interface ExhibitionRes {
  id: number;
  title: string;
  status: string;
  type: string;
  space: string;
  adultPrice: number;
  fileName: string;
  posterUrl: string;
  duration: string;
  webLink: string;
  content: string;
  author: string;
  viewCount: number;
  createdAt: string;
  bookmarkCount?: number;
  bookmarked?: boolean;
}

export interface ExhbUploadImgRes {
  filename: string;
  s3Url: string;
}

export interface ExhbCreateRes {
  title: string;
  status: string;
  type: string;
  space: string;
  adultPrice: number;
  fileName: string;
  posterUrl: string;
  duration: string;
  webLink: string;
  content: string;
  author: string;
}

export interface BookMarkRes {
  msg: string;
  data: boolean;
}
