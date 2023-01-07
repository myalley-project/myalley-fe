import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserMenuHover from "../assets/icons/userMenuHover.svg";
import UserMenu from "../assets/icons/userMenu.svg";
import HamburgerMenu from "./HamburgerMenu";

const Nav = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
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
        menuImg.setAttribute("src", userMenuHover);
      } else {
        menuImg.setAttribute("src", userMenu);
      }
    }
  }, [isShowMenu, menuImg, userMenu, userMenuHover]);

  const changeToHoverIcon = () => {
    if (menuImg !== null && !isShowMenu)
      menuImg.setAttribute("src", userMenuHover);
  };

  const changeToNormalIcon = () => {
    if (menuImg !== null && !isShowMenu) menuImg.setAttribute("src", userMenu);
  };

  return (
    <Navbar>
      <Logo />
      <MenuButton
        type="button"
        onClick={handleToggleMenu}
        onMouseOver={changeToHoverIcon}
        onMouseLeave={changeToNormalIcon}
      >
        <img src={UserMenu} alt="menu-icon" id="user-menu" />
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
  width: 75vw;
  height: 70px;
  margin: 0 auto;
  border-radius: 0px;
  background-color: #ffffff;
`;

const Logo = styled.div`
  width: 210px;
  height: 100%;
  border-radius: 0px;
  background-color: ${(props) => props.theme.colors.main};
`;

const MenuButton = styled.button`
  width: 36px;
  height: 36px;
  cursor: pointer;
`;
