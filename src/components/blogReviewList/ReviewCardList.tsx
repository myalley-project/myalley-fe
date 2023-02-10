import React from "react";
import styled from "styled-components";
import { BlogReviewResponse } from "../../types/blogReview";
import { BlogReviewListRes } from "../../apis/member";
import NoList from "../NoList";
import ReviewCard from "./ReviewCard";

const ReviewCardList = ({ blogInfo }: BlogReviewListRes) => (
  <ReviewCardListContainer>
    {blogInfo.length === 0 && <NoList notice="작성된 리뷰가 없습니다." />}
    {blogInfo.length !== 0 &&
      blogInfo.map((each) => (
        <ReviewCard
          key={each.id}
          id={each.id}
          title={each.title}
          writer={each.writer}
          viewDate={each.viewDate}
          viewCount={each.viewCount}
          imageInfo={each.imageInfo}
        />
      ))}
  </ReviewCardListContainer>
);

export default ReviewCardList;

const ReviewCardListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 380px);
  grid-template-rows: auto;
  gap: 30px;
  margin-bottom: 120px;
`;
