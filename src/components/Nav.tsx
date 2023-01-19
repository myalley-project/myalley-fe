import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyAlleyLogo from "../assets/icons/logo.svg";
import UserMenuHover from "../assets/icons/userMenuHover.svg";
import UserMenu from "../assets/icons/userMenu.svg";
import HamburgerMenu from "./HamburgerMenu";

const Nav = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [toggleMenuIcon, setToggleMenuIcon] = useState(UserMenu);
  const userMenuHover = UserMenuHover;
  const userMenu = UserMenu;
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
      <Logo>
        <img src={MyAlleyLogo} alt="logo" />
      </Logo>
      <MenuButton
        type="button"
        onClick={handleToggleMenu}
        onMouseOver={changeToHoverIcon}
        onMouseLeave={changeToNormalIcon}
      >
        <img src={toggleMenuIcon} alt="menu-icon" id="user-menu" />
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

const Logo = styled.div``;

const MenuButton = styled.button`
  width: 36px;
  height: 36px;
  padding: 0px;
  cursor: pointer;
`;
