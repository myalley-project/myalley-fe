import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const MenuButtons = () => {
  const navigete = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const Navigate = (link: string) => {
    navigete(link);
  };

  return (
    <Buttons>
      <MenuButton
        type="button"
        style={
          /^\/mypage\/edit/.test(pathname)
            ? {
                backgroundColor: `${theme.colors.primry70}`,
                color: `${theme.colors.white100}`,
              }
            : {
                backgroundColor: `${theme.colors.white100}`,
                color: `${theme.colors.greys60}`,
              }
        }
        onClick={() => Navigate("/mypage/edit")}
      >
        회원 정보 수정
      </MenuButton>
      <MenuButton
        type="button"
        style={
          /^\/mypage\/write/.test(pathname)
            ? {
                backgroundColor: `${theme.colors.primry70}`,
                color: `${theme.colors.white100}`,
              }
            : {
                backgroundColor: `${theme.colors.white100}`,
                color: `${theme.colors.greys60}`,
              }
        }
        onClick={() => Navigate("/mypage/write")}
      >
        작성 글 조회
      </MenuButton>
      <MenuButton
        type="button"
        style={
          /^\/myapge\/bookmark/.test(pathname)
            ? {
                backgroundColor: `${theme.colors.primry70}`,
                color: `${theme.colors.white100}`,
              }
            : {
                backgroundColor: `${theme.colors.white100}`,
                color: `${theme.colors.greys60}`,
              }
        }
        onClick={() => Navigate("/mypage/bookmark")}
      >
        북마크
      </MenuButton>
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
  border: 1px solid ${theme.colors.greys40};
  border-radius: 10000px;
  color: ${theme.colors.greys60};
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.greys40} !important;
  }
  &:focus-visible {
    border-radius: 1px solid ${theme.colors.primry80};
  }
`;
