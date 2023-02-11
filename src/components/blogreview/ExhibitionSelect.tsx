import React, { MouseEvent } from "react";
import styled from "styled-components";
import SubTitle from "../SubTitle";
import Button from "../atom/Button";
import { theme } from "../../styles/theme";
import PlusLarge from "../../assets/icons/plus.svg";
import xBtn from "../../assets/icons/xBtn.svg";

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
  deleteExhibitionInfo: () => void;
}

const ExhibitionSelect = ({
  handleSelecterModal,
  selectedExhibitonInfo,
  deleteExhibitionInfo,
}: SelectProps) => (
  <Container onClick={handleSelecterModal}>
    <SubTitle text="전시회" />
    {selectedExhibitonInfo.url !== "" ? (
      <SelectedExhibitionImage>
        <div className="imageContainer">
          <img src={selectedExhibitonInfo.url} alt="선택된 전시회 이미지" />
        </div>
        <div>
          <Button variant="primary" size="small">
            {selectedExhibitonInfo.status}
          </Button>
          <h3>{selectedExhibitonInfo.title}</h3>
          <p>{selectedExhibitonInfo.duration}</p>
        </div>
        <Xbutton
          onClick={(event) => {
            event.stopPropagation();
            deleteExhibitionInfo();
          }}
        >
          <img src={xBtn} alt="전시회 선택 취소버튼" />
        </Xbutton>
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
  position: relative;
  cursor: pointer;
  .imageContainer {
    height: 400px;
    & > img {
      width: 280px;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  .imageContainer + div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: absolute;
    inset: 50% 0 0 50%;
    transform: translate(-50%, -50%);
    color: ${theme.colors.white100};
    text-align: center;
    & > h3 {
      font-weight: 700;
      font-size: 14px;
    }
    & > p {
      font-weight: 400;
      font-size: 12px;
    }
  }
`;

const Xbutton = styled.div`
  position: absolute;
  top: 8%;
  right: 8%;
  z-index: 20;
  & > img {
    filter: invert(100%) sepia(65%) saturate(0%) hue-rotate(357deg)
      brightness(120%) contrast(137%);
  }
`;
