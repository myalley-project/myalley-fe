import React from "react";
import styled from "styled-components";

const HamburgerMenu = () => (
  <MenuContainer>
    <MenuWrapper>
      <h2>계정</h2>
      <div className="mypage-area">
        <div className="profile-img" />
        <div>
          <p className="nickname">Nickname</p>
          <p className="email">email11@email.com</p>
        </div>
      </div>
      <button type="button">로그아웃</button>
    </MenuWrapper>
    <MenuWrapper>
      <h2>메뉴</h2>
      <ul>
        <a href="/">전시회</a>
        <a href="/">전시회 리뷰</a>
        <a href="/">메이트 찾기</a>
      </ul>
    </MenuWrapper>
  </MenuContainer>
);

export default HamburgerMenu;

const MenuContainer = styled.div`
  position: absolute;
  left: 77%;
  top: 57px;
  width: 215px;
  height: 292px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #ffffff;
`;

const MenuWrapper = styled.div`
  padding-bottom: 10px;
  h2 {
    padding-bottom: 5px;
    color: ${(props) => props.theme.colors.pressed};
    font-weight: 400;
    font-size: 12px;
    letter-spacing: -0.5px;
  }
  .profile-img {
    width: 40px;
    height: 40px;
    background-color: #d9d9d9;
    border-radius: 50%;
  }
  .mypage-area {
    display: flex;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
  }
  .nickname {
    color: ${(props) => props.theme.colors.txt};
    font-weight: 500;
    font-size: 14px;
    padding-bottom: 4px;
  }
  .email {
    color: ${(props) => props.theme.colors.hover};
    font-weight: 400;
    font-size: 12px;
  }
  button,
  a {
    display: inline-block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    color: ${(props) => props.theme.colors.txt};
    font-weight: 500;
    font-size: 14px;
    text-align: left;
    //global-style에 설정 추가하기
    text-decoration: none;
    cursor: pointer;
    &:hover {
      background-color: #f2f2f2;
      border-radius: 10px;
    }
  }
`;
