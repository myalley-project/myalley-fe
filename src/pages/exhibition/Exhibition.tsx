import React from "react";
import styled from "styled-components";
import MainCard from "../../components/exhibition/mainCard";
import ContentCard from "../../components/exhibition/contentCard";

function Exhibition() {
  return (
    <ExhibitionContainer>
      <MainCard
        title="DDP 오픈큐레이팅 vol.26 <Beyond The City: Cultural Monuments>"
        date="2022-12-14 ~ 2023-01-15"
        place="DDP"
        time="10:00 ~ 20:00"
        charge="무료"
       />
      <div>상세정보/전시리뷰 버튼</div>
      <div>
        <ToggleSwitch type="checkbox" />
      </div>
      <ContentCard title="기획 의도" content="lorem" />
      <ContentCard title="전시 내용" content="lorem" />
      <ContentCard title="작가 정보" content="lorem" />
      {/* <div>
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

const ToggleSwitch = styled.input`
  border: 1px solid #000000;
  width: 380px;
  ::before {
    content: "상세정보";
  }
  ::after {
    content: "";
    display: block;
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ffc8c8;
    transition: all 1s ease-in-out;
  }

  &:checked {
    ::before {
      content: "전시 리뷰";
    }
    ::after {
      content: "";
      display: block;
      position: absolute;
      right: 0;
      width: 30px;
      height: 10px;
      border-radius: 50%;
      background-color: #ffc8c8;
      transition: all 1s ease-in-out;
    }
  }
`;
