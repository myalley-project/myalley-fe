import React, { useState } from "react";
import styled from "styled-components";

const ToggleSwitch = () => {
  const [isInfoOrReview, setIsInfoOrReview] = useState("info");
  const onChangeMode = (type: string) => {
    setIsInfoOrReview(type);

    // if (type === "info") {
    //   setIsInfoOrReview("info");
    // } else if (type === "review") {
    //   setIsInfoOrReview("review");
    // }
  };

  return (
    <Switch value={isInfoOrReview}>
      <span />
      <InfoBtn
        type="button"
        value={isInfoOrReview}
        onClick={() => onChangeMode("info")}
      >
        상세정보
      </InfoBtn>
      <ReviewBtn
        type="button"
        value={isInfoOrReview}
        onClick={() => onChangeMode("review")}
      >
        전시리뷰
      </ReviewBtn>
    </Switch>
  );
};

export default ToggleSwitch;

const Switch = styled.div<{ value: string }>`
  position: relative;
  width: 380px;
  height: 44px;
  margin: 50px auto 30px auto;
  background-color: #9c9c9c;
  span {
    position: absolute;
    width: 188px;
    height: 40px;
    top: 2px;
    border-radius: 1000px;
    background-color: #ffffff;
    transition: all 0.6s ease-in-out;
    z-index: 1;
    ${({ value }) =>
      value === "info"
        ? "transform: translateX(0px)"
        : "transform: translateX(188px)"}
  }
`;

const button = styled.button<{ value: string }>`
  position: relative;
  width: 188px;
  height: 44px;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  z-index: 2;
`;

const InfoBtn = styled(button)`
  ${({ value }) =>
    value === "info" ? "transition:color 1s ease; color: #9C9C9C;" : null}
`;

const ReviewBtn = styled(button)`
  ${({ value }) =>
    value === "review" ? "transition:color 1s ease; color: #9C9C9C;" : null}
`;
