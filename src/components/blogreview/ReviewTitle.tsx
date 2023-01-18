import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const ReviewTitle = () => (
  <TitleContainer>
    <TitleInput type="text" placeholder="제목을 입력해주세요" />
    <Divider />
  </TitleContainer>
);

export default ReviewTitle;

const TitleContainer = styled.div`
  margin: 30px auto;
`;

const TitleInput = styled.input`
  &::placeholder {
    color: #333;
  }
  &::-webkit-input-placeholder {
    color: #333;
  }
  &:-ms-input-placeholder {
    color: #333;
  }
  display: block;
  border-radius: 0;
  font-size: 42px;
  font-weight: bold;
  color: black;
  margin-bottom: 14px;
`;

const Divider = styled.div`
  border-bottom: 1px solid ${theme.colors.main};
`;
