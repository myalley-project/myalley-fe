import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import Button from "../atom/Button";
import Selectbox from "../atom/Selectbox";
import {
  getYearArray,
  getMonthArray,
  getDayArray,
} from "../../utils/dateSelector";
import getTimeArray from "../../utils/timeSelector";
import SimpleInput from "../atom/SimpleInput";

interface HandlerProps {
  yearHandler: (e: React.MouseEvent) => void;
  monthHandler: (e: React.MouseEvent) => void;
  dayHandler: (e: React.MouseEvent) => void;
  enteranceHandler: (e: React.MouseEvent) => void;
  exitHandler: (e: React.MouseEvent) => void;
  congestionHandler: (e: React.MouseEvent) => void;
  rateHandler: (e: React.MouseEvent) => void;
  contentHandler: (e: React.MouseEvent) => void;
}

const OnelineWrite = ({
  yearHandler,
  monthHandler,
  dayHandler,
  enteranceHandler,
  exitHandler,
  congestionHandler,
  rateHandler,
  contentHandler,
}: HandlerProps) => (
  <Container>
    <SelectContainer>
      <SelectForm>
        <p>생년 월일</p>
        <SelectboxContainer>
          <Selectbox
            placeholder="1990"
            options={getYearArray()}
            onClick={yearHandler}
            name="년도"
            width="130px"
          />
          <Selectbox
            placeholder="12"
            options={getMonthArray()}
            onClick={monthHandler}
            name="월"
            width="100px"
          />
          <Selectbox
            placeholder="31"
            options={getDayArray()}
            onClick={dayHandler}
            name="일"
            width="100px"
          />
        </SelectboxContainer>
      </SelectForm>
      <SelectForm>
        <p>방문 시간</p>
        <SelectboxContainer>
          <span>입장</span>
          <Selectbox
            placeholder="00시"
            options={getTimeArray()}
            onClick={enteranceHandler}
            name="입장 시간"
            width="133px"
          />
          <span>퇴장</span>
          <Selectbox
            placeholder="00시"
            options={getTimeArray()}
            onClick={exitHandler}
            name="퇴장 시간"
            width="133px"
          />
        </SelectboxContainer>
      </SelectForm>
      <SelectForm>
        <p>모집 상태</p>
        <Selectbox
          placeholder="모집 중"
          options={["모집 중", "모집 마감"]}
          onClick={() => {}}
          name="모집 상태"
          width="350px"
        />
      </SelectForm>
      <SelectForm>
        <p>혼잡도</p>
        <Selectbox
          placeholder="매우 혼잡"
          options={["매우 혼잡", "혼잡", "보통", "한산"]}
          onClick={congestionHandler}
          name="혼잡도"
          width="350px"
        />
      </SelectForm>
      <SelectForm>
        <p>전시회 웹페이지 주소</p>
        <SimpleInput />
      </SelectForm>
    </SelectContainer>
    <ButtonContainer>
      <Button variant="text" size="large">
        취소하기
      </Button>
      <Button variant="primary" size="large">
        등록하기
      </Button>
    </ButtonContainer>
  </Container>
);

export default OnelineWrite;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 790px;
  padding: 30px;
  border: 1px solid #ccc2dc;
  background-color: #fff;
  box-shadow: 0px 4px 30px rgba(79, 55, 139, 0.05);
  z-index: 1000;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 30px;
`;

const SelectForm = styled.div`
  & > p {
    font-weight: 700;
    font-size: 14px;
    color: ${theme.colors.greys90};
  }
`;

const SelectboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  & > span {
    color: ${theme.colors.greys60};
    font-weight: 500;
    font-size: 14px;
    padding-bottom: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
