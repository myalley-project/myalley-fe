import React, { useState } from "react";
import styled from "styled-components";
import MainCard from "../../components/exhibition/mainCard";
import ContentCard from "../../components/exhibition/contentCard";

function Exhibition() {
  const [value, setValue] = useState("상세정보");

  const onClicka = (e: any) => {
    if (value === "상세정보") {
      setValue("전시리뷰");
    } else if (value === "전시리뷰") {
      setValue("상세정보");
    }
    console.log(value);
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
      <Container>
        <Input
          type="radio"
          id="toggle-switch"
          name="switch"
          value="상세정보"
          onClick={onClicka}
        ></Input>
        <Span></Span>
        <Label htmlFor="toggle-switch">상세정보</Label>
        <Input
          type="radio"
          id="toggle-switch2"
          name="switch"
          value="전시리뷰"
          onClick={onClicka}
        ></Input>
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
  width: 1920px;
  text-align: center;
`;

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 380px;
  height: 44px;
  background-color: #9c9c9c;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const Label = styled.label`
  display: inline-block;
  width: 188px;
  height: 40px;
  margin-top: 2px;
  line-height: 40px;
  border-radius: 1000px;
  transition: all 0.5s ease-in-out;
  position: relative;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
`;

const Span = styled.span`
  display: inline-block;
  background-color: #ffffff;
  position: absolute;
  width: 188px;
  height: 40px;
  top: 2px;
  left: 2px;
  border-radius: 1000px;
  transition: all 0.5s ease-in-out;
  transform: translateX(188px);
`;

const Input = styled.input`
  position: absolute;
  clip: rect(0, 0, 0, 0);
  height: 10px;
  width: 10px;
  border: 0;

  &:checked + ${Label} {
    color: #9c9c9c;
  }
  &:checked + ${Span} {
    transform: translateX(0px);
  }
`;
