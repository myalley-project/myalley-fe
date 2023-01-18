import React, { useState } from "react";
// import axios, { AxiosResponse } from "axios";
import styled from "styled-components";
import MainCard from "../components/exhibition/MainCard";
import ContentCard from "../components/exhibition/ContentCard";
import ToggleSwitch from "../components/exhibition/ToggleSwitch";
// import exhibitionApi, { ExhibitionRes } from "../apis/exhibition";

const Exhibition = () => {
  // const test = async () => {
  //   try {
  //     const res: AxiosResponse<ExhibitionRes> = await exhibitionApi(1);
  //     const { data } = res;
  //     console.log(data.title);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const [state, setState] = useState("info");
  return (
    <ExhibitionContainer>
      {/* <button type="button" onClick={test}>
        api 통신 테스트 버튼
      </button> */}
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
