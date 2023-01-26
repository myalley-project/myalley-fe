import axios, { AxiosResponse } from "axios";
import { MateListType } from "../types/mateList";
import apiInstance from "../utils/apiInstance";

// 내정보 조회/수정(회원, 관리자 공통) api_박예선_23.01.25
export const getMateListApi = async (page: number, status: string) => {
  const res: AxiosResponse<MateListType> =
    //         await apiInstance.get(
    //     `/mates?page=${page}&status=${status}`
    //   );
    await axios.get("/data/mateList.json");
  return res;
};

export const postMateApi = async () => {
  // const res=await apiInstance.post()
};
