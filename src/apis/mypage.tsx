import { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";

export interface MypageRes {
  userId: number;
  email: string;
  nickname: string;
  gender: string;
  birth: string;
  level: string;
  userImage: string;
  authority: string;
}

const mypageApi = async () => {
  const res: AxiosResponse<MypageRes> = await apiInstance.get("/api/me");
  return res;
};

export default mypageApi;
