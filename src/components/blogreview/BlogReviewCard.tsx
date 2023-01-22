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
  border: 1px solid ${theme.colors.greys60};
`;

const Image = styled.div`
  height: 244px;
  background-color: brown;
`;

const Review = styled.div`
  padding: 30px;
  & > h2 {
    font-weight: bold;
    font-size: 20px;
    color: ${theme.colors.greys90};
    margin-bottom: 4px;
  }
  & > p {
    font-weight: 500;
    font-size: 14px;
    color: ${theme.colors.greys60};
    margin-bottom: 20px;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    font-size: 14px;
    font-weight: 500;
    & > :first-child {
      color: ${theme.colors.greys80};
    }
    & > :last-child {
      color: ${theme.colors.greys60};
    }
  }
`;
