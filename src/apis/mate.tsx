import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import apiInstance from "../utils/apiInstance";
import useLogOut from "./logOut";
import useRefreshTokenApi from "./useRefreshToken";
import { MateRes, MateWriteType } from "../types/mate";
import { MateStatusType } from "../components/mate/MateListFilter";
import { MateListType } from "../types/mateList";
import isApiError from "../utils/isApiError";
import { alertError } from "../utils/alerts";

// 메이트글 상세조회 api_박예선_2023.01.31
export const mateApi = async (mateId: number, memberId: number) => {
  const res: AxiosResponse<MateRes> = await apiInstance.get(
    `/mates/${mateId}`,
    {
      headers: { memberId, Authorization: null },
    }
  );
  return res;
};

// 메이트글 삭제 api_박예선_23.01.31
export const useMateDeleteApi = () => {
  const navigate = useNavigate();
  const refreshTokenApi = useRefreshTokenApi();

  const mateDeleteApi = async (mateId: number) => {
    try {
      const res: AxiosResponse<MateWriteRes> = await apiInstance.delete(
        `/api/mates/${mateId}`
      );
      if (res.data === "메이트 모집글 삭제가 완료되었습니다.") {
        alert(res.data);
        navigate("/mate-list");
      }
    } catch (err) {
      const errorRes = isApiError(err);
      if (errorRes === "accessToken 만료") {
        refreshTokenApi();
        const res: AxiosResponse<MateWriteRes> = await apiInstance.get(
          `/api/mates/${mateId}`
        );
        if (res.data === "메이트 모집글 삭제가 완료되었습니다.") {
          alert(res.data);
          navigate("/mate-list");
        }
      }
      if (typeof errorRes !== "object") return;
      const { errorMsg } = errorRes;
      alert(errorMsg);
      navigate("/mate-list");
    }
  };
  return mateDeleteApi;
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
      if (typeof errorRes !== "object") return alertError();
      const { errorMsg } = errorRes;
      if (errorMsg === "회원 정보 없음") {
        logOut();
        return alert("죄송합니다. 다시 로그인해주십시오.");
      }
      if (errorMsg !== "회원 정보 없음") return alert(errorMsg);
    }
    return alertError();
  };

  return mateBookMarkApi;
};

export interface BookMarkRes {
  msg?: string;
  data?: true | false;
}

// 메이트 목록 조회 api_박예선_23.05.01
export const mateListApi = async (
  status: MateStatusType,
  title: string,
  page: number
) => {
  const res: AxiosResponse<MateListType> = await apiInstance.get(
    `/mates?page=${page}&status=${
      status === "전체" ? "" : status
    }&title=${title}`
  );
  return res;
};

// 메이트글 작성/수정 api_박예선_23.01.29
export const mateWriteApi = async (
  type: "post" | "put",
  reqBody: MateWriteType,
  mateId?: number
) => {
  if (type === "put" && mateId) {
    const res: AxiosResponse<MateWriteRes> = await apiInstance.put(
      `/api/mates/${mateId}`,
      reqBody
    );
    return res;
  }
  const res: AxiosResponse<MateWriteRes> = await apiInstance.post(
    "/api/mates",
    reqBody
  );
  return res;
};

export type MateWriteRes =
  | string
  | {
      errorCode: number;
      errorMsg: string;
    };
