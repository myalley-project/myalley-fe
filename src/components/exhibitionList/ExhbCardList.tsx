import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Exhibition } from "../../types/exhbList";
import { theme } from "../../styles/theme";
import NoList from "../NoList";

interface ExhbCardListType {
  exhbList: Exhibition[]; // 전시회 목록 데이터
  type: "myPage" | "exhbList";
}

// 전시회 카드 목록 컴포넌트_박예선_23.02.10
const ExhbCardList = ({ exhbList, type }: ExhbCardListType) => (
  <CardListContainer>
    {exhbList.length === 0 && <NoList notice="등록된 전시글이 없습니다" />}
    {exhbList.map((exhb) => {
      const { id, title, space, duration, posterUrl, viewCount } = exhb;
      return (
        <ExhibitionCard key={exhb.id} type={type}>
          <Link to={`/exhibition/${id}`}>
            <Thumbnail alt="thumbnail" src={posterUrl} />
          </Link>
          <Link className="content-box" to={`/exhibition/${id}`}>
            <Content>
              <ContentTop>
                <div className="title">{title}</div>
                <div className="space">{space}</div>
              </ContentTop>
              <ContentFooter>
                <div className="exhb-period">{duration}</div>
                <span className="viewCount">조회수 {viewCount}</span>
              </ContentFooter>
            </Content>
          </Link>
        </ExhibitionCard>
      );
    })}
  </CardListContainer>
);

export default ExhbCardList;

/* font-size: 1064px 이하일 때 4씩, 624px 이하일 때 2씩 감소 */

const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1440px;
`;

const ExhibitionCard = styled.div<{
  type: "exhbList" | "myPage";
}>`
  position: relative;
  width: ${(props) => (props.type === "exhbList" ? "23.43%" : "31.66%")};
  margin-right: ${(props) => (props.type === "exhbList" ? "2.093%" : "2.5%")};
  margin-bottom: ${(props) => (props.type === "exhbList" ? "2.093%" : "2.5%")};
  aspect-ratio: 1/1.48;
  border: 1px solid ${theme.colors.greys40};
  border-radius: 33px;
  cursor: pointer;
  :hover {
    border: 1px solid ${theme.colors.primry60};
    box-shadow: 0px 0px 20px #381e7218;
    color: ${theme.colors.primry60};
    div,
    span {
      color: ${theme.colors.primry60};
    }
    .title {
      color: ${theme.colors.primry80};
    }
  }
  :nth-child(4n) {
    margin-right: ${(props) => props.type === "exhbList" && 0};
  }
  :nth-child(3n) {
    margin-right: ${(props) => props.type === "myPage" && 0};
  }
  .content-box {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    align-items: center;
    width: 82.24%;
    height: 30%;
    text-decoration: none;
  }
  @media (max-width: 1440px) {
    width: 31.66%;
    margin-right: 2.5%;
    margin-bottom: 2.5%;
    :nth-child(3n) {
      margin-right: 0;
    }
    :nth-child(4n) {
      margin-right: 2.5%;
    }
  }
`;

const Thumbnail = styled.img`
  position: absolute;
  width: 100%;
  height: 70%;
  border-bottom: 1px solid ${theme.colors.greys40};
  border-radius: 32.3px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  object-fit: cover;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 60%;
`;

const ContentTop = styled.div`
  height: 30.4%;
  max-height: 28px;
  color: ${theme.colors.greys90};
  .title {
    position: relative;
    border-radius: 0;
    font-size: 20px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    @media (max-width: 1064px) {
      font-size: 16px;
    }
    @media (max-width: 624px) {
      font-size: 14px;
    }
  }
  .space {
    line-height: 16px;
    margin: 3% 0 0;
    font-size: 12px;
    color: ${theme.colors.greys60};
    @media (max-width: 1064px) {
      font-size: 12px;
    }
    @media (max-width: 624px) {
      font-size: 10px;
    }
  }
`;

const ContentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
  line-height: 24px;
  font-size: 14px;
  .exhb-period {
    color: ${theme.colors.greys80};
  }
  .viewCount {
    color: ${theme.colors.greys60};
  }
  @media (max-width: 1064px) {
    font-size: 10px;
  }
  @media (max-width: 624px) {
    font-size: 8px;
  }
`;
