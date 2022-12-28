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
      <Container>
        <Input
          type="radio"
          id="toggle-switch"
          name="switch"
          value="상세정보"
          defaultChecked
        />
        <Label htmlFor="toggle-switch">
          <Span />
          상세정보
        </Label>
        <Input
          type="radio"
          id="toggle-switch2"
          name="switch"
          value="전시리뷰"
        />
        <Label htmlFor="toggle-switch2">전시리뷰</Label>
      </Container>
      <ContentCard title="기획 의도" content="lorem" />
      <ContentCard title="전시 내용" content="lorem" />
      <ContentCard title="작가 정보" content="lorem" />
    </ExhibitionContainer>
  );
}

export default Exhibition;

const ExhibitionContainer = styled.div`
  //반응형으로 수정하기
  width: 1903px;
  text-align: center;
  overflow: hidden;
  border-radius: 0px;
`;

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 380px;
  height: 44px;
  margin-top: 50px;
  margin-bottom: 30px;
  background-color: #9c9c9c;
`;

const Label = styled.label`
  display: inline-block;
  position: relative;
  width: 188px;
  height: 40px;
  margin-top: 2px;
  border-radius: 1000px;
  color: #ffffff;
  line-height: 40px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.7s ease-in-out;
  z-index: 2;
`;

const Span = styled.span`
  background-color: #ffffff;
  position: absolute;
  left: 0px;
  width: 188px;
  height: 40px;
  border-radius: 1000px;
  transition: all 0.7s ease-in-out;
  transform: translateX(188px);
  z-index: 1;
`;

const Input = styled.input`
  position: absolute;
  clip: rect(0, 0, 0, 0);
  width: 10px;
  height: 10px;
  border: 0;

  &:checked + ${Label} {
    color: #9c9c9c;
  }
  &:checked + ${Label} ${Span} {
    transform: translateX(0px);
  }
  &:checked + ${Label} ${Span}:after {
    transform: translateX(0px);
    content: "상세정보";
  }
`;
