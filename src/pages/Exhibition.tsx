import React, { useState } from "react";
import styled from "styled-components";
import MainCard from "../components/exhibition/MainCard";
import ContentCard from "../components/exhibition/ContentCard";
import ToggleSwitch from "../components/exhibition/ToggleSwitch";

const Exhibition = () => {
  const [value, setValue] = useState("info");

  const onChangeMode = (type: string) => {
    if (type === "info") {
      setValue("info");
    } else if (type === "review") {
      setValue("review");
    }
  };

  return (
    <ExhibitionContainer>
      <MainCard
        title="DDP 오픈큐레이팅 vol.26 <Beyond The City: Cultural Monuments>"
        date="2022-12-14 ~ 2023-01-15"
        place="DDP"
        time="10:00 ~ 20:00"
        charge="무료"
      />
      <Switch value={value}>
        <span />
        <InfoBtn
          type="button"
          value={value}
          onClick={() => onChangeMode("info")}
        >
          상세정보
        </InfoBtn>
        <ReviewBtn
          type="button"
          value={value}
          onClick={() => onChangeMode("review")}
        >
          전시리뷰
        </ReviewBtn>
      </Switch>
      <ContentCard title="기획 의도" content="lorem" />
      <ContentCard title="전시 내용" content="lorem" />
      <ContentCard title="작가 정보" content="lorem" />
    </ExhibitionContainer>
  );
};

export default Exhibition;

const ExhibitionContainer = styled.div`
  width: 1903px;
  text-align: center;
  border-radius: 0px;
`;

const Switch = styled.div<{ value: string }>`
  position: relative;
  width: 380px;
  height: 44px;
  margin: 50px auto 30px auto;
  background-color: #9c9c9c;
  span {
    position: absolute;
    width: 188px;
    height: 40px;
    top: 2px;
    border-radius: 1000px;
    background-color: #ffffff;
    transition: all 0.6s ease-in-out;
    z-index: 1;
    ${({ value }) =>
      value === "info"
        ? "transform: translateX(0px)"
        : "transform: translateX(188px)"}
  }
`;

const button = styled.button<{ value: string }>`
  position: relative;
  width: 188px;
  height: 44px;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  z-index: 2;
`;

const InfoBtn = styled(button)`
  ${({ value }) =>
    value === "info" ? "transition:color 1s ease; color: #9C9C9C;" : null}
`;

const ReviewBtn = styled(button)`
  ${({ value }) =>
    value === "review" ? "transition:color 1s ease; color: #9C9C9C;" : null}
`;
