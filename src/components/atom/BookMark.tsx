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
  }, [marked]);

  return (
    <BookMarkContainer
      type="button"
      onClick={() => {
        onClick();
        setIsChecked((prev) => !prev);
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
