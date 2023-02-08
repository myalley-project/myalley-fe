import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { theme } from "../../../styles/theme";
import profileImage from "../../../assets/icons/profileImg.svg";
import Button from "../../atom/Button";
import { BlogReviewDetailResponse } from "../../../types/blogReview";

const BlogReviewDetailPresentation = ({
  createdAt,
  viewCount,
  title,
  viewDate,
  congestion,
  transportation,
  revisit,
  content,
  time,
  imageInfo,
  memberInfo,
  likeCount,
  likeStatus,
  bookmarkCount,
  bookmarkStatus,
}: BlogReviewDetailResponse) => {
  const token = localStorage.getItem("accessToken");

  // 유익해요, 북마크 버튼 클릭해서 저장되면 그에 따라 디자인 변경되도록 했습니다.
  // api만 연결하시면 됩니다.

  // 유익해요 버튼 클릭 함수_박예선_23.02.07
  const clickLikeBtn = () => {
    if (!token) {
      alert("로그인이 필요한 기능입니다.");
    }
    // 블로그리뷰 좋아요 api 붙이셔야합니다. 필요하시면 수정하셔도 됩니다 - 예선
    // 블로그리뷰 좋아요 api 성공하면 다시 정보 받아오기
    // -> 그래야 likeCount, likeStatus 반영됨
  };

  // 북마크 버튼 클릭 함수_박예선_23.02.07
  const clickBookmarkBtn = () => {
    if (!token) {
      alert("로그인이 필요한 기능입니다.");
    }
    // 블로그리뷰 북마크 api 붙이셔야합니다. 필요하시면 수정하셔도 됩니다 - 예선
    // 블로그리뷰 북마크 api 성공하면 다시 정보 받아오기
    // -> 그래야 bookmarkCount, bookmarkStatus 반영됨
  };

  return (
    <Container>
      <DetailTitle>{title}</DetailTitle>
      <Divider />
      <DetailInformation>
        <DetailDiv>
          <span>관람일</span>
          <p>{viewDate}</p>
        </DetailDiv>
        <DetailDiv>
          <span>관람 시간</span>
          <p>{time} 사이</p>
        </DetailDiv>
        <DetailDiv>
          <span>혼잡도</span>
          <p>{congestion}</p>
        </DetailDiv>
        <DetailDiv>
          <span>주차공간</span>
          <p>{transportation}</p>
        </DetailDiv>
        <DetailDiv>
          <span>재방문 의향</span>
          <p>{revisit}</p>
        </DetailDiv>
      </DetailInformation>
      <MainPart>
        <StyledSWiper>
          {imageInfo
            ? imageInfo.map((each) => (
                <SwiperSlide key={each.id}>
                  <img src={each.url} alt="전시회 상세조회 포스터" />
                </SwiperSlide>
              ))
            : null}
        </StyledSWiper>
        <p>{content}</p>
      </MainPart>
      <UserInfo>
        <img src={profileImage} alt="프로필 이미지" />
        <h3>{memberInfo.nickname}</h3>
        <DateAndView>
          <p>
            <span>작성일</span> {createdAt}
          </p>
          <p>
            <span>조회수</span> {viewCount}
          </p>
        </DateAndView>
      </UserInfo>
      <ButtonGroup>
        <Button
          size="small"
          variant={likeStatus ? "primary" : "text"}
          type="button"
          onClick={clickLikeBtn}
        >
          유익해요 {likeCount}
        </Button>
        <Button
          size="small"
          variant={bookmarkStatus ? "primary" : "text"}
          type="button"
          onClick={clickBookmarkBtn}
        >
          {bookmarkStatus ? "저장됨" : "저장하기"} {bookmarkCount}
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default BlogReviewDetailPresentation;

const Container = styled.div`
  padding: 30px;
  border: 1px solid ${theme.colors.greys40};
`;

const DetailTitle = styled.h2`
  font-weight: 700;
  font-size: 28px;
  color: ${theme.colors.greys90};
`;

const Divider = styled.div`
  border-bottom: 1px solid ${theme.colors.greys40};
  margin: 14px 0;
`;

const DetailInformation = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 50px;
  font-weight: 500;
  font-size: 12px;
  color: ${theme.colors.greys80};
`;

const DetailDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  & span {
    padding: 2px 16px;
    border-radius: 30px;
    background-color: ${theme.colors.primry60};
    color: ${theme.colors.white100};
    line-height: 20px;
  }
`;

const MainPart = styled.div`
  margin-bottom: 50px;
`;

const StyledSWiper = styled(Swiper)`
  width: 100%;
  height: 383px;
  background-color: ${theme.colors.primry60};
  margin-bottom: 30px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin-bottom: 50px;
`;

const DateAndView = styled.div`
  display: flex;
  color: ${theme.colors.greys90};
  gap: 20px;
  & > img {
    width: 64px;
    margin-bottom: 14px;
  }
  & > h3 {
    font-weight: 700;
    font-size: 20px;
  }
  & > p {
    font-weight: 500;
    font-size: 12px;
    & > span {
      color: ${theme.colors.greys60};
      margin-right: 4px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  button {
    border: 1px solid ${theme.colors.greys40};
  }
`;