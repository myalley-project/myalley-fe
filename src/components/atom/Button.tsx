import styled from "styled-components";
import { theme } from "../../styles/theme";

// default, Tab focus 시(피그마 state=focus) 공통
const backgroundColor = {
  primary: `${theme.colors.primry70}`,
  secondary: `${theme.colors.greys60}`,
  text: `${theme.colors.white100}`,
};

const hoverBackgroundColor = {
  primary: `${theme.colors.primry80}`,
  secondary: `${theme.colors.greys90}`,
  text: `${theme.colors.greys10}`,
};

// 피그마 state = active
const focusBackgroundColor = {
  primary: `${theme.colors.primry80}`,
  secondary: `${theme.colors.greys90}`,
  text: `${theme.colors.white100}`,
};

const disabledBackgroundColor = {
  primary: `${theme.colors.greys40}`,
  secondary: `${theme.colors.greys40}`,
  text: `${theme.colors.white100}`,
};

const fontColor = {
  primary: `${theme.colors.white100}`,
  secondary: `${theme.colors.white100}`,
  text: `${theme.colors.greys60}`,
};

const hoverFontColor = {
  primary: `${theme.colors.white100}`,
  secondary: `${theme.colors.white100}`,
  text: `${theme.colors.greys100}`,
};

const disabledFontColor = {
  primary: `${theme.colors.white100}`,
  secondary: `${theme.colors.white100}`,
  text: `${theme.colors.greys40}`,
};

const buttonSize = {
  small: "20px",
  large: "40px",
};

interface ButtonProps {
  readonly variant: "primary" | "secondary" | "text";
  readonly size: "small" | "large";
}

const Button = styled.button<ButtonProps>`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-inline: ${(props) => buttonSize[props.size]};
  border: 0;
  border-radius: 30px;
  font-weight: bold;
  font-size: 1rem;
  color: ${(props) => fontColor[props.variant]};
  background-color: ${(props) => backgroundColor[props.variant]};
  cursor: pointer;
  &:is(:hover, :focus) {
    color: ${(props) => hoverFontColor[props.variant]};
  }
  :hover {
    background-color: ${(props) => hoverBackgroundColor[props.variant]};
  }
  :focus {
    background-color: ${(props) => focusBackgroundColor[props.variant]};
  }
  :disabled {
    background-color: ${(props) => disabledBackgroundColor[props.variant]};
    color: ${(props) => disabledFontColor[props.variant]};
    cursor: default;
  }
  :focus-visible {
    border: 2px solid ${theme.colors.greys100};
    background-color: ${(props) => backgroundColor[props.variant]};
  }
`;

export default Button;
