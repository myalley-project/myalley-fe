import React, { useEffect, useState } from "react";
import styled from "styled-components";
import likeIcon from "../../assets/icons/like.svg";
import shareIcon from "../../assets/icons/share.svg";

type MainCardType = {
  [key in "title" | "date" | "place" | "time" | "charge"]: string;
};

const MainCard = ({ title, date, place, time, charge }: MainCardType) => {
  const [cardHeight, setCardHeight] = useState("358px");
  const [auth, setAuth] = useState("user");

  useEffect(() => {
    if (auth === "admin") {
      setCardHeight("412px");
    } else setCardHeight("358px");
  }, [auth, cardHeight]);

  return (
    <CardContainer>
      <Card height={cardHeight}>
        <ImageContainer />
        <InfoContainer height={cardHeight}>
          {auth === "admin" && (
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
            <img src={likeIcon} alt="like icon" />
            <img src={shareIcon} alt="share icon" />
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

const Card = styled.div<{ height: string }>`
  display: flex;
  max-width: 1200px;
  width: 83vw;
  height: ${(props) => props.height};
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
`;

const ImageContainer = styled.div`
  width: 278px;
  height: 100%;
  background-color: #d9d9d9;
`;

const InfoContainer = styled.div<{ height: string }>`
  width: 922px;
  height: ${(props) => props.height};
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
  color: ${(props) => props.theme.colors.greys60};
  font-size: 14px;
  cursor: pointer;
  &:hover {
    font-weight: 700;
    color: ${(props) => props.theme.colors.greys100};
  }
`;

const Title = styled.h1`
  width: 100%;
  height: 104px;
  font-weight: 700;
  font-size: 42px;
  line-height: 52px;
  letter-spacing: -0.5px;
  color: ${(props) => props.theme.colors.greys90};
  text-align: left;
`;

const InfoDetail = styled.dl`
  display: flex;
  width: fit-content;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.5px;
  color: ${(props) => props.theme.colors.greys80};
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
  color: ${(props) => props.theme.colors.greys60};
  text-align: right;
  p {
    line-height: 24px;
  }
`;
