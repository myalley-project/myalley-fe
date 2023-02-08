import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { alertPreparing } from "../../utils/alerts";

interface CommentListType {
  commentTextArea: string;
  setCommentTextArea: React.Dispatch<React.SetStateAction<string>>;
}

// 댓글 목록, 작성란 컴포넌트_박예선_23.02.08
const CommentList = (props: CommentListType) => {
  const { commentTextArea, setCommentTextArea } = props;
  const memberNickname = localStorage.getItem("nickname");

  // 댓글입력 상태관리_박예선_23.01.26
  // 댓글기능 추가되면 적용하기
  const handleCommentTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (!value.includes("\n")) setCommentTextArea(value);
  };

  return (
    <CommentListContainer>
      <div className="comment-count bold">
        댓글 <span>0</span>
      </div>
      {/* <Comment type="comment" />
        <Comment type="reply" />
        댓글기능 추가되면 추가하기 */}
      <SubTitle type="greys90" marginTop={30}>
        {memberNickname}
      </SubTitle>
      <TextAreaContainer>
        <TextArea
          type="comment"
          placeholder="내용을 입력해주세요."
          value={commentTextArea}
          onChange={alertPreparing}
          onClick={alertPreparing}
          maxLength={150}
          height={150}
        />
        <div className="input-status">
          <span>{commentTextArea.length}</span>/<span>150</span>
        </div>
        <ApplyBtn className="comment-btn">등록</ApplyBtn>
      </TextAreaContainer>
    </CommentListContainer>
  );
};

export default CommentList;

const CommentListContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin-bottom: 50px;
  padding: 30px;
  border: 1px solid #e0e0e0;
  .comment-count {
    padding-bottom: 14px;
    border-bottom: 1px solid ${theme.colors.greys40};
    border-radius: 0;
    font-size: 20px;
    span {
      color: ${theme.colors.primry60};
    }
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
  font-size: 14px;
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
  font-size: 14px;
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
