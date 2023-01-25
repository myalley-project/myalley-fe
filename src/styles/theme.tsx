import { DefaultTheme } from "styled-components";
// 사용을 원하는 곳에서 원하는 속성 가져오기
// color: ${(props) => props.theme.colors.main};
// @media all and (min-width: ${(props)=> props.theme.responsive.mobile}){}

const responsive = { mobile: "375px" };

const colors = {
  primry60: "#7F67BE",
  primry70: "#6750A4",
  primry80: "#4F378B",
  secondary5: "#F6F3FE",
  secondary30: "#CCC2DC",
  secondary40: "#B0A7C0",
  secondary50: "#958DA5",
  white100: "#FFFFFF",
  greys5: "#F9F9F9",
  greys10: "#F4F4F4",
  greys40: "#E0E0E0",
  greys60: "#9C9C9C",
  greys80: "#666666",
  greys90: "#333333",
  greys100: "#1C1C1C",
  success: "#54C60E",
  error: "#FD3D51",
};

export type Responsive = typeof responsive;
export type Colors = typeof colors;
export const theme: DefaultTheme = {
  responsive,
  colors,
};
