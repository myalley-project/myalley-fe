import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import profileImg from "../../assets/icons/profileImg.svg";
import partition from "../../assets/icons/partition.svg";

interface CommentType {
  type: "comment" | "reply";
  isMyComment: boolean;
}

// 메이트 모집글 댓글 컴포넌트_박예선_23.03.05
const Comment = ({ type, isMyComment }: CommentType) => {
  const a = 1;

  return (
    <CommentContainer className="flex">
      {type === "reply" && (
        <div className="reply-icon-box">
          <div className="icon" />
        </div>
      )}
      <div className="content flex">
        <ProfileImg src={profileImg} alt="회원 프로필사진" />
        <div>
          <div>닉네임</div>
          <div>content</div>
          <div>
            <span>createdDate</span>
            <span>createdTime</span>
            <span>createdTime</span>
          </div>
        </div>
        <BtnContainer>
          {isMyComment && (
            <>
              <Button type="button">수정</Button>
              <img src={partition} alt="" />
              <Button type="button">삭제</Button>
            </>
          )}
          {!isMyComment && type === "comment" && (
            <Button type="button">답글달기</Button>
          )}
        </BtnContainer>
      </div>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  /* border: 1px solid red; */
  position: relative;
  height: 136px;
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
  }
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 14px;
`;

const BtnContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  position: absolute;
  right: 0;
`;

const Button = styled.button`
  height: 34px;
  padding: 0 10px;
  color: ${theme.colors.greys60};
  font-size: 14px;
`;
