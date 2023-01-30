import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import Selectbox from "../components/atom/Selectbox";
import BlogReviewListWrapper from "../components/blogreview/BlogReviewList";
import Button from "../components/atom/Button";
import SimpleInput from "../components/atom/SimpleInput";

const BlogReviewList = () => (
  <Container>
    <Title>전시 리뷰</Title>
    <Divider />
    <SelectContainer>
      <div style={{ columnCount: "2" }}>
        <Selectbox
          placeholder="최신 순"
          options={["최신 순", "인기 순"]}
          width="130px"
          name="정렬 필터"
          onClick={(e: React.MouseEvent<HTMLElement>, name = "sjei") => {}}
        />
        <Button size="small" variant="primary">
          적용
        </Button>
      </div>
      <div>
        <SimpleInput />
        <Button size="large" variant="primary">
          리뷰 등록
        </Button>
      </div>
    </SelectContainer>
    {/* <BlogReviewListWrapper /> */}
  </Container>
);

export default BlogReviewList;

const Container = styled.div`
  width: 62.5vw;
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

const Filter = styled.div`
  display: flex;
  gap: 10px;
`;
