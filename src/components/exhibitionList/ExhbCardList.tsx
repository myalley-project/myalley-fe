import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { Exhibition } from "../../types/exhbList";

interface ExhbCardListType {
  exhbList: Exhibition[]; // 전시회 목록 데이터
  type: "myPage" | "exhbList";
}

const ExhbCardList = ({ exhbList, type }: ExhbCardListType) => (
  <CardListContainer>
    {exhbList.map((exhb) => {
      const { id, title, space, duration, posterUrl, viewCount } = exhb;
      return (
        <ExhibitionCard key={exhb.id} type={type}>
          <Link to={`/exhibition/${id}`}>
            <img alt="thumbnail" className="thumbnail" src={posterUrl} />
          </Link>
          <Link className="content-box flex" to={`/exhibition/${id}`}>
            <Content>
              <div className="content-top">
                <div className="title">{title}</div>
                <div className="space">{space}</div>
              </div>
              <div className="content-footer flex space-between">
                <div className="exhb-period">{duration}</div>
                <span className="viewCount">조회수 {viewCount}</span>
              </div>
            </Content>
          </Link>
        </ExhibitionCard>
      );
    })}
  </CardListContainer>
);

export default ExhbCardList;

const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: inherit;
`;

const ExhibitionCard = styled.div<{
  type: "exhbList" | "myPage";
}>`
  position: relative;
  width: ${(props) => (props.type === "exhbList" ? "23.43%" : "31.66%")};
  margin-right: ${(props) => (props.type === "exhbList" ? "2.093%" : "2.5%")};
  margin-bottom: ${(props) => (props.type === "exhbList" ? "2.093%" : "2.5%")};
  padding-bottom: 42.99%;
  border: 1px solid ${theme.colors.greys40};
  border-radius: 30px;
  .space-between {
    justify-content: space-between;
  }
  :nth-child(4n) {
    margin-right: ${(props) => props.type === "exhbList" && 0};
  }
  :nth-child(3n) {
    margin-right: ${(props) => props.type === "myPage" && 0};
  }
  .thumbnail {
    position: absolute;
    width: 100%;
    height: 75.5%;
    object-fit: cover;
    cursor: pointer;
  }
  .content-box {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    align-items: center;
    width: 82.24%;
    height: 24.5%;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 60.5%;
  .content-top {
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
    }
    .space {
      line-height: 16px;
      margin: 1.3% 0 0;
      font-size: 12px;
      color: ${theme.colors.greys60};
    }
  }
  .content-footer {
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
  }
`;
