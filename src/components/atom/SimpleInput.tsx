import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

interface SimpleInputProps {
  width: string;
  placeholder: string;
}

const SimpleInput = ({ width, placeholder }: SimpleInputProps) => {
  const [inputlength, setInputlength] = useState(0);

  const lengthChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputlength(event.target.value.length);
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder={placeholder}
        onChange={lengthChangeHandler}
        width={width}
      />
      <InputLegnth inputlength={inputlength}>{inputlength}/60</InputLegnth>
    </Container>
  );
};

export default SimpleInput;

const Container = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: ${(props) => props.width};
  height: 36px;
  margin: 10px auto;
  padding-left: 10px;
  border: 1px solid ${theme.colors.greys40};
  border-radius: 30px;
`;

interface InputProps {
  inputlength: number;
}

const InputLegnth = styled.div<InputProps>`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: ${(props) =>
    props.inputlength > 60 ? theme.colors.error : theme.colors.greys60};
  font-weight: 500;
  font-size: 14px;
`;
