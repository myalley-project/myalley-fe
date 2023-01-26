import axios, { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
import { errorAlert } from "../utils/isApiError";

// 내정보 조회/수정(회원, 관리자 공통) api_박예선_23.01.25
export const myInfoApi = async (type: "get" | "put") => {
  if (type === "get") {
    const getRes: AxiosResponse<MyInfoRes> = await apiInstance.get("/api/me");
    return getRes;
  }
  if (type === "put") {
    const putRes: AxiosResponse<MyInfoRes> =
      // await apiInstance.put("/api/me");
      await axios.get("/data/member.json"); // 테스트용 목데이터
    return putRes;
  }
  return errorAlert();
};

export interface MyInfoRes {
  memberId: number;
  email: string;
  nickname: string;
  gender: "W" | "M";
  birth: string; // YYYY-MM-DD
  level: "level1" | "level2" | "level3" | "level4";
  memberImage: string | "";
  authority: "ROLE_USER" | "ROLE_ADMIN";
}

export const myBookmarkedApi = async () => {};

export const mySimpleReviewsApi = async () => {};

export const myMatesApi = async () => {};
