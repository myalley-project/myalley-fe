import React from "react";
import styled from "styled-components";

interface CommentType {
  type: "comment" | "reply";
}

// 메이트 모집글 댓글 컴포넌트_박예선_23.01.19
const Comment = ({ type }: CommentType) => {
  const a = 2;
  return (
    <CommentContainer className="flex">
      {type === "reply" && (
        <div className="reply-icon-box">
          <div className="icon" />
        </div>
      )}
      <div className="content flex">
        <img
          src="https://cdn.pixabay.com/photo/2020/12/23/21/21/macarons-5856039_1280.jpg"
          alt=""
        />
        <div>
          <div>닉네임</div>
          <div>content</div>
          <div>
            <span>createdDate</span>
            <span>createdTime</span>
            <span>createdTime</span>
          </div>
        </div>
        <div className="btn-container">
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </div>
      </div>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  position: relative;
  height: 136px;
  /* padding: 30px 0; */
  .reply-icon-box {
    width: 54px;
    .icon {
      width: 14px;
      height: 14px;
      margin: 30px 0 0 20px;
      border-left: 1px solid ${(props) => props.theme.colors.greys40};
      border-bottom: 1px solid ${(props) => props.theme.colors.greys40};
      border-radius: 0;
    }
  }
  .content {
    width: 100%;
    padding: 30px 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.greys40};
    border-radius: 0;
    .btn-container {
      position: absolute;
      right: 0;
    }
  }
`;
