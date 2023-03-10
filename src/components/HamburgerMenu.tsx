// eslint-disable-line no-script-url
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import useLogOut from "../apis/logOut";
import ProfileImg from "../assets/icons/profileImg.svg";
import { theme } from "../styles/theme";

interface PropsType {
  setIsShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const HamburgerMenu = ({ setIsShowMenu }: PropsType) => {
  const logOut = useLogOut();
  const location = useLocation();
  const [isLocationKey, setIsLocationKey] = useState(location.key);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const info = {
    nickname: localStorage.getItem("nickname"),
    memberImage: localStorage.getItem("memberImage")!,
    email: localStorage.getItem("email"),
    authority: localStorage.getItem("authority"),
  };

  const toggleMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (!menuRef.current?.contains(target)) {
      setIsLocationKey(location.key);
      setIsShowMenu(false);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isLocationKey !== location.key) {
      setIsShowMenu(false);
      setIsMenuOpen(false);
    }
  }, [location, isLocationKey, setIsShowMenu]);

  return (
    <Background>
      {isMenuOpen && (
        <MenuOutSide onClick={toggleMenu}>
          <MenuOutSideWrapper>
            <MenuContainer ref={menuRef} className="hamburgermenu">
              {localStorage.getItem("accessToken") ? (
                <MenuWrapper>
                  <Subtitle>계정</Subtitle>
                  {localStorage.getItem("authority") === "ROLE_USER" ? (
                    <MypageArea href="/mypage/edit">
                      <ProfileWrapper>
                        <img
                          src={
                            info.memberImage === ""
                              ? ProfileImg
                              : info.memberImage
                          }
                          alt="profile-img"
                          style={{ width: "40px" }}
                        />
                      </ProfileWrapper>
                      <div>
                        <Nickname>{info.nickname}</Nickname>
                        <Email className="email">{info.email}</Email>
                      </div>
                    </MypageArea>
                  ) : (
                    <MypageArea as="div" style={{ cursor: "auto" }}>
                      <ProfileWrapper>
                        <img
                          src={
                            info.memberImage === ""
                              ? ProfileImg
                              : info.memberImage
                          }
                          alt="profile-img"
                          style={{ width: "40px" }}
                        />
                      </ProfileWrapper>
                      <div>
                        <Nickname>{info.nickname}</Nickname>
                        <Email className="email">{info.email}</Email>
                      </div>
                    </MypageArea>
                  )}

                  <LogoutButton type="button" onClick={logOut}>
                    로그아웃
                  </LogoutButton>
                </MenuWrapper>
              ) : (
                <MenuWrapper>
                  <Subtitle>계정</Subtitle>
                  <List as="a" href="/login">
                    로그인
                  </List>
                  <List as="a" href="/signup">
                    회원가입
                  </List>
                </MenuWrapper>
              )}

              <MenuWrapper>
                <Subtitle>메뉴</Subtitle>
                <ul>
                  {info.authority !== "ROLE_ADMIN" && (
                    <List as="a" href="/exhibition-list">
                      전시회
                    </List>
                  )}
                  {info.authority !== "ROLE_ADMIN" && (
                    <List as="a" href="/blogreview-list">
                      전시회 리뷰
                    </List>
                  )}
                  {info.authority !== "ROLE_ADMIN" && (
                    <List as="a" href="/mate-list">
                      메이트 찾기
                    </List>
                  )}
                  {info.authority === "ROLE_ADMIN" && (
                    <List as="a" href="/exhibition-write">
                      전시회 정보 등록하기
                    </List>
                  )}
                </ul>
              </MenuWrapper>
            </MenuContainer>
          </MenuOutSideWrapper>
        </MenuOutSide>
      )}
    </Background>
  );
};

export default HamburgerMenu;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const MenuOutSide = styled.div`
  position: relative;
  z-index: 98;
  width: 100vw;
  height: 100vw;
`;

const MenuOutSideWrapper = styled.div`
  justify-items: center;
  position: relative;
  width: 100vw;
  max-width: 1440px;
  margin-inline: auto;
`;

const MenuContainer = styled.div`
  position: absolute;
  z-index: 100; // 항상 최상단에 위치
  right: 0px;
  top: 57px;
  width: 215px;
  padding: 10px;
  border: 1px solid ${theme.colors.secondary5};
  border-radius: 10px;
  background-color: ${theme.colors.white100};
  box-shadow: 0px 4px 30px rgba(79, 55, 139, 0.05);
`;

const MenuWrapper = styled.div`
  padding-bottom: 10px;
`;

const Subtitle = styled.h2`
  padding-bottom: 5px;
  color: ${theme.colors.greys80};
  font-weight: 400;
  font-size: 14px;
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
  color: ${theme.colors.greys90};
  font-weight: 500;
  font-size: 16px;
  padding-bottom: 4px;
`;

const Email = styled.p`
  color: ${theme.colors.greys60};
  font-weight: 400;
  font-size: 12px;
`;

const LogoutButton = styled.button`
  display: inline-block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  color: ${theme.colors.greys90};
  font-weight: 500;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.primry70};
    background-color: ${theme.colors.secondary5};
    border-radius: 10px;
  }
  &:focus-visible {
    outline: 1px solid ${theme.colors.primry80};
    border-radius: 10px;
  }
`;

const List = styled(LogoutButton)`
  text-decoration: none;
`;
