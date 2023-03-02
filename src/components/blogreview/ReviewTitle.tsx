import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

type ReviewTitleProps = {
  title: string;
  handleTitleInput: (event: ChangeEvent<HTMLInputElement>) => void;
};

const ReviewTitle = ({
  title,
  handleTitleInput,
}: Partial<ReviewTitleProps>) => (
  <TitleContainer>
    <TitleInput
      onChange={handleTitleInput}
      value={title ?? ""}
      type="text"
      placeholder="제목을 입력해주세요"
    />
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
  border-bottom: 1px solid ${theme.colors.greys40};
  margin-bottom: 30px;
`;
