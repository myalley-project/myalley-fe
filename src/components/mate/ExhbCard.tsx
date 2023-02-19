import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme";

interface ExhbCardType {
  exhbData: {
    exhibitionId: number;
    exhibitionTitle: string;
    exhibitionSpace: string;
    posterUrl: string;
    exhibitionDuration: string; // yyyy-mm-dd ~ yyyy-mm-dd
    type: string;
  };
}

// 메이트 모집글 전시회 카드컴포넌트_박예선_23.02.15
const ExhbCard = (props: ExhbCardType) => {
  const { exhbData } = props;
  const {
    exhibitionId,
    exhibitionTitle,
    exhibitionSpace,
    exhibitionDuration,
    type,
    posterUrl,
  } = exhbData;
  const navigate = useNavigate();
  const [thumbnailHeight, setThumbnailHeight] = useState(52);

  // 제목의 높이에 따라 썸네일 높이 변경_박예선_23.02.12
  useEffect(() => {
    const heightTimeout = setTimeout(() => {
      const height = document.querySelector(".title")?.clientHeight;
      setThumbnailHeight(height! + 190);
    }, 100);

    return () => {
      clearTimeout(heightTimeout);
    };
  }, []);

  return (
    <ExhbCardContainer onClick={() => navigate(`/exhibition/${exhibitionId}`)}>
      <Thumbnail
        height={thumbnailHeight}
        className="thumbnail"
        src={posterUrl}
        alt="thumbnail"
      />
      <InfoContainer>
        <Title className="title">{exhibitionTitle}</Title>
        <DetailContainer>
          <Detail>
            <div className="detail-name">일정</div>
            <div>{exhibitionDuration}</div>
          </Detail>
          <Detail>
            <div className="detail-name">장소</div>
            <div>{exhibitionSpace}</div>
          </Detail>
          <Detail>
            <div className="detail-name">전시 유형</div>
            <div>{type}</div>
          </Detail>
        </DetailContainer>
      </InfoContainer>
    </ExhbCardContainer>
  );
};

export default ExhbCard;

const ExhbCardContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin-top: 14px;
  border: 1px solid ${theme.colors.greys40};
  background-color: ${theme.colors.white100};
  cursor: pointer;
  .flex {
    display: flex;
  }
  @media (max-width: 370px) {
    flex-direction: column;
  }
`;

const Thumbnail = styled.img<{ height: number }>`
  width: 31.6%;
  height: ${(props) => `${props.height}px`};
  object-fit: cover;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  @media (max-width: 624px) {
    width: 40%;
  }
  @media (max-width: 370px) {
    width: inherit;
    height: 150px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;
  @media (max-width: 1440px) {
    padding: 20px;
  }
  @media (max-width: 1072px) {
    padding: 16px;
  }
`;

const Title = styled.div`
  margin-bottom: 30px;
  color: ${(props) => props.theme.colors.greys90};
  font-size: 42px;
  font-weight: 700;
  line-height: 52px;
  @media (max-width: 1440px) {
    font-size: 2.9vw;
    line-height: 3.61vw;
  }
  @media (max-width: 690px) {
    font-size: 20px;
    line-height: 30px;
  }
  @media (max-width: 370px) {
    margin-bottom: 10px;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 370px) {
    gap: 0;
  }
`;

const Detail = styled.div`
  display: flex;
  div {
    font-size: 14px;
    font-weight: 500;
    line-height: 26px;
    color: ${theme.colors.greys90};
  }
  .detail-name {
    width: 72px;
    margin-right: 30px;
    color: ${theme.colors.greys60};
  }
  @media (max-width: 624px) {
    .detail-name {
      margin-right: 5px;
    }
  }
`;
