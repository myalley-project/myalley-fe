import styled from "styled-components";
import { theme } from "../../styles/theme";

interface ButtonProps {
  primary: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 10px auto;
  border: 0;
  border-radius: 30px;
  color: ${(props) =>
    props.primary ? `${theme.colors.white100}` : `${theme.colors.greys60}`};
  background-color: ${(props) =>
    props.primary ? `${theme.colors.primry70}` : `${theme.colors.greys60}`};
`;

export default Button;
