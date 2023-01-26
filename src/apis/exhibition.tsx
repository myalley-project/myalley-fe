import { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";

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
  const res = await apiInstance.put(`/exhibitions/${id}`, reqbody);
  return res;
};

export const exhbDeleteApi = async (id: number) => {
  const res: AxiosResponse<ExhibitionRes> = await apiInstance.delete(
    `/exhibitions/${id}`
  );
  return res;
};
