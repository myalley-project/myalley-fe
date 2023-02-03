import { AxiosResponse } from "axios";
import { StatusType } from "../components/exhibitionList/Filters";
import { Exhibition, FilterType } from "../types/exhbList";
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
  if (type === "전체 전시") {
    const res: AxiosResponse<ExhbListRes> = await apiInstance.get(
      `/main/exhibitions/?status=${status} 전시&page=${page}`
    );
    return res;
  }
  const res: AxiosResponse<ExhbListRes> = await apiInstance.get(
    `/exhibitions/?status=${status} 전시&type=${type}&page=${page}`
  );
  return res;
};

export default exhbListApi;
