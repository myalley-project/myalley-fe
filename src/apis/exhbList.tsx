import { AxiosResponse } from "axios";
import { StatusType } from "../components/exhibitionList/Filters";
import { Exhibition, FilterType, SortType } from "../types/exhbList";
import apiInstance from "../utils/apiInstance";

export interface ExhbListRes {
  exhibitions: Exhibition[];
  totalPage: number;
}

// 전시목록 조회 api(상태, 정렬, 필터, 제목검색, 페이지)_박예선_23.03.17
const exhbListApi = async (
  status: StatusType,
  type: FilterType,
  sort: SortType,
  page: number
  // title:string 추후 검색 기능 추가 시 활성화할 예정
) => {
  const res: AxiosResponse<ExhbListRes> = await apiInstance.get(
    `/exhibitions/?status=${status} 전시&page=${page}&sort=${
      sort === "최신순" ? "" : "조회수순"
    }&type=${type === "전체 전시" ? "" : type}&title=` // title(검색)은 임시로 ""로 보냄
  );
  return res;
};

export default exhbListApi;
