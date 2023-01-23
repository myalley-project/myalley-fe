import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyAlleyLogo from "../assets/icons/logo.svg";
import personOn from "../assets/icons/personOn.svg";
import personOff from "../assets/icons/personOff.svg";
import HamburgerMenu from "./HamburgerMenu";

const Nav = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [toggleMenuIcon, setToggleMenuIcon] = useState(personOff);
  const userMenuHover = personOn;
  const userMenu = personOff;
  const menuImg = document.getElementById(
    "user-menu"
  ) as HTMLInputElement | null;

  const handleToggleMenu = () => {
    setIsShowMenu((prevState) => !prevState);
  };

  useEffect(() => {
    if (menuImg !== null) {
      if (isShowMenu) {
        setToggleMenuIcon(userMenuHover);
      } else {
        setToggleMenuIcon(userMenu);
      }
    }
  }, [isShowMenu, menuImg, userMenu, userMenuHover]);

  const changeToHoverIcon = () => {
    if (!isShowMenu) setToggleMenuIcon(userMenuHover);
  };

  const changeToNormalIcon = () => {
    if (menuImg !== null && !isShowMenu) setToggleMenuIcon(userMenu);
  };

  return (
    <Navbar>
      <Logo src={MyAlleyLogo} alt="logo" />
      <MenuButton
        type="button"
        onClick={handleToggleMenu}
        onMouseOver={changeToHoverIcon}
        onMouseLeave={changeToNormalIcon}
      >
        <UserMenuIcon src={toggleMenuIcon} alt="menu-icon" id="user-menu" />
      </MenuButton>
      {isShowMenu && <HamburgerMenu />}
    </Navbar>
  );
};

export default Nav;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  max-width: 1440px;
  height: 70px;
  margin: 0 auto;
  border-radius: 0px;
  background-color: #ffffff;
`;

const Logo = styled.img`
  border-radius: 0px;
`;

const MenuButton = styled.button`
  width: 36px;
  height: 36px;
  padding: 0px;
  cursor: pointer;
`;

const UserMenuIcon = styled.img`
  width: 30px;
  height: 30px;
`;
