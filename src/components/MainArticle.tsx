import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../styles/theme";
import ArrowButton from "../assets/icons/arrowRight.svg";

const MainArticle = () => (
  <ArticleContainer>
    <Article>
      <Icon />
      <div>
        <h3>전시회</h3>
        <p>다양한 전시 정보를 찾아보세요</p>
      </div>
      <StyledLink to="/exhibition-list">
        <span>자세히 보기</span>
        <img src={ArrowButton} alt="" />
      </StyledLink>
    </Article>
    <Article>
      <Icon />
      <div>
        <h3>전시 리뷰</h3>
        <p>다양한 전시 리뷰 를 찾아보세요</p>
      </div>
      <StyledLink to="/blogreview-list">
        <span>자세히 보기</span>
        <img src={ArrowButton} alt="" />
      </StyledLink>
    </Article>
    <Article>
      <Icon />
      <div>
        <h3>메이트</h3>
        <p>전시회에 같이 갈 친구를 찾아보세요</p>
      </div>
      <StyledLink to="/mate-list">
        <span>자세히 보기</span>
        <img src={ArrowButton} alt="" />
      </StyledLink>
    </Article>
  </ArticleContainer>
);

export default MainArticle;

const ArticleContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 75vw;
  margin-inline: auto;
  margin-bottom: 30px;
  & > * {
    flex: 1;
  }
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border: 1px solid ${theme.colors.greys40};
  border-radius: 30px;
  gap: 30px;
  text-align: center;
  & h3 {
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 28px;
  }
  & p {
    color: #9c9c9c;
    font-size: 14px;
  }
`;

const Icon = styled.div`
  width: 87px;
  height: 87px;
  background-color: #ffcaca;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: ${theme.colors.greys60};
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
`;
