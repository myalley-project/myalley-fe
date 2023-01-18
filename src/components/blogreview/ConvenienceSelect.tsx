import React from "react";
import styled from "styled-components";
import SubTitle from "../SubTitle";
import Selector from "../Selector";

const ConvenienceSelect = () => {
  const congestionOptions = ["매우 혼잡", "북적거림", "보통", "한산함"];
  const transpostationOptions = ["도보", "버스", "지하철", "차"];
  const revisitOptions = ["모르겠다", "전혀 없다", "조금 있다", "재방문 예정"];

  return (
    <FlexContainer>
      <div>
        <SubTitle text="혼잡도" />
        <Selector options={congestionOptions} width="130px" />
      </div>
      <div>
        <SubTitle text="교통 수단" />
        <Selector options={transpostationOptions} width="130px" />
      </div>
      <div>
        <SubTitle text="재방문 의향" />
        <Selector options={revisitOptions} width="130px" />
      </div>
    </FlexContainer>
  );
};

export default ConvenienceSelect;

const FlexContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;
