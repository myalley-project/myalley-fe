import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import apiInstance from "../utils/apiInstance";

// 회원 마이페이지 관련 api는 이곳에 모아두면 좋을 것 같습니다

export interface MyInfoRes {
  userId: number;
  email: string;
  nickname: string;
  gender: "W" | "M";
  birth: string;
  level: "level1" | "level2" | "level3" | "level4";
  userImage: string | "";
  authority: "ROLE_USER" | "ROLE_ADMIN";
}

// 내정보 조회(회원, 관리자 공통) api_박예선_23.01.20
export const useMyInfoApi = (type: "get" | "put") => {
  const myInfo = async () => {
    if (type === "get") {
      const res: AxiosResponse<MyInfoRes> =
        // await apiInstance.get("/api/me");
        await axios.get("/data/member.json"); // 테스트용 목데이터
      return res;
    }
    const res: AxiosResponse<MyInfoRes> =
      // await apiInstance.put("/api/me");
      await axios.get("/data/member.json"); // 테스트용 목데이터
    return res;
  };
  return myInfo;
};

export const myBookmarkedApi = async () => {};

const mySimpleReviewsApi = async () => {};

const myMatesApi = async () => {};
