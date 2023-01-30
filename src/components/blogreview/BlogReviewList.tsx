import React from "react";
import styled from "styled-components";
import { BlogReviewResponse } from "../../types/blogReview";
import BlogReviewCard from "./BlogReviewCard";

const BlogReviewListWrapper = ({ blogInfo }: BlogReviewResponse) => (
  <Container>
    {blogInfo.map((each) => (
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
  </Container>
);

export default BlogReviewListWrapper;

const Container = styled.div`
  width: 62.5vw;
  margin-inline: auto;
`;
