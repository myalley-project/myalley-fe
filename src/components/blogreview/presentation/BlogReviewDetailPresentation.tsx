import React from "react";
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
  bookmarkCount,
}: BlogReviewDetailResponse) => (
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
        <p>2022년 12월 14일</p>
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
      <DateandView>
        <p>
          <span>작성일</span> {createdAt}
        </p>
        <p>
          <span>조회수</span> {viewCount}
        </p>
      </DateandView>
    </UserInfo>
    <ButtonGroup>
      <Button size="small" variant="text" type="button">
        유익해요 {likeCount}
      </Button>
      <Button size="small" variant="text" type="button">
        저장하기 {bookmarkCount}
      </Button>
    </ButtonGroup>
  </Container>
);

export default BlogReviewDetailPresentation;

const Container = styled.div`
  width: 1240px;
  padding: 30px;
  margin-inline: auto;
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
  display: grid;
  grid-auto-flow: column;
  gap: 30px;
  font-weight: 500;
  font-size: 12px;
  color: ${theme.colors.greys80};
  margin-bottom: 50px;
`;

const DetailDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  & span {
    padding: 2px 16px;
    border-radius: 30px;
    background-color: ${theme.colors.primry60};
    color: ${theme.colors.white100};
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

const DateandView = styled.div`
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
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;
