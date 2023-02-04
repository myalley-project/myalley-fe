import React, { MouseEvent } from "react";
import styled from "styled-components";
import SubTitle from "../SubTitle";
import { theme } from "../../styles/theme";
import PlusLarge from "../../assets/icons/plus.svg";

type ExhibitionInfo = {
  url: string;
  id: number;
  title: string;
  duration: string;
  status: string;
};

interface SelectProps {
  handleSelecterModal: () => void;
  selectedExhibitonInfo: ExhibitionInfo;
}

const ExhibitionSelect = ({
  handleSelecterModal,
  selectedExhibitonInfo,
}: SelectProps) => (
  <Container onClick={handleSelecterModal}>
    <SubTitle text="전시회" />
    {selectedExhibitonInfo.url !== "" ? (
      <SelectedExhibitionImage>
        <img src={selectedExhibitonInfo.url} alt="선택된 전시회 이미지" />
      </SelectedExhibitionImage>
    ) : (
      <ExhibitionButton>
        <img src={PlusLarge} alt="전시회 선택 버튼" />
      </ExhibitionButton>
    )}
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
  border: 1px solid ${theme.colors.greys5};
  background-color: #f9f9f9;
`;

const SelectedExhibitionImage = styled.div`
  width: 100%;
  height: 100%;
`;
