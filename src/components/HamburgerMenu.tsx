import React from "react";
import styled from "styled-components";
import ProfileImg from "../assets/icons/profileImg.svg";

const HamburgerMenu = () => (
  <MenuContainer>
    <MenuWrapper>
      <Subtitle>계정</Subtitle>
      <MypageArea href="/">
        <ProfileWrapper>
          <img src={ProfileImg} alt="profile-img" />
        </ProfileWrapper>
        <div>
          <Nickname>Nickname</Nickname>
          <Email className="email">email11@email.com</Email>
        </div>
      </MypageArea>
      <LogoutButton type="button">로그아웃</LogoutButton>
    </MenuWrapper>
    <MenuWrapper>
      <Subtitle>메뉴</Subtitle>
      <ul>
        <List as="a" href="/">
          전시회
        </List>
        <List as="a" href="/">
          전시회 리뷰
        </List>
        <List as="a" href="/">
          메이트 찾기
        </List>
        {/* <List as="a" href="/">
          전시회 정보 등록하기
        </List> */}
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
`;

const Subtitle = styled.h2`
  padding-bottom: 5px;
  color: ${(props) => props.theme.colors.greys80};
  font-weight: 400;
  font-size: 12px;
`;

const MypageArea = styled.a`
  display: flex;
  gap: 10px;
  padding: 10px;
  text-decoration: none;
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  width: 40px;
  height: 40px;
`;

const Nickname = styled.p`
  color: ${(props) => props.theme.colors.greys90};
  font-weight: 500;
  font-size: 14px;
  padding-bottom: 4px;
`;

const Email = styled.p`
  color: ${(props) => props.theme.colors.greys60};
  font-weight: 400;
  font-size: 12px;
`;

const LogoutButton = styled.button`
  display: inline-block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  color: ${(props) => props.theme.colors.greys90};
  font-weight: 500;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  &:hover {
    color: #6750a4;
    background-color: #f6f3fe;
    border-radius: 10px;
  }
`;

const List = styled(LogoutButton)`
  text-decoration: none;
`;
