import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const BlogReviewCard = () => (
  <Container>
    <Image />
    <Review>
      <h2>리뷰 제목</h2>
      <p>별명</p>
      <div>
        <div>2022-12-14</div>
        <div>조회수 999</div>
      </div>
    </Review>
  </Container>
);

export default BlogReviewCard;

const Container = styled.div`
  width: 380px;
  height: fit-content;
`;

const Image = styled.div`
  height: 244px;
  background-color: brown;
`;

const Review = styled.div`
  padding: 30px;
  & h2 {
    font-weight: bold;
    font-size: 20px;
    color: ${theme.colors.greys90};
  }
  & span {
    color: ${theme.colors.greys80};
    margin-bottom: 20px;
  }
  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
