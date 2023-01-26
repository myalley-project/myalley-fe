import axios, { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
import { MateStatusType } from "../components/mate/MateListFilter";
import { MateListType } from "../types/mateList";

// 내정보 조회/수정(회원, 관리자 공통) api_박예선_23.01.25
export const getMateListApi = async (status: MateStatusType, page: number) => {
  const res: AxiosResponse<MateListType> =
    //   await apiInstance.get(
    //   `/mates?page=${page}&status=${status}`
    // );
    await axios.get("/data/mateList.json"); // 테스트용 목데이터
  return res;
};

export const postMateApi = async () => {
  // const res=await apiInstance.post()
};
