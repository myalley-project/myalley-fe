import { AxiosResponse } from "axios";
import { StatusType } from "../components/exhibitionList/Filters";
import { Exhibition, FilterType, SortType } from "../types/exhbList";
import apiInstance from "../utils/apiInstance";

export interface ExhbListRes {
  exhibitions: Exhibition[];
  totalPage: number;
}

// 전시목록 조회 api(상태, 필터, 정렬, 페이지, 검색어(제목))_박예선_23.03.30
const exhbListApi = async (
  status: StatusType,
  type: FilterType,
  sort: SortType,
  page: number,
  title: string
) => {
  const res: AxiosResponse<ExhbListRes> = await apiInstance.get(
    `/exhibitions/?status=${status} 전시&page=${page}&sort=${
      sort === "최신순" ? "" : "조회수순"
    }&type=${type === "전체 전시" ? "" : type}&title=${title}`
  );
  return res;
};

export default exhbListApi;
