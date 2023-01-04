import React from "react";
import styled from "styled-components";
import ArrowButton from "../assets/icons/arrowButton.svg";

const MainArticle = () => (
  <ArticleContainer>
    <Article>
      <Icon />
      <div>
        <h3>전시회</h3>
        <p>다양한 전시 정보를 찾아보세요</p>
      </div>
      <div>
        <button type="button">자세히 보기</button>
        <img src={ArrowButton} alt="" />
      </div>
    </Article>
    <Article>
      <Icon />
      <div>
        <h3>전시 리뷰</h3>
        <p>다양한 전시 리뷰 를 찾아보세요</p>
      </div>
      <div>
        <button type="button">자세히 보기</button>
        <img src={ArrowButton} alt="" />
      </div>
    </Article>
    <Article>
      <Icon />
      <div>
        <h3>메이트</h3>
        <p>전시회에 같이 갈 친구를 찾아보세요</p>
      </div>
      <div>
        <button type="button">자세히 보기</button>
        <img src={ArrowButton} alt="" />
      </div>
    </Article>
  </ArticleContainer>
);

export default MainArticle;

const ArticleContainer = styled.section`
  display: flex;
  gap: 30px;
`;

const Article = styled.article`
  padding: 30px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  text-align: center;
  & h3 {
    font-weight: bold;
    font-size: 28px;
    margin-bottom: 1rem;
  }
  & p {
    color: #9c9c9c;
  }
`;

const Icon = styled.div`
  background-color: aquamarine;
  width: 87px;
  height: 87px;
`;
