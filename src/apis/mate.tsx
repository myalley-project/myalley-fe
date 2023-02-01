import { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
import useLogOut from "./logOut";
import useRefreshTokenApi from "./useRefreshToken";
import { MateRes } from "../types/mate";
import { MateStatusType } from "../components/mate/MateListFilter";
import { MateListType } from "../types/mateList";
import isApiError, { errorAlert } from "../utils/isApiError";

// 메이트글 상세조회 api_박예선_2023.01.27
export const mateApi = async (id: number, memberId: number) => {
  const res: AxiosResponse<MateRes> = await apiInstance.get(`/mates/${id}`, {
    headers: { memberId, Authorization: null },
  });
  return res;
};

// 메이트글 북마크 추가/삭제 api_박예선_23.01.27
export const useMateBookMarkApi = () => {
  const refreshTokenApi = useRefreshTokenApi();
  const logOut = useLogOut();

  const mateBookMarkApi = async (mateId: number) => {
    try {
      const res: AxiosResponse<BookMarkRes> = await apiInstance.put(
        `/api/mates/bookmarks/${mateId}`
      );
      return res;
    } catch (err) {
      const errorRes = isApiError(err);
      if (errorRes === "accessToken 만료") {
        refreshTokenApi();
        const res: AxiosResponse<BookMarkRes> = await apiInstance.put(
          `/api/mates/bookmarks/${mateId}`
        );
        return res;
      }
      if (typeof errorRes !== "object") return errorAlert();
      const { errorMsg } = errorRes;
      if (errorMsg === "회원 정보 없음") {
        logOut();
        return alert("죄송합니다. 다시 로그인해주십시오.");
      }
      if (errorMsg !== "회원 정보 없음") return alert(errorMsg);
    }
    return errorAlert();
  };

  return mateBookMarkApi;
};

export interface BookMarkRes {
  msg?: string;
  data?: true | false;
}

// 메이트 목록 조회 api_박예선_23.01.26
export const mateListApi = async (status: MateStatusType, page: number) => {
  const res: AxiosResponse<MateListType> = await apiInstance.get(
    `/mates?page=${page}&status=${status === "전체" ? "" : status}`
  );
  return res;
};

export const postMateApi = async () => {
  // const res=await apiInstance.post()
};
