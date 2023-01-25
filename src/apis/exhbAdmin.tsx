import { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";

export const exhbUploadImgApi = async () => {
  const res: AxiosResponse<ExhbUploadImgRes> = await apiInstance.post(
    "/api/exhibitions/images"
  );
  return res;
};

export interface ExhbUploadImgRes {
  filename: string;
  s3Url: string;
}
