import { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {
  ErrorDefalt,
  getMateCommentListApi,
  postMateCommentApi,
} from "../../apis/mateComment";
import { theme } from "../../styles/theme";
import { MateCommentListRes } from "../../types/mate";
import Comment from "./Comment";

interface CommentListType {
  mateId: number;
  commentTextArea: string;
  setCommentTextArea: React.Dispatch<React.SetStateAction<string>>;
}

// 댓글 목록, 작성란 컴포넌트_박예선_23.03.07
const CommentList = (props: CommentListType) => {
  const { mateId, commentTextArea, setCommentTextArea } = props;
  const memberNickname = localStorage.getItem("nickname");
  const [isWritingReply, setIsWritingReply] = useState(false);

  // 댓글 목록 조회 요청_박예선_23.03.07_수정중
  const getCommentList = useCallback(async () => {
    try {
      const res: AxiosResponse<MateCommentListRes | ErrorDefalt> =
        await getMateCommentListApi(mateId);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [mateId]);

  // 렌더링 시 댓글 목록 조회_박예선_23.03.07
  useEffect(() => {
    getCommentList();
  }, [getCommentList]);

  // 댓글입력 상태관리_박예선_23.01.26
  const handleCommentTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (!value.includes("\n")) setCommentTextArea(value);
  };

  // 댓글/대댓글 등록api 요청_박예선_23.03.07_수정중
  const postComment = async (type: "comment" | "reply") => {
    try {
      const res: AxiosResponse<string | ErrorDefalt> = await postMateCommentApi(
        type,
        commentTextArea,
        11
      );
      alert(res.data);
      setCommentTextArea("");

      // navigate(-1);
    } catch (err) {
      // const errorRes = (err);
      // if (errorRes === "accessToken 만료") {
      //   try {
      //     refreshTokenApi();
      //     const res: AxiosResponse<MateWriteRes> = await mateWriteApi(
      //       type,
      //       writeData,
      //       mateId
      //     );
      //     if (typeof res.data === "string") {
      //       alert(res.data);
      //       navigate(-1);
      //       return;
      //     }
      //   } catch {
      //     alertError();
      //     return;
      //   }
      // }
      // if (typeof errorRes !== "object") return;
      // const { errorMsg } = errorRes;
      // alert(errorMsg);
      // navigate(-1);
    }
  };

  // 테스트용
  useEffect(() => {
    console.log(mateId);
  }, [commentTextArea, mateId]);

  return (
    <CommentListContainer>
      <div className="comment-count bold">
        댓글 <span>0</span>
      </div>
      <Comment type="comment" isMyComment={false} />
      <Comment type="reply" isMyComment />
      <Comment type="reply" isMyComment={false} />
      <Comment type="comment" isMyComment />
      <SubTitle type="greys90" marginTop={30}>
        {memberNickname}
      </SubTitle>
      <TextAreaContainer>
        <TextArea
          type="comment"
          placeholder="내용을 입력해주세요."
          value={commentTextArea}
          onChange={handleCommentTextArea}
          onKeyDown={(e) => {
            if (e.key === "Enter") postComment("comment");
          }}
          maxLength={150}
          height={150}
        />
        <div className="input-status">
          <span>{commentTextArea.length}</span>/<span>150</span>
        </div>
        <ApplyBtn
          className="comment-btn"
          onClick={() => postComment("comment")}
        >
          등록
        </ApplyBtn>
      </TextAreaContainer>
    </CommentListContainer>
  );
};

export default CommentList;

const CommentListContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 50px;
  padding: 30px;
  border: 1px solid ${theme.colors.greys40};
  .comment-count {
    padding-bottom: 14px;
    border-bottom: 1px solid ${theme.colors.greys40};
    border-radius: 0;
    font-size: 20px;
    span {
      color: ${theme.colors.primry60};
    }
  }
  @media (max-width: 624px) {
    padding: 20px;
  }
`;

export const SubTitle = styled.div<{
  type: "greys60" | "greys90";
  marginTop: number;
}>`
  margin-top: ${(props) => `${props.marginTop}px`};
  margin-bottom: ${(props) => (props.type === "greys60" ? "0" : "10px")};
  color: ${(props) =>
    props.type === "greys60" ? theme.colors.greys60 : theme.colors.greys90};
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
`;

const TextAreaContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 46px;
  .input-status {
    position: absolute;
    right: 20px;
    bottom: 20px;
    color: ${theme.colors.greys60};
    font-size: 14px;
    font-weight: 500;
  }
  .comment-btn {
  }
`;

export const TextArea = styled.textarea<{
  type: "comment" | "readOnly";
  height: number;
}>`
  width: 100%;
  height: ${(props) => `${props.height}px`};
  padding: ${(props) => (props.type === "comment" ? "20px" : "0")};
  border: ${(props) =>
    props.type === "comment" ? `1px solid ${theme.colors.greys40}` : "none"};
  border-radius: ${(props) => (props.type === "comment" ? "30px" : "0")};
  color: ${theme.colors.greys90};
  font-size: 16px;
  font-weight: 400;
  resize: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${theme.colors.greys60};
  }
  :disabled {
    background-color: transparent;
  }
`;

const ApplyBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: -46px;
  height: 36px;
  padding: 0 20px;
  background-color: ${theme.colors.primry60};
  color: ${theme.colors.white100};
  font-size: 14px;
`;
