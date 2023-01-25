// 해당 파일은 머지 후 삭제 될 파일입니다. member.tsx 파일로 대체됩니다.
// 현재 지우면 에러가 나서 우선 남겨뒀습니다.

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

export const mypageApi = async () => {
  const res: AxiosResponse<MypageRes> = await apiInstance.get("/api/me");
  return res;
};

// export default mypageApi;

// export const mypageFindMateApi = async () => {
//   const res:AxiosResponse<
// }
