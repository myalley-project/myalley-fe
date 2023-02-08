import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import logo from "../../assets/icons/logo.svg";
import { BlogReviewInfo } from "../../types/blogReview";

const ReviewCard = ({
  id,
  title,
  writer,
  viewDate,
  viewCount,
  imageInfo,
}: BlogReviewInfo) => {
  const navigate = useNavigate();
  const imageUrl = imageInfo?.url;

  return (
    <Container onClick={() => navigate("/blogreview-detail", { state: id })}>
      <ThumbnailContainer>
        {imageUrl && <img src={imageInfo.url} alt="블로그 리뷰 사진" />}
        {!imageUrl && (
          <img
            src={logo}
            alt="블로그 리뷰 사진"
            className="default-thumbnail"
          />
        )}
      </ThumbnailContainer>
      <Content>
        <h2>{title}</h2>
        <p>{writer}</p>
        <div>
          <div>{viewDate}</div>
          <div>조회수 {viewCount}</div>
        </div>
      </Content>
    </Container>
  );
};

export default ReviewCard;

const Container = styled.div`
  border: 1px solid ${theme.colors.greys60};
  aspect-ratio: 1/1.05;
  :hover {
    border: 1px solid ${theme.colors.primry60};
    box-shadow: 0px 0px 20px rgba(56, 30, 114, 0.1);
    cursor: pointer;
    h2 {
      color: ${theme.colors.primry80};
    }
    p,
    div > div {
      color: ${theme.colors.primry60};
    }
  }
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: inherit;
  height: 62%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .default-thumbnail {
    position: absolute;
    width: 50%;
    height: auto;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    border-radius: 0;
  }
`;

const Content = styled.div`
  height: 38%;
  padding: 30px;
  h2 {
    margin-bottom: 4px;
    color: ${theme.colors.greys90};
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
  }
  p {
    margin-bottom: 20px;
    color: ${theme.colors.greys60};
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
  div {
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
