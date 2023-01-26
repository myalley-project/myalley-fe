import React, { useEffect, useState } from "react";
import styled from "styled-components";
import heartOff from "../../assets/icons/heartOff.svg";
import shareOff from "../../assets/icons/shareOff.svg";
import { theme } from "../../styles/theme";

export interface MainCardType {
  title: string;
  date: string;
  place: string;
  charge: number;
}

const MainCard = ({ title, date, place, charge }: MainCardType) => {
  const [auth, setAuth] = useState(localStorage.getItem("authority"));

  return (
    <CardContainer>
      <Card>
        <ImageContainer />
        <InfoContainer>
          {auth === "ROLE_ADMIN" && (
            <EditButtons>
              <Button>수정</Button>
              <Button>삭제</Button>
            </EditButtons>
          )}
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
            <InfoDetail style={{ marginBottom: "0px" }}>
              <dt>관람비용</dt>
              <dd>{charge}</dd>
            </InfoDetail>
          </div>
          <Footer>
            {/* 나중에 링크로 수정 */}
            <p>사이트 방문</p>
            <img src={heartOff} alt="like icon" />
            <img src={shareOff} alt="share icon" />
          </Footer>
        </InfoContainer>
      </Card>
    </CardContainer>
  );
};

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
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
`;

const ImageContainer = styled.div`
  width: 278px;
  background-color: #d9d9d9;
`;

const InfoContainer = styled.div`
  width: 922px;
  padding: 30px;
`;

const EditButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  height: 30px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  padding: 0;
  color: ${theme.colors.greys60};
  font-size: 14px;
  cursor: pointer;
  &:hover {
    font-weight: 700;
    color: ${theme.colors.greys100};
  }
`;

const Title = styled.h1`
  width: 100%;
  font-weight: 700;
  font-size: 42px;
  line-height: 52px;
  letter-spacing: -0.5px;
  color: ${theme.colors.greys90};
  text-align: left;
  word-break: break-all;
`;

const InfoDetail = styled.dl`
  display: flex;
  width: fit-content;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.5px;
  color: ${theme.colors.greys80};
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
  color: ${theme.colors.greys60};
  text-align: right;
  p {
    line-height: 24px;
  }
`;
