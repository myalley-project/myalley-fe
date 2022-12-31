import React from "react";
import styled from "styled-components";

const HamburgerMenu = () => (
  <MenuContainer>
    <h2>계정</h2>
    <div>프사, 닉네임, 이메일</div>
    <button type="button">로그아웃</button>
    <h2>메뉴</h2>
    <ul>
      <li>전시회</li>
      <li>전시회 리뷰</li>
      <li>메이트 찾기</li>
    </ul>
  </MenuContainer>
);

export default HamburgerMenu;

const MenuContainer = styled.div`
  position: absolute;
  left: 1465px;
  top: 57px;
  width: 215px;
  height: 292px;
  padding: 10px;
  border: 1px; solid #E0E0E0;
  border-radius: 10px;
  background-color: green;
`;
