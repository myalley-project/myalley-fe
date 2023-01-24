import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

interface ModeType {
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export type Mode = string;

const MenuButtons = ({ setMode }: ModeType) => {
  const [isMypageOrReviewOrWish, setIsMypageOrReviewOrWish] =
    useState("mypage");

  const onChangeMode = (selected: string) => {
    setMode(selected);
    setIsMypageOrReviewOrWish(selected);
  };

  const location = useLocation();
  const { pathname } = location;
  const rPathname = /^\/mypage\/write/;
  return (
    <Buttons>
      <Link to="/mypage">
        <MenuButton
          type="button"
          style={
            /^\/mypage/.test(pathname)
              ? { backgroundColor: "#6750A4", color: "#ffffff" }
              : { backgroundColor: "#ffffff", color: "#9C9C9C" }
          }
          onClick={() => onChangeMode("mypage")}
        >
          회원 정보 수정
        </MenuButton>
      </Link>
      <Link to="write">
        <MenuButton
          type="button"
          style={
            /^\/mypage\/write/.test(pathname)
              ? { backgroundColor: "#6750A4", color: "#ffffff" }
              : { backgroundColor: "#ffffff", color: "#9C9C9C" }
          }
          onClick={() => onChangeMode("review")}
        >
          작성 글 조회
        </MenuButton>
      </Link>
      <Link to="wish">
        <MenuButton
          type="button"
          style={
            isMypageOrReviewOrWish === "wish"
              ? { backgroundColor: "#6750A4", color: "#ffffff" }
              : { backgroundColor: "#ffffff", color: "#9C9C9C" }
          }
          onClick={() => onChangeMode("wish")}
        >
          위시리스트
        </MenuButton>
      </Link>
    </Buttons>
  );
};

export default MenuButtons;

const Buttons = styled.div`
  padding-bottom: 15px;
`;

const MenuButton = styled.button`
  padding: 8px 20px;
  margin-right: 10px;
  border: 1px solid ${(props) => props.theme.colors.greys40};
  border-radius: 10000px;
  color: ${(props) => props.theme.colors.greys60};
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
`;
