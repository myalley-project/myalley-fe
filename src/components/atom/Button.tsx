import styled from "styled-components";
import { theme } from "../../styles/theme";

interface ButtonProps {
  primary: boolean;
}

const Button = styled.button<ButtonProps>`
  width: 175px;
  padding: 10px 40px;
  border: 0;
  border-radius: 30px;
  font-weight: bold;
  font-size: 1rem;
  color: ${(props) =>
    props.primary ? `${theme.colors.white100}` : `${theme.colors.greys60}`};
  background-color: ${(props) =>
    props.primary ? `${theme.colors.primry70}` : `${theme.colors.white100}`};
`;

export default Button;
