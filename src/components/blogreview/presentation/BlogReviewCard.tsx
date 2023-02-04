import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { BlogReviewInfo } from "../../../types/blogReview";

const BlogReviewCard = ({
  id,
  title,
  writer,
  viewDate,
  viewCount,
  imageInfo,
}: BlogReviewInfo) => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate("/blogreview-detail", { state: id })}>
      <Image>
        <img src={imageInfo.url} alt="블로그 리뷰 이미지" />
      </Image>
      <Review>
        <h2>{title}</h2>
        <p>{writer}</p>
        <div>
          <div>{viewDate}</div>
          <div>조회수 {viewCount}</div>
        </div>
      </Review>
    </Container>
  );
};

export default BlogReviewCard;

const Container = styled.div`
  border: 1px solid ${theme.colors.greys60};
`;

const Image = styled.div`
  height: 244px;
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
