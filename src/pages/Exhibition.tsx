import React, { useState } from "react";
import styled from "styled-components";
import MainCard from "../components/exhibition/MainCard";
import ContentCard from "../components/exhibition/ContentCard";
import ToggleSwitch from "../components/exhibition/ToggleSwitch";

const Exhibition = () => {
  const [state, setState] = useState("info");
  return (
    <ExhibitionContainer>
      <MainCard
        title="DDP 오픈큐레이팅 vol.26 <Beyond The City: Cultural Monuments>"
        date="2022-12-14 ~ 2023-01-15"
        place="DDP"
        charge="무료"
      />
      <ToggleSwitch setState={setState} />
      {state === "info" && (
        <>
          <ContentCard title="전시 내용" content="lorem" />
          <ContentCard title="작가 정보" content="lorem" />
        </>
      )}
    </ExhibitionContainer>
  );
};

export default Exhibition;

const ExhibitionContainer = styled.div`
  width: 100vw;
  text-align: center;
  border-radius: 0px;
`;
