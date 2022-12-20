import { DefaultTheme } from "styled-components";
// theme 사용 예제 (이렇게 통일하면 좋을 것 같아요
// 통일하고 싶은 다른 방법 있으시면 공유해주세요)
// 사용을 원하는 곳에서 원하는 속성 가져오기
// color: ${(props) => props.theme.colors.main};
// @media all and (min-width: ${(props)=> props.theme.responsive.mobile}){}

const responsive = { mobile: "375px" };
// 임시 모바일 픽셀. 확실히 물어봐야함.
const colors = {
  main: "#FAEBA0",
  // 임시 메인 컬러. 디자인 나오면 바꿔야 함.
  txt: "#303030",
  // 임시 main text 컬러. 디자인 나오면 바꿔야 함.
  // 아니면 메인 텍스트컬러는 global-styles에서 지정해두고 사용해도 좋을 듯합니다.
};

export type Responsive = typeof responsive;
export type Colors = typeof colors;
export const theme: DefaultTheme = {
  responsive,
  colors,
};
