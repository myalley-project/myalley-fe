import React from "react";
import styled from "styled-components";
import Calender from "../components/Calendar";
import MainCard from "../components/exhibition/MainCard";
import Comment from "../components/mate/Comment";

// 메이트 모집글 상세페이지_박예선_23.01.19
const Mate = () => {
  const auth = "admin";
  return (
    <MateContainer>
      <div className="top-buttons-container">buttons</div>
      <ExhbCardContainer>
        <Thumbnail
          className="thumbnail"
          src="https://cdn.pixabay.com/photo/2020/12/23/21/21/macarons-5856039_1280.jpg"
          alt="thumbnail"
        />
        <InfoContainer>
          <div className="title bold">
            동대문 디디피 공연보러오세요 눈누냔냐
          </div>
          <DetailContainer>
            <div className="date flex">
              <div className="detail-name">일정</div>
              <div>2099-09-09</div>
            </div>
            <div className="flex">
              <div className="detail-name">장소</div>
              <div>ddp</div>
            </div>
          </DetailContainer>
        </InfoContainer>
      </ExhbCardContainer>
      <MateContentContainer>
        <div>
          <span>모집 중</span>
          <div>모집글 제목</div>
          <span>createdAt</span>
          <div>
            조회수 <span>00</span>
          </div>
          <div>
            댓글 <span>2 </span>
          </div>
        </div>

        <div>
          원하는 메이트
          <div>
            <div>성별</div>
            <div>상관없음</div>
          </div>
          <div>
            <div>나이</div>
            <div>20대 초반 ~ 30대 중반</div>
          </div>
        </div>

        <div>
          관람예정일
          <Calender />
        </div>

        <div>
          메이트 설명글
          <div>니아러닝라ㅓ닝러ㅣㄴ아러ㅣㄴ아러니아러ㅣㄴㅇ러닝런아ㅣ</div>
        </div>

        <div>
          <img src="" alt="member profile img" />
          <div>
            <span>닉네임</span>
            <span>여자</span>
          </div>
          <div>20대 초반</div>
        </div>

        <div>
          연락가능 메신저 <div>니아러니아러ㅣ나ㅓ </div>
        </div>

        <button type="button">저장하기 30</button>
      </MateContentContainer>
      <CommentList>
        <div className="comment-count bold">
          댓글 <span>9</span>
        </div>
        <Comment type="comment" />
        <Comment type="reply" />
      </CommentList>
    </MateContainer>
  );
};

export default Mate;

const MateContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 50px 0;
  border: 1px solid #e0e0e0;
  .top-buttons-container {
    height: 40px;
  }
  .flex {
    display: flex;
  }
  .bold {
    font-weight: 700;
  }
`;

const ExhbCardContainer = styled.div`
  display: flex;
  height: 244px;
  margin: 14px 0 30px;
  border: 1px solid #e0e0e0;
`;

const Thumbnail = styled.img`
  width: 175px;
  height: inherit;
`;

const InfoContainer = styled.div`
  margin: 30px;
  border-radius: 0;
  .title {
    height: 104px;
    color: ${(props) => props.theme.colors.greys90};
    font-size: 42px;
    line-height: 52px;
  }
`;

const DetailContainer = styled.div`
  height: 50px;
  margin-top: 30px;
  div {
    div {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: ${(props) => props.theme.colors.greys90};
      &.detail-name {
        width: 72px;
        margin-right: 30px;
        color: ${(props) => props.theme.colors.greys60};
      }
    }
    &.date {
      margin-bottom: 10px;
    }
  }
`;

const MateContentContainer = styled.div`
  border: 1px solid #e0e0e0;

  margin: 30px 0;
`;

const CommentList = styled.div`
  border: 1px solid #e0e0e0;
  padding: 30px;
  .comment-count {
    padding-bottom: 14px;
    border-bottom: 1px solid ${(props) => props.theme.colors.greys40};
    border-radius: 0;
    font-size: 20px;
    span {
      color: ${(props) => props.theme.colors.primry60};
    }
  }
`;
