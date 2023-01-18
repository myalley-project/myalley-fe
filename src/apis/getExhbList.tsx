import axios, { AxiosResponse } from "axios";
import { Exhibition, FilterType, StatusType } from "../types/exhbList";
import apiInstance from "../utils/apiInstance";

export interface ExhbListRes {
  exhibitions: Exhibition[];
  pageInfo: {
    page: number;
    size: number;
    totalElement: number;
    totalPage: number;
  };
}

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
