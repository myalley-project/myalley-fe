import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const MenuButtons = () => {
  const location = useLocation();
  const { search } = location;

  return (
    <Buttons>
      <Link
        style={
          /\?type=oneline/.test(search)
            ? { color: `${theme.colors.greys100}` }
            : { color: `${theme.colors.greys60}` }
        }
        to="/mypage/write?type=oneline&pageno=1"
      >
        한줄리뷰
      </Link>
      <Link
        style={
          /\?type=blog/.test(search)
            ? { color: `${theme.colors.greys100}` }
            : { color: `${theme.colors.greys60}` }
        }
        to="/mypage/write?type=blog&pageno=1"
      >
        블로그리뷰
      </Link>

      <Link
        style={
          /\?type=mate/.test(search)
            ? { color: `${theme.colors.greys100}` }
            : { color: `${theme.colors.greys60}` }
        }
        to="/mypage/write?type=mate&pageno=1"
      >
        메이트찾기
      </Link>
    </Buttons>
  );
};

export default MenuButtons;

const Buttons = styled.div`
  display: flex;
  padding-top: 10px;
  padding-bottom: 30px;
  > a {
    display: block;
    padding: 8px 20px;
    font-weight: 700;
    font-size: 14px;
    color: ${theme.colors.greys60};
    text-decoration: none;
    &:hover {
      border-radius: 1000px;
      background-color: ${theme.colors.greys10};
      color: ${theme.colors.greys100};
    }
  }
`;
