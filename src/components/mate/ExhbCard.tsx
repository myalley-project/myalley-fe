import React from "react";
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
    exhibitionType: string;
  };
}

// 메이트 모집글 전시회 카드컴포넌트_박예선_23.02.08
const ExhbCard = (props: ExhbCardType) => {
  const { exhbData } = props;
  const {
    exhibitionId,
    exhibitionTitle,
    exhibitionSpace,
    exhibitionDuration,
    exhibitionType,
    posterUrl,
  } = exhbData;
  const navigate = useNavigate();
  return (
    <ExhbCardContainer onClick={() => navigate(`/exhibition/${exhibitionId}`)}>
      <Thumbnail className="thumbnail" src={posterUrl} alt="thumbnail" />
      <InfoContainer>
        <div className="title">{exhibitionTitle}</div>
        <DetailContainer>
          <div className="flex">
            <div className="detail-name">일정</div>
            <div>{exhibitionDuration}</div>
          </div>
          <div className="flex">
            <div className="detail-name">장소</div>
            <div>{exhibitionSpace}</div>
          </div>
          <div className="flex">
            <div className="detail-name">전시 유형</div>
            <div>{exhibitionType}</div>
          </div>
        </DetailContainer>
      </InfoContainer>
    </ExhbCardContainer>
  );
};

export default ExhbCard;

const ExhbCardContainer = styled.div`
  display: flex;
  width: 83vw;
  max-width: 1200px;
  height: 244px;
  margin-top: 14px;
  border: 1px solid ${theme.colors.greys40};
  background-color: ${theme.colors.white100};
  cursor: pointer;
  .flex {
    display: flex;
  }
`;

const Thumbnail = styled.img`
  width: 31.6%;
  object-fit: cover;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const InfoContainer = styled.div`
  padding: 30px;
  .title {
    height: 104px;
    color: ${(props) => props.theme.colors.greys90};
    font-size: 42px;
    font-weight: 700;
    line-height: 52px;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 50px;
  div > div {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: ${theme.colors.greys90};
    &.detail-name {
      width: 72px;
      margin-right: 30px;
      color: ${theme.colors.greys60};
    }
  }
`;
