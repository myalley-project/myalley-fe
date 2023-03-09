import { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
import { MateComment } from "../types/mate";

// 메이트글 댓글목록 조회api_박예선_23.03.09
export const getMateCommentListApi = async (mateId: number) => {
  const res: AxiosResponse<MateCommentListRes> = await apiInstance.get(
    `/mates/${mateId}/comments`
  );
  return res;
};

export interface MateCommentListRes {
  comments: MateComment[];
  totalCount: number;
}

// 메이트글 댓글 작성api_박예선_23.03.07
export const postMateCommentApi = async (
  type: "comment" | "reply",
  comment: string,
  mateId: number,
  commentId?: number
) => {
  const res: AxiosResponse<string | ErrorDefalt> = await apiInstance.post(
    `/api/mates/${mateId}/comments`,
    {
      content: comment,
    }
  );
  return res;
};

// 메이트글 댓글/대댓글 수정api_박예선_23.03.07
export const mateCommentModifyApi = async (
  comment: string,
  mateId: number,
  commentId: number
) => {
  const res: AxiosResponse<string | ErrorDefalt> = await apiInstance.patch(
    `/api/mates/${mateId}/comments/${commentId}`,
    {
      content: comment,
    }
  );
  return res;
};

export interface ErrorDefalt {
  errorCode: number;
  errorMsg: string;
}
