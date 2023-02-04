import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const ExhibitionChoiceCard = () => (
  <Container>
    <Image>이미지</Image>
    <InfoWrapper>
      <h2>Beyond The City: Cultural M...</h2>
      <p>DDP 갤러리문</p>
      <div>
        <p>2022-12-14~2023-01-15</p>
        <span>조회수 999</span>
      </div>
    </InfoWrapper>
  </Container>
);

export default ExhibitionChoiceCard;

const Container = styled.div`
  width: 338px;
`;

const Image = styled.div`
  height: 450px;
  background-color: ${theme.colors.greys40};
`;
const InfoWrapper = styled.div`
  padding: 30px;
  & > h2 {
    color: ${theme.colors.greys90};
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 8px;
  }
  & > p {
    color: ${theme.colors.greys60};
    font-weight: 500;
    font-size: 12px;
    margin-bottom: 20px;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
