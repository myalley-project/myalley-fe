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
    status: "현재 전시" | "예정 전시" | "지난 전시";
  };
}

// 메이트 모집글 전시회 카드컴포넌트_박예선_23.01.26
const ExhbCard = (props: ExhbCardType) => {
  const { exhbData } = props;
  const {
    exhibitionId,
    exhibitionTitle,
    exhibitionSpace,
    exhibitionDuration,
    posterUrl,
  } = exhbData;
  const navigate = useNavigate();
  return (
    <ExhbCardContainer onClick={() => navigate(`/exhibition/${exhibitionId}`)}>
      <Thumbnail className="thumbnail" src={posterUrl} alt="thumbnail" />
      <InfoContainer>
        <div className="title">{exhibitionTitle}</div>
        <DetailContainer>
          <div className="date flex">
            <div className="detail-name">일정</div>
            <div>{exhibitionDuration}</div>
          </div>
          <div className="flex">
            <div className="detail-name">장소</div>
            <div>{exhibitionSpace}</div>
          </div>
        </DetailContainer>
      </InfoContainer>
    </ExhbCardContainer>
  );
};

export default ExhbCard;

const ExhbCardContainer = styled.div`
  display: flex;
  height: 244px;
  margin: 14px 0 30px;
  border: 1px solid ${theme.colors.greys40};
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 175px;
  height: inherit;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  margin: 30px;
  border-radius: 0;
  .title {
    height: 104px;
    color: ${(props) => props.theme.colors.greys90};
    font-size: 42px;
    font-weight: 700;
    line-height: 52px;
  }
`;

const DetailContainer = styled.div`
  height: 50px;
  margin-top: 30px;
  div {
    div {
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
    &.date {
      margin-bottom: 10px;
    }
  }
`;
