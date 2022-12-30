import React from "react";
import styled from "styled-components";
import Like from "../../assets/icons/Like.svg";
import Share from "../../assets/icons/Share.svg";

// 나중에 수정 필요
interface MainCardType {
  title: string;
  date: string;
  place: string;
  time: string;
  charge: string;
}

const MainCard = ({ title, date, place, time, charge }: MainCardType) => (
  <CardContainer>
    <Card>
      <ImageContainer />
      <InfoContainer>
        <Title>{title}</Title>
        <div style={{ padding: "30px 0" }}>
          <InfoDetail>
            <dt>시간</dt>
            <dd>{date}</dd>
          </InfoDetail>
          <InfoDetail>
            <dt>장소</dt>
            <dd>{place}</dd>
          </InfoDetail>
          <InfoDetail>
            <dt>시간</dt>
            <dd>{time}</dd>
          </InfoDetail>
          <InfoDetail style={{ marginBottom: "0px" }}>
            <dt>관람비용</dt>
            <dd>{charge}</dd>
          </InfoDetail>
        </div>
        <Footer>
          {/* 나중에 링크로 수정 */}
          <p>사이트 방문</p>
          <img src={Like} alt="like icon" />
          <img src={Share} alt="share icon" />
        </Footer>
      </InfoContainer>
    </Card>
  </CardContainer>
);

export default MainCard;

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 458px;
  align-items: center;
  justify-content: center;
  border-radius: 0px;
  background-color: #f5f5f5;
`;

const Card = styled.div`
  display: flex;
  max-width: 1200px;
  width: 83vw;
  height: 358px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
`;

const ImageContainer = styled.div`
  width: 278px;
  height: 100%;
  background-color: #d9d9d9;
`;

const InfoContainer = styled.div`
  width: 922px;
  height: 358px;
  padding: 30px;
`;

const Title = styled.h1`
  width: 100%;
  height: 104px;
  font-weight: 700;
  font-size: 42px;
  line-height: 52px;
  letter-spacing: -0.5px;
  color: ${(props) => props.theme.colors.txt}
  text-align: left;
`;

const InfoDetail = styled.dl`
  display: flex;
  width: fit-content;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.5px;
  color: ${(props) => props.theme.colors.pressed}
  text-align: left;
  margin-bottom: 10px;
  dt {
    width: 72px;
    font-weight: 500;
    margin-right: 30px;
  }
  dd {
    font-weight: 400;
  }
`;

const Footer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.5px;
  color: ${(props) => props.theme.colors.hover}
  text-align: right;
  p {
    line-height: 24px;
  }
`;
