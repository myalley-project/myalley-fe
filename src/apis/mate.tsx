import axios, { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
import { MateStatusType } from "../components/mate/MateListFilter";
import { MateListType } from "../types/mateList";

// 메이트 목록 조회 api_박예선_23.01.26
export const mateListApi = async (status: MateStatusType, page: number) => {
  const res: AxiosResponse<MateListType> =
    //   await apiInstance.get(
    //   `/mates?page=${page}&status=${status.replace(" ", "")}`
    // );
    await axios.get("/data/mateList.json"); // 테스트용 목데이터
  return res;
};

export const postMateApi = async () => {
  // const res=await apiInstance.post()
};
