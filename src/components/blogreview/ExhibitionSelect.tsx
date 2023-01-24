import React from "react";
import styled from "styled-components";
import SubTitle from "../SubTitle";
import { theme } from "../../styles/theme";
import PlusIcon from "../../assets/icons/plusLarge.svg";

const ExhibitionSelect = () => (
  <Container>
    <SubTitle text="전시회" />
    <ExhibitionButton>
      <img src={PlusIcon} alt="전시회 선택 버튼" />
    </ExhibitionButton>
  </Container>
);

export default ExhibitionSelect;

const Container = styled.div`
  width: 270px;
  height: 100%;
`;

const ExhibitionButton = styled.div`
  /* height: clamp(415px, 420px, 435px); */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 415px;
  max-height: 435px;
  border: 1px solid ${theme.colors.greys5};
  background-color: #f9f9f9;
  pointer-events: none;
`;
