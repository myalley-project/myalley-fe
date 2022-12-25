import React from "react";
import styled from "styled-components";
import MainCard from "../../components/exhibition/mainCard";

function Exhibition() {
  return (
    <ExhibitionContainer>
      <MainCard
        title="DDP 오픈큐레이팅 vol.26 <Beyond The City: Cultural Monuments>"
        date="2022-12-14 ~ 2023-01-15"
        place="DDP"
        time="10:00 ~ 20:00"
        charge="무료"
      ></MainCard>

      {/* <div>
        <div>상세정보/전시리뷰 버튼</div>
        <div>기획의도 box</div>
        <div>전시내용 box</div>
        <div>작가 정보 box</div>
      </div> */}
    </ExhibitionContainer>
  );
}

export default Exhibition;

const ExhibitionContainer = styled.div`
  width: 1920px;
  text-align: center;
`;
