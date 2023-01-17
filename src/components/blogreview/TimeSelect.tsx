import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import SubTitle from "../SubTitle";
import Selector from "../Selector";

const TimeSelect = () => {
  const timeOptions = [
    "00시",
    "01시",
    "02시",
    "03시",
    "04시",
    "05시",
    "06시",
    "07시",
    "08시",
    "09시",
    "10시",
    "11시",
    "12시",
    "13시",
    "14시",
    "15시",
    "16시",
    "17시",
    "18시",
    "19시",
    "20시",
    "21시",
    "22시",
    "23시",
    "24시",
  ];

  const timeoptions2 = timeOptions.slice();
  return (
    <div>
      <SubTitle text="관람 시간" />
      <FlexContainer>
        <Description>입장</Description>
        <Selector options={timeOptions} width="100px" />
        <Description>퇴장</Description>
        <Selector options={timeoptions2} width="100px" />
      </FlexContainer>
    </div>
  );
};

export default TimeSelect;

const Description = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${theme.colors.hover};
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;
