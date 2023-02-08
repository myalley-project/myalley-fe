import React from "react";
import styled from "styled-components";
import { BlogReviewResponse } from "../../../types/blogReview";
import NoList from "../../NoList";
import BlogReviewCard from "../presentation/BlogReviewCard";

const ReviewCardList = ({ blogInfo }: BlogReviewResponse) => (
  <ReviewCardListContainer>
    {blogInfo.length === 0 && <NoList notice="작성된 리뷰가 없습니다." />}
    {blogInfo.length !== 0 &&
      blogInfo.map((each) => (
        <BlogReviewCard
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
  /* grid-template-columns: repeat(auto-fill, minmax(250px, 380px)); */
  grid-template-columns: repeat(auto-fit, 380px);

  grid-template-rows: auto;
  /* align-content:; */
  /* flex-flow: row wrap; */
  gap: 30px;
  margin-bottom: 120px;
`;
