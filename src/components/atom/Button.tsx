import styled from "styled-components";
import { theme } from "../../styles/theme";

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

const buttonsize = {
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
  padding-inline: ${(props) => buttonsize[props.size]};
  border: 0;
  border-radius: 30px;
  font-weight: bold;
  font-size: 1rem;
  color: ${(props) => fontColor[props.variant]};
  background-color: ${(props) => backgroundColor[props.variant]};
  &:is(:hover, :focus) {
    color: ${(props) => hoverFontColor[props.variant]};
    background-color: ${(props) => hoverBackgroundColor[props.variant]};
  }
`;

export default Button;
