/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import searchIcon from "../../assets/icons/search.svg";
import { theme } from "../../styles/theme";

type SearchInputProps = HTMLAttributes<HTMLInputElement>;

// eslint-disable-next-line react/display-name
const SearchInput = React.forwardRef(
  (
    { className, placeholder }: SearchInputProps,
    ref?: React.ForwardedRef<HTMLInputElement>
  ): React.ReactElement<HTMLDivElement> => (
    <SearchContainer className={className}>
      <InnerInput placeholder={placeholder ?? ""} ref={ref} />
      <StyledButton type="submit">
        <img src={searchIcon} alt="돋보기 아이콘" />
      </StyledButton>
    </SearchContainer>
  )
);

const SearchContainer = styled.div`
  position: relative;
  height: 36px;
`;

const InnerInput = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 15px;
  border: 1px solid ${theme.colors.greys40};
  font-size: 14px;
  &::placeholder {
    color: ${(props) => props.theme.colors.greys60};
  }
  &:hover {
    cursor: text;
  }
`;

const StyledButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;

export default SearchInput;
