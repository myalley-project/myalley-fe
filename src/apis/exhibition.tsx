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
}

const exhibitionApi = async (id: number) => {
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

export default exhibitionApi;
