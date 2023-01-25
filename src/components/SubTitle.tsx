import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

interface SubTitleProps {
  text: string;
}

const SubTitle = ({ text }: SubTitleProps) => <Title>{text}</Title>;

export default SubTitle;

const Title = styled.h2`
  font-weight: bold;
  font-size: 14px;
  color: ${theme.colors.greys90};
  margin-bottom: 10px;
`;
