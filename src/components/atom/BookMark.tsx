import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as HeartOn } from "../../assets/icons/heartOn.svg";
import { ReactComponent as HeartOff } from "../../assets/icons/heartOff.svg";

interface BookMarkType {
  onClick: () => void;
  marked: boolean;
}

const BookMark = ({ onClick, marked }: BookMarkType) => {
  const [isChecked, setIsChecked] = useState(marked);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    setIsChecked(marked);
  }, [marked, isChecked]);

  const handleCheck = () => {
    if (!localStorage.getItem("accessToken")) {
      alert("해당 기능은 로그인 후 이용 가능합니다.");
    }
    setIsChecked((prev) => !prev);
  };

  return (
    <BookMarkContainer
      type="button"
      onClick={() => {
        onClick();
        handleCheck();
      }}
      onMouseOver={() => setIsMouseOver(true)}
      onMouseOut={() => setIsMouseOver(false)}
    >
      {isChecked || isMouseOver ? <HeartOn /> : <HeartOff />}
    </BookMarkContainer>
  );
};

export default BookMark;

const BookMarkContainer = styled.button`
  width: 24px;
  height: 24px;
  padding: 0px;
  cursor: pointer;
`;
