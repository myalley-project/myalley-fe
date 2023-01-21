import React from "react";
import styled from "styled-components";
import SubTitle from "../SubTitle";

const ExhibitionSelect = () => (
  <Container>
    <SubTitle text="전시회" />
    <ExhibitionButton>
      <button type="button">여기 눌러요!</button>
    </ExhibitionButton>
  </Container>
);

export default ExhibitionSelect;

const Container = styled.div`
  width: 318px;
  height: 100%;
`;

const ExhibitionButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: #f9f9f9;
`;
