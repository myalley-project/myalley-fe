import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import profileImgIcon from "../../assets/icons/profileImg.svg";
import partition from "../../assets/icons/partition.svg";
import { MateComment } from "../../types/mate";

interface CommentType {
  type: "comment" | "reply";
  isMyComment: boolean;
  commentData: MateComment;
}

// 메이트 모집글 댓글 컴포넌트_박예선_23.03.10
const Comment = ({ type, isMyComment, commentData }: CommentType) => {
  const { profileImg, nickname, content, createdAt, deleted } = commentData;
  const createdDate = createdAt.split(" ")[0];
  const createdTime = createdAt.split(" ")[1];

  return (
    <CommentContainer className="flex">
      {type === "reply" && (
        <div className="reply-icon-box">
          <div className="icon" />
        </div>
      )}
      <ContentContainer>
        <ProfileImg
          src={profileImg === "" || deleted ? profileImgIcon : profileImg}
          alt="회원 프로필사진"
        />
        <div>
          {!deleted && <Nickname>{nickname}</Nickname>}
          <Content>{deleted ? "삭제된 댓글입니다." : content}</Content>
          {!deleted && (
            <CreatedInfo>
              <span>{createdDate}</span>
              <img src={partition} alt="partition" />
              <span>{createdTime}</span>
            </CreatedInfo>
          )}
        </div>
        {!deleted && (
          <BtnContainer>
            {isMyComment && (
              <>
                <Button type="button">수정</Button>
                <img src={partition} alt="partition" />
                <Button type="button">삭제</Button>
              </>
            )}
            {!isMyComment && type === "comment" && (
              <Button type="button">답글달기</Button>
            )}
          </BtnContainer>
        )}
      </ContentContainer>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
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
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 30px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.greys40};
  border-radius: 0;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 14px;
`;

const Nickname = styled.div`
  font-weight: 700;
  line-height: 22px;
`;
const Content = styled.div`
  font-size: 16px;
  color: ${theme.colors.greys90};
  line-height: 26px;
`;

const CreatedInfo = styled.div`
  font-size: 14px;
  color: ${theme.colors.greys60};
  line-height: 20px;
  img {
    height: 8px;
    margin: 0 10px;
  }
`;

const BtnContainer = styled.div`
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
