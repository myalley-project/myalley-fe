import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    letter-spacing: -0.5px;
    font-family: 'Noto Sans KR', sans-serif;
  }
  body{
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Noto Sans KR', sans-serif;
    &::-webkit-scrollbar {
    display: none;
    }
  }
  div, input, button,img {
    background-color: transparent;
    border: none;
    border-radius: 30px;
    outline: none;
  }
`;

export default GlobalStyle;
