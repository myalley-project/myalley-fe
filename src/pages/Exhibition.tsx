import React from "react";
import styled from "styled-components";
import MainCard from "../components/exhibition/MainCard";
import ContentCard from "../components/exhibition/ContentCard";
import ToggleSwitch from "../components/exhibition/ToggleSwitch";

const Exhibition = () => (
  <ExhibitionContainer>
    <MainCard
      title="DDP 오픈큐레이팅 vol.26 <Beyond The City: Cultural Monuments>"
      date="2022-12-14 ~ 2023-01-15"
      place="DDP"
      time="10:00 ~ 20:00"
      charge="무료"
    />
    <ToggleSwitch />
    <ContentCard title="기획 의도" content="lorem" />
    <ContentCard title="전시 내용" content="lorem" />
    <ContentCard title="작가 정보" content="lorem" />
  </ExhibitionContainer>
);

export default Exhibition;

const ExhibitionContainer = styled.div`
  width: 1903px;
  text-align: center;
  border-radius: 0px;
`;
