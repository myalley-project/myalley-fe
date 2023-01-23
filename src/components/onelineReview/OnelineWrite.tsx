import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import Button from "../atom/Button";
import Selectbox from "../Selectbox";

const OnelineWrite = () => (
  <Container>
    <SelectContainer>
      <SelectForm>
        <p>생년 월일</p>
        <div>{/* <Selectbox></Selectbox> */}</div>
      </SelectForm>
      <SelectForm>
        <p>방문 시간</p>
      </SelectForm>
      <SelectForm>
        <p>모집 상태</p>
      </SelectForm>
      <SelectForm>
        <p>혼잡도</p>
      </SelectForm>
      <SelectForm>
        <p>전시회 웹페이지 주소</p>
      </SelectForm>
    </SelectContainer>
    <div>
      <Button variant="text" size="large">
        취소하기
      </Button>
      <Button variant="primary" size="large">
        등록하기
      </Button>
    </div>
  </Container>
);

export default OnelineWrite;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  border: 1px solid #ccc2dc;
  background-color: #fff;
  box-shadow: 0px 4px 30px rgba(79, 55, 139, 0.05);
  z-index: 1000;
`;

const SelectContainer = styled.div`
  display: flex;
`;

const SelectForm = styled.div`
  & > p {
    font-weight: 700;
    font-size: 14px;
    color: ${theme.colors.greys90};
  }
`;
