import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

interface StateType {
  setState: (state: string) => void;
}

const ToggleSwitch = ({ setState }: StateType) => {
  const [isInfoOrReviewOrMate, setIsInfoOrReviewOrMate] = useState("info");

  const onChangeMode = (type: string) => {
    setIsInfoOrReviewOrMate(type);
    setState(type);
    const circle = document.getElementById("circle") as HTMLInputElement | null;
    if (circle === null) return;
    switch (type) {
      case "info":
        circle.style.transform = "translateX(0px)";
        break;
      case "review":
        circle.style.transform = "translateX(125.33px)";
        break;
      case "findMate":
        circle.style.transform = "translateX(250.66px)";
        break;
      default:
        circle.style.transform = "translateX(0px)";
        break;
    }
  };

  return (
    <Switch value={isInfoOrReviewOrMate}>
      <span id="circle" />
      <InfoBtn
        type="button"
        value={isInfoOrReviewOrMate}
        onClick={() => onChangeMode("info")}
      >
        상세정보
      </InfoBtn>
      <ReviewBtn
        type="button"
        value={isInfoOrReviewOrMate}
        onClick={() => onChangeMode("review")}
      >
        전시 리뷰
      </ReviewBtn>
      <FindMateBtn
        type="button"
        value={isInfoOrReviewOrMate}
        onClick={() => onChangeMode("findMate")}
      >
        메이트 찾기
      </FindMateBtn>
    </Switch>
  );
};

export default ToggleSwitch;

const Switch = styled.div<{ value: string }>`
  position: relative;
  width: 380px;
  height: 44px;
  margin: 50px auto 30px auto;
  background-color: ${theme.colors.primry70};
  span {
    position: absolute;
    width: 125.33px;
    height: 40px;
    top: 2px;
    border-radius: 1000px;
    background-color: #ffffff;
    transition: all 0.6s ease-in-out;
    z-index: 1;
    ${({ value }) =>
      value === "info"
        ? "transform: translateX(0px)"
        : "transform: translateX(125.33px)"}
  }
`;

const button = styled.button<{ value: string }>`
  position: relative;
  width: 125.33px;
  height: 44px;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  z-index: 2;
`;

const InfoBtn = styled(button)`
  ${({ value }) =>
    value === "info"
      ? `transition:color 1s ease; color: ${theme.colors.primry70};`
      : null}
`;

const ReviewBtn = styled(button)`
  ${({ value }) =>
    value === "review"
      ? `transition:color 1s ease; color: ${theme.colors.primry70};`
      : null}
`;

const FindMateBtn = styled(button)`
  ${({ value }) =>
    value === "findMate"
      ? `transition:color 1s ease; color: ${theme.colors.primry70};`
      : null}
`;
