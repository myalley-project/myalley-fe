import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import Button from "./atom/Button";
import SearchBar from "./atom/Searchbar";

interface ReviewSearchbarProps {
  setFilter: (state: "oneline" | "blog") => void;
}

const ReviewSearchbar = ({ setFilter }: ReviewSearchbarProps) => (
  <Container>
    <ReviewSelector>
      <button onClick={() => setFilter("oneline")} type="button">
        한 줄 리뷰
      </button>
      <Spliter />
      <button onClick={() => setFilter("blog")} type="button">
        블로그 리뷰
      </button>
    </ReviewSelector>
    <SearchbarContainer>
      <p>
        <span>999</span>개의 리뷰를 확인해보세요!
      </p>
      <Searchbar>
        <SearchBar placeholder="검색" width="277px" />
        <Button variant="primary" size="large">
          리뷰 등록
        </Button>
      </Searchbar>
    </SearchbarContainer>
    <Divider />
    <ButtonItems>
      <button type="button">최근순</button>
      <Spliter />
      <button type="button">별점순</button>
    </ButtonItems>
  </Container>
);

export default ReviewSearchbar;

const Container = styled.div`
  & button.clicked {
    color: ${theme.colors.greys100};
  }
`;

const ReviewSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  & > button {
    color: ${theme.colors.greys60};
    font-weight: 700;
    font-size: 14px;
    border: 0;
    &:is(:hover, :focus) {
      color: ${theme.colors.greys100};
    }
  }
`;

const SearchbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > p {
    font-weight: 700;
    font-size: 20px;
    color: ${theme.colors.greys90};
    & > span {
      color: ${theme.colors.primry60};
    }
  }
`;

const Searchbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Divider = styled.div`
  border-bottom: 1px solid ${theme.colors.greys40};
  margin: 14px 0;
`;

const ButtonItems = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: first baseline;
  padding: 0px;
  & > button {
    color: ${theme.colors.greys60};
    font-weight: 500;
    font-size: 14px;
    border: 0;
    &:is(:hover, :focus) {
      color: ${theme.colors.greys100};
    }
  }
`;

const Spliter = styled.div`
  width: 1px;
  height: 16px;
  border-right: 1px solid ${theme.colors.greys10};
`;
