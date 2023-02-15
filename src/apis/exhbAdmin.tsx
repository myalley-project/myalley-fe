import { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";

export const exhbUploadImgApi = async (formData: FormData) => {
  const res: AxiosResponse<ExhbUploadImgRes> = await apiInstance.post(
    "/api/exhibitions/images",
    formData
  );
  return res;
};

export const exhbCreateApi = async (detail: ExhbCreateType) => {
  const res: AxiosResponse<ExhbCreateRes> = await apiInstance.post(
    "/api/exhibitions",
    detail
  );
  return res;
};

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

export interface ExhbCreateType {
  title: string;
  type: string;
  status: string;
  duration: string;
  space: string;
  fileName: string;
  posterUrl: string;
  adultPrice: number;
  content: string;
  author: string;
  webLink: string;
}
