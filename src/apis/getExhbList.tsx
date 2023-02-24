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
  const res: AxiosResponse<ExhbListRes> = await apiInstance.get(
    `/exhibitions/?status=${status} 전시&type=${type}&sort=최신순&page=${page}`
  );
  // 임시로 sort 최신순 추가. selectBox 인기순에서 조회수순으로 바꾸고 기능 추가후 반영하기
  return res;
};

export default exhbListApi;
