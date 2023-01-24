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

export interface MateRes {
  mates: Mate[] | [];
  pageInfo: PageInfo;
}

export interface Mate {
  mateId: number;
  title: string;
  availableDate: string;
  status: string;
  mateGender: string;
  mateAge: string;
  createdAt: string;
  viewCount: number;
  memberId?: number;
  memberNickname?: string;
  exhibition: {
    exhibitionId: number;
    exhibitionTitle: string;
    exhibitionSpace: string;
    posterUrl: string;
    exhibitionStatus: string;
  };
}

export interface PageInfo {
  page: number;
  size: number;
  totalElement: number;
  totalPage: number;
}

export const mypageApi = async () => {
  const res: AxiosResponse<MypageRes> = await apiInstance.get("/api/me");
  return res;
};

export const mypageFindMateApi = async () => {
  const res: AxiosResponse<MateRes> = await apiInstance.get("api/mates/me", {
    params: {
      page: 1,
    },
  });
  return res;
};
