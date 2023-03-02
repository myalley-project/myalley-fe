import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import Button from "../atom/Button";
import SearchBar from "../atom/Searchbar";

interface ReviewSearchbarProps {
  setFilter: (state: "oneline" | "blog") => void;
  setOrderType: (state: "Recent" | "StarScore" | "ViewCount") => void;
  handleReviewModal: () => void;
  filter: "oneline" | "blog";
  orderType: "StarScore" | "Recent" | "ViewCount";
  totalElement: number;
}

const ReviewSearchBar = ({
  setFilter,
  setOrderType,
  orderType,
  filter,
  totalElement,
  handleReviewModal,
}: ReviewSearchbarProps) => (
  <Container>
    <ReviewSelector>
      <button
        className={filter === "oneline" ? "selected" : ""}
        onClick={() => setFilter("oneline")}
        type="button"
      >
        한 줄 리뷰
      </button>
      <Spliter />
      <button
        className={filter === "blog" ? "selected" : ""}
        onClick={() => setFilter("blog")}
        type="button"
      >
        블로그 리뷰
      </button>
    </ReviewSelector>
    <SearchbarContainer>
      {totalElement !== 0 ? (
        <p>
          <span>{totalElement}</span>개의 리뷰를 확인해보세요!
        </p>
      ) : (
        <p>
          <span>0</span>개의 리뷰를 확인해보세요!
        </p>
      )}
      <Searchbar>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            return alert("아직 준비중인 기능입니다.");
          }}
        >
          <SearchBar
            placeholder="검색"
            width="277px"
            onClick={() => alert("준비중인 기능입니다.")}
          />
        </form>
        <Button onClick={handleReviewModal} variant="primary" size="large">
          리뷰 등록
        </Button>
      </Searchbar>
    </SearchbarContainer>
    <Divider />
    <ButtonItems>
      <button
        onClick={() => setOrderType("Recent")}
        type="button"
        className={orderType === "Recent" ? "selected" : ""}
      >
        최근순
      </button>
      <Spliter />
      {filter === "oneline" ? (
        <button
          onClick={() => setOrderType("StarScore")}
          type="button"
          className={orderType === "StarScore" ? "selected" : ""}
        >
          별점순
        </button>
      ) : (
        <button
          onClick={() => setOrderType("ViewCount")}
          type="button"
          className={orderType === "Recent" ? "selected" : ""}
        >
          조회수순
        </button>
      )}
    </ButtonItems>
  </Container>
);

export default ReviewSearchBar;

const Container = styled.div`
  margin-bottom: 30px;
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
    cursor: pointer;
    &:is(:hover, :focus) {
      color: ${theme.colors.greys100};
    }
  }
  & > button.selected {
    color: ${theme.colors.greys100};
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
    cursor: pointer;
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
