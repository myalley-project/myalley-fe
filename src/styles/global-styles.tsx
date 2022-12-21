import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body{
    display: flex;
    justify-content: center;
    align-items: center;
    font-family:'Maven Pro', sans-serif;
    //글씨체 추후 확정되면 수정
  }
  div, input, button {
    background-color: transparent;
    border: none;
    border-radius: 30px;
    outline: none;
  }
  h1, h2, h3, h4, h5, h6{
    font-family:'Maven Pro', sans-serif;
    //글씨체 추후 확정되면 수정
  }
`;

export default GlobalStyle;
