import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import blogReviewApis from "../../../apis/blogReviewApis";
import { BlogReviewInfo, BlogReviewResponse } from "../../../types/blogReview";
import BlogReviewCard from "../presentation/BlogReviewCard";

const BlogReviewListWrapper = ({ blogInfo }: BlogReviewResponse) => (
  <Container>
    <CardWrapper>
      {blogInfo &&
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
    </CardWrapper>
  </Container>
);

export default BlogReviewListWrapper;

const Container = styled.div`
  width: 62.5vw;
  margin-inline: auto;
`;

const CardWrapper = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(250px, 380px)); */
  grid-template-columns: repeat(auto-fit, 380px);

  grid-template-rows: auto;
  /* align-content:; */
  /* flex-flow: row wrap; */
  gap: 30px;
  margin-bottom: 120px;
`;
