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
          <p>다양한 전시 정보를 찾아보세요</p>
        </div>
        <LinkContainer>
          <span className="linkContainer">자세히 보기</span>
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
          <p>다양한 전시 리뷰 를 찾아보세요</p>
        </div>
        <LinkContainer>
          <span className="linkContainer">자세히 보기</span>
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
          <p>전시회에 같이 갈 친구를 찾아보세요</p>
        </div>
        <LinkContainer className="linkContainer">
          <span>자세히 보기</span>
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
  max-width: 460px;
  padding: 30px;
  border: 1px solid ${theme.colors.greys40};
  border-radius: 30px;
  gap: 30px;
  text-align: center;
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
    border: 2px solid ${theme.colors.primry60};
    & h3,
    p,
    .linkContainer {
      color: ${theme.colors.primry80};
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
`;
