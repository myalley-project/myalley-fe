import { AxiosResponse } from "axios";
import { StatusType } from "../components/exhibitionList/Filters";
import { Exhibition, FilterType, SortType } from "../types/exhbList";
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
  sort: SortType,
  page: number
) => {
  const res: AxiosResponse<ExhbListRes> = await apiInstance.get(
    `/exhibitions/?status=${status} 전시&type=${type}&sort=${sort}&page=${page}`
  );
  return res;
};

const searchedExhbListApi = async (
  status: StatusType,
  type: FilterType,
  sort: SortType,
  title: string,
  page: number
) => {
  const res: AxiosResponse<ExhbListRes> = await apiInstance.get(
    `/exhibitions/search?status=${status}&title=${title}&page=${page}`
  );
  return res;
};

export default exhbListApi;
