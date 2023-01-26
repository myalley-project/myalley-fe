import axios, { AxiosResponse } from "axios";
import { MateRes } from "../types/mate";
import apiInstance from "../utils/apiInstance";
import isApiError, { errorAlert } from "../utils/isApiError";

// 메이트글 상세조회 api_박예선_2023.01.26
export const getMateApi = async (id: number, memberId: number) => {
  const res: AxiosResponse<MateRes> =
    //   await apiInstance.get(`/mates/${id}`, {
    //   headers: { memberId },
    // });
    await axios.get("/data/mate.json"); // 테스트용 목데이터
  return res;
};

export const mateBookMarkApi = async (mateId: number) => {
  try {
    const res: AxiosResponse<BookMarkRes> = await apiInstance.put(
      `/bookmarks/mates/${mateId}`
    );
    // await axios.get("/data/mateBookmark.json"); // 테스트용 목데이터
    return res;
  } catch (err) {
    const errorRes = isApiError(err);
    if (typeof errorRes !== "object") return errorAlert();
    const { errorCode, errorMsg } = errorRes;
    if (errorCode === 400) return alert(errorMsg);
  }
  return errorAlert();
};

export interface BookMarkRes {
  msg?: string;
  data?: true | false;
}
