import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import Button from "./atom/Button";

const ReviewSearchbar = () => (
  <div>
    <SearchbarContainer>
      <p>
        <span>999</span> 개의 리뷰를 확인해보세요!
      </p>
      <Searchbar>
        <div>여기 써치바!</div>
        <Button variant="primary" size="large">
          리뷰 등록
        </Button>
      </Searchbar>
    </SearchbarContainer>
    <Divider />
    <ButtonItems>
      <button type="button">최신순</button>
      <Spliter />
      <button type="button">별점순</button>
    </ButtonItems>
  </div>
);

export default ReviewSearchbar;

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
