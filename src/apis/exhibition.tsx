import { AxiosResponse } from "axios";
import { PageInfo } from "../types/pageInfo";
import apiInstance from "../utils/apiInstance";
import { MateRes } from "./member";

export interface ExhibitionRes {
  id: number;
  title: string;
  status: string;
  type: string;
  space: string;
  adultPrice: number;
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

export const exhbUpdateApi = async (id: number, reqbody: object) => {
  const res = await apiInstance.put(`/api/exhibitions/${id}`, reqbody);
  return res;
};

export const exhbDeleteApi = async (id: number) => {
  const res: AxiosResponse<ExhibitionRes> = await apiInstance.delete(
    `/api/exhibitions/${id}`
  );
  return res;
};

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
