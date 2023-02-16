import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

interface SimpleInputProps {
  inputlength: number;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const SimpleInput = ({
  onChangeHandler,
  inputlength,
  placeholder = "내용을 입력해주세요",
}: SimpleInputProps) => (
  <Container>
    <input type="text" placeholder={placeholder} onChange={onChangeHandler} />
    <InputLegnth inputlength={inputlength}>{inputlength}/60</InputLegnth>
  </Container>
);

export default SimpleInput;

const Container = styled.div`
  position: relative;
  & > input {
    width: 730px;
    height: 36px;
    margin: 10px auto;
    padding-left: 10px;
    border: 1px solid ${theme.colors.greys40};
    border-radius: 30px;
  }
`;

interface InputProps {
  inputlength: number;
}

const InputLegnth = styled.div<InputProps>`
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  color: ${(props) =>
    props.inputlength > 60 ? theme.colors.error : theme.colors.greys60};
  font-weight: 500;
  font-size: 14px;
`;
