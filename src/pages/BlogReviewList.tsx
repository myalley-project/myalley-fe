import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import Selector from "../components/Selector";
import BlogReviewCard from "../components/blogreview/BlogReviewCard";

const BlogReviewList = () => (
  <Container>
    <Title>전시 리뷰</Title>
    <Divider />
    <SelectContainer>
      <div>
        <Selector options={["최신순", "오래된순"]} width="130px" />
        <button type="button">여기 확인</button>
      </div>
      <div>
        <Selector options={["최신순", "오래된순"]} width="130px" />
        <button type="button">여기 확인</button>
      </div>
    </SelectContainer>
    <ListContainer>
      <BlogReviewCard />
      <BlogReviewCard />
      <BlogReviewCard />
      <BlogReviewCard />
      <BlogReviewCard />
      <BlogReviewCard />
      <BlogReviewCard />
      <BlogReviewCard />
      <BlogReviewCard />
    </ListContainer>
  </Container>
);

export default BlogReviewList;

const Container = styled.div`
  width: 1200px;
  margin-inline: auto;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 28px;
  color: ${theme.colors.greys90};
  text-align: center;
  margin-bottom: 50px;
`;

const Divider = styled.div`
  border-radius: 0px;
  border-bottom: 1px solid ${theme.colors.greys90};
  margin-bottom: 14px;
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  margin-bottom: 30px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 30px;
  margin-bottom: 120px;
`;
