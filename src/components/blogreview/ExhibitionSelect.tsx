import React, { MouseEvent } from "react";
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
  width: 280px;
  height: 100%;
`;

const ExhibitionButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 415px;
  max-height: 435px;
  /* margin-bottom: 1rem; */
  border: 1px solid ${theme.colors.greys5};
  border: 1px solid ${theme.colors.greys100};
  background-color: #f9f9f9;
`;
