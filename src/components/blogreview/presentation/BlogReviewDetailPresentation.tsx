import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMutation, useQueryClient } from "react-query";
import { Pagination } from "swiper";
import { theme } from "../../../styles/theme";
import profileImage from "../../../assets/icons/profileImg.svg";
import Button from "../../atom/Button";
import { BlogReviewDetailResponse } from "../../../types/blogReview";
import bloglikeApis from "../../../apis/bloglikeApis";
import blogDetailbookmarkApis from "../../../apis/blogdetailbookMarkApis";

const BlogReviewDetailPresentation = ({
  id,
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
  exhibitionInfo,
}: BlogReviewDetailResponse) => {
  const token = localStorage.getItem("accessToken");
  const queryClient = useQueryClient();

  const bookmarkAddMutation = useMutation({
    mutationFn: () => blogDetailbookmarkApis.addbookmark(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogReviewDetail"]);
      console.log("북마크 여부", bookmarkStatus);
      console.log("북마크 카운트", bookmarkCount);
    },
  });

  const bookmarkDeleteMutation = useMutation({
    mutationFn: () => blogDetailbookmarkApis.deletebookmark(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogReviewDetail"]);
    },
  });

  const bolglikeMutation = useMutation({
    mutationFn: () => bloglikeApis.like(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogReviewDetail"]);
    },
  });

  const bolgDislikeMutation = useMutation({
    mutationFn: () => bloglikeApis.dislike(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogReviewDetail"]);
    },
  });
  console.log("좋아요 여부", bookmarkStatus);
  console.log("좋아요 카운트", bookmarkCount);

  const clickLikeBtn = () => {
    if (!token) {
      alert("로그인이 필요한 기능입니다.");
    }

    if (memberInfo.memberId === Number(localStorage.getItem("memberId"))) {
      alert("자신의 글에는 좋아요를 누를 수 없습니다.");
    }

    if (likeStatus) {
      bolgDislikeMutation.mutate();
    } else {
      bolglikeMutation.mutate();
    }
  };

  const clickBookmarkBtn = () => {
    if (!token) {
      alert("로그인이 필요한 기능입니다.");
    }

    if (memberInfo.memberId === Number(localStorage.getItem("memberId"))) {
      alert("자신의 글에는 북마크를 누를 수 없습니다.");
    }

    if (bookmarkStatus) {
      bookmarkDeleteMutation.mutate();
    } else {
      bookmarkAddMutation.mutate();
    }
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
        <StyledSWiper
          slidesPerView={1.6}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
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
        <UserThumbnail>
          <img
            src={memberInfo.memberImage ? memberInfo.memberImage : profileImage}
            alt="프로필 이미지"
          />
        </UserThumbnail>
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
  display: block;
  width: 100%;
  height: 383px;
  margin-bottom: 30px;
  .swiper-slide {
    width: 100%;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin-bottom: 50px;
`;

const UserThumbnail = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  overflow: hidden;
  & > img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
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
