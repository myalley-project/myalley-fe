import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

interface SearchbarProps {
  placeholder?: string;
  width: string;
}

const SearchBar = styled.input<SearchbarProps>`
  width: ${(props) => props.width};
  padding: 8px 20px;
  border: 1px solid ${theme.colors.greys100};
  background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='11' cy='11' r='6' stroke='%239C9C9C' stroke-width='2'/%3E%3Cpath d='M16.2071 14.7929L15.5 14.0858L14.0858 15.5L14.7929 16.2071L16.2071 14.7929ZM18.2929 19.7071C18.6834 20.0976 19.3166 20.0976 19.7071 19.7071C20.0976 19.3166 20.0976 18.6834 19.7071 18.2929L18.2929 19.7071ZM14.7929 16.2071L18.2929 19.7071L19.7071 18.2929L16.2071 14.7929L14.7929 16.2071Z' fill='%239C9C9C'/%3E%3C/svg%3E%0A")
    no-repeat;
  background-position: right 10px center;
  &::placeholder {
    color: ${theme.colors.greys60};
  }
  &:hover {
    cursor: text;
  }
`;

export default SearchBar;
