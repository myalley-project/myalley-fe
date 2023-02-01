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
import SimpleInput from "../atom/SimpleInput";
import { OnelineReviewPostType } from "../../types/OnelineReview";

interface HandlerProps {
  state: OnelineReviewPostType;
  yearHandler: (e: React.MouseEvent) => void;
  monthHandler: (e: React.MouseEvent) => void;
  dayHandler: (e: React.MouseEvent) => void;
  timeHandler: (e: React.MouseEvent) => void;
  congestionHandler: (e: React.MouseEvent) => void;
  rateHandler: (e: React.MouseEvent) => void;
  contentHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitHandler: () => void;
}

const OnelineWrite = ({
  state,
  yearHandler,
  monthHandler,
  dayHandler,
  timeHandler,
  congestionHandler,
  rateHandler,
  contentHandler,
  submitHandler,
}: HandlerProps) => (
  <Container>
    <SelectContainer>
      <SelectForm>
        <p>생년 월일</p>
        <SelectboxContainer>
          <Selectbox
            placeholder="1950"
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
        <p>시간대</p>
        <Selectbox
          placeholder="6시-7시"
          options={[
            "6시-7시",
            "7시-8시",
            "8시-9시",
            "9시-10시",
            "11시-12시",
            "12시-13시",
            "13시-14시",
            "14시-15시",
            "15시-16시",
            "17시-18시",
            "18시-19시",
          ]}
          onClick={timeHandler}
          name="시간대"
          width="350px"
        />
      </SelectForm>
      <SelectForm>
        <p>평점</p>
        <Selectbox
          placeholder="1"
          options={["1", "2", "3", "4", "5"]}
          onClick={rateHandler}
          name="평점"
          width="350px"
        />
      </SelectForm>
      <SelectForm>
        <p>혼잡도</p>
        <Selectbox
          placeholder="매우 혼잡"
          options={["매우 혼잡", "북적거림", "보통", "한산함"]}
          onClick={congestionHandler}
          name="혼잡도"
          width="350px"
        />
      </SelectForm>
      <SelectForm>
        <p>한 줄 리뷰 작성</p>
        <SimpleInput
          inputlength={state.content.length}
          onChangeHandler={contentHandler}
        />
      </SelectForm>
    </SelectContainer>
    <ButtonContainer>
      <Button variant="text" size="large">
        취소하기
      </Button>
      <Button onClick={submitHandler} variant="primary" size="large">
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
  & > * {
    flex: 1;
  }
`;

const SelectForm = styled.div`
  & > p {
    margin-bottom: 10px;
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
