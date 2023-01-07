import { DefaultTheme } from "styled-components";
// theme 사용 예제 (이렇게 통일하면 좋을 것 같아요
// 통일하고 싶은 다른 방법 있으시면 공유해주세요)
// 사용을 원하는 곳에서 원하는 속성 가져오기
// color: ${(props) => props.theme.colors.main};
// @media all and (min-width: ${(props)=> props.theme.responsive.mobile}){}

const responsive = { mobile: "375px" };
// 임시 모바일 픽셀. 확실히 물어봐야함.
const colors = {
  main: "#E0E0E0",
  txt: "#333333",
  pressed: "#666666",
  hover: "#9C9C9C",
  alarmGreen: "#54C60E",
  bg: "#FBFBFB",
  hidden: "#F2F2F2",
  error: "#FF4545",
  white100: "#FFFFFF",
};

export type Responsive = typeof responsive;
export type Colors = typeof colors;
export const theme: DefaultTheme = {
  responsive,
  colors,
};
