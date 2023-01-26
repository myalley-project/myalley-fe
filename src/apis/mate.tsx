import axios, { AxiosResponse } from "axios";
import { MateRes } from "../types/mate";
import apiInstance from "../utils/apiInstance";

// 메이트글 상세조회 api_박예선_2023.01.26
const getMateApi = async (id: number, memberId: number) => {
  const res: AxiosResponse<MateRes> =
    //   await apiInstance.get(`/mates/${id}`, {
    //   headers: { memberId },
    // });
    await axios.get("/data/mate.json"); // 테스트용 목데이터
  return res;
};

export default getMateApi;
