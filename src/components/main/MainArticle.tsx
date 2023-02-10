import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import arrowRight from "../../assets/icons/arrowRight.svg";
import { theme } from "../../styles/theme";
import { ReactComponent as Exhibition } from "../../assets/icons/exhibition.svg";
import { ReactComponent as Review } from "../../assets/icons/review.svg";
import { ReactComponent as Mate } from "../../assets/icons/mate.svg";

const MainArticle = () => {
  const navigate = useNavigate();
  const [exhbStroke, setExhbStroke] = useState(`${theme.colors.greys90}`);
  const [reviewStroke, setReviewStroke] = useState(`${theme.colors.greys90}`);
  const [mateStroke, setMateStroke] = useState(`${theme.colors.greys90}`);

  return (
    <ArticleContainer>
      <Article
        onMouseOver={() => setExhbStroke(`${theme.colors.primry80}`)}
        onMouseOut={() => setExhbStroke(`${theme.colors.greys90}`)}
        onClick={() => navigate("/exhibition-list")}
      >
        <Exhibition stroke={exhbStroke} />
        <div>
          <h3>전시회</h3>
          <p className="card-discription">
            <span>다양한</span>
            <span>전시 정보를</span> 찾아보세요
          </p>
        </div>
        <LinkContainer>
          <p>
            <span>자세히</span>
            보기
          </p>
          <img src={arrowRight} alt="" />
        </LinkContainer>
      </Article>
      <Article
        onMouseOver={() => setReviewStroke(`${theme.colors.primry80}`)}
        onMouseOut={() => setReviewStroke(`${theme.colors.greys90}`)}
        onClick={() => navigate("/blogreview-list")}
      >
        <Review stroke={reviewStroke} />
        <div>
          <h3>전시 리뷰</h3>
          <p className="card-discription">
            <span>다양한</span>
            <span>전시 리뷰를</span> 찾아보세요
          </p>
        </div>
        <LinkContainer>
          <p>
            <span>자세히</span>
            보기
          </p>
          <img src={arrowRight} alt="" />
        </LinkContainer>
      </Article>
      <Article
        onMouseOver={() => setMateStroke(`${theme.colors.primry80}`)}
        onMouseOut={() => setMateStroke(`${theme.colors.greys90}`)}
        onClick={() => navigate("/mate-list")}
      >
        <Mate stroke={mateStroke} />
        <div>
          <h3>메이트</h3>
          <p className="card-discription">
            <span>전시회에</span>
            <span>같이 갈</span>
            <span>친구를</span> 찾아보세요
          </p>
        </div>
        <LinkContainer>
          <p>
            <span>자세히</span> 보기
          </p>
          <img src={arrowRight} alt="" />
        </LinkContainer>
      </Article>
    </ArticleContainer>
  );
};

export default MainArticle;

const ArticleContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-inline: auto;
  margin-bottom: 30px;
  & > * {
    flex: 1;
  }
  @media (max-width: 1440px) {
    padding: 0 20px;
  }
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 460px;
  padding: 30px;
  border: 1px solid ${theme.colors.greys40};
  border-radius: 30px;
  gap: 30px;
  text-align: center;
  z-index: 99;
  cursor: pointer;
  & h3 {
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 28px;
  }
  & p {
    color: ${theme.colors.greys60};
    font-size: 14px;
  }
  &:hover {
    border: 1px solid ${theme.colors.primry60};
    & h3,
    p,
    span {
      color: ${theme.colors.primry80};
    }
  }
  .card-discription {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2.5px;
  }
  @media (max-width: 1439px) {
    & h3 {
      font-size: 1.9vw;
    }
  }
  @media (max-width: 1064px) {
    & h3 {
      font-size: 21px;
    }
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: ${theme.colors.greys60};
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  p {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2.5px;
  }
`;
