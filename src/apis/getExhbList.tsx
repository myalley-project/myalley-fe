import axios, { AxiosResponse } from "axios";
import { ExhbType } from "../types/exhbList";
import apiInstance from "../utils/apiInstance";

export interface ExhbListRes {
  exhibitions: ExhbType[];
  pageInfo: {
    page: number;
    size: number;
    totalElement: number;
    totalPage: number;
  };
}
export type StatusType = "현재" | "예정" | "지난";
export type FilterType = "전체" | "영상" | "특별" | "기획" | "상설" | "소장품";

const exhbListApi = async (
  status: StatusType,
  type: FilterType,
  page: number
) => {
  if (type === "전체") {
    const res: AxiosResponse<ExhbListRes> =
      //   await apiInstance.get(
      //   `/main/exhibitions/?status=${status}전시&page=${page}`
      // );
      await axios.get("/data/exhbList.json"); // 테스트용 목데이터
    return res;
  }
  const res: AxiosResponse<ExhbListRes> =
    //   await apiInstance.get(
    //   `/exhibitions/?status=${status}전시&type=${type}전시&page=${page}`
    // );
    await axios.get("/data/exhbListFiltered.json"); // 테스트용 목데이터
  return res;
};

export default exhbListApi;
