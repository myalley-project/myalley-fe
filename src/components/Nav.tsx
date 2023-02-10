import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MyAlleyLogo from "../assets/icons/logo.svg";
import hamburger from "../assets/icons/hamburger.svg";
import xBtn from "../assets/icons/xBtn.svg";
import HamburgerMenu from "./HamburgerMenu";
import { theme } from "../styles/theme";

const Nav = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [toggleMenuIcon, setToggleMenuIcon] = useState(hamburger);
  const userMenuHover = xBtn;
  const userMenu = hamburger;
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

  return (
    <NavbarContaniner>
      <NavbarWrapper>
        <Link to="/">
          <Logo src={MyAlleyLogo} alt="logo" />
        </Link>
        <MenuButton type="button" onClick={handleToggleMenu}>
          <UserMenuIcon src={toggleMenuIcon} alt="menu-icon" id="user-menu" />
        </MenuButton>
        {isShowMenu && <HamburgerMenu setIsShowMenu={setIsShowMenu} />}
      </NavbarWrapper>
    </NavbarContaniner>
  );
};

export default Nav;

const NavbarContaniner = styled.div`
  width: 100vw;
  border-bottom: 1px solid ${theme.colors.greys40};
  border-radius: 0px;
  box-shadow: 0px 4px 30px rgba(79, 55, 139, 0.05);
  @media (max-width: 1440px) {
    padding: 0 20px;
  }
`;

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  height: 70px;
  margin: 0 auto;
  border-radius: 0px;
  background-color: ${theme.colors.white100};
`;

const Logo = styled.img`
  border-radius: 0px;
`;

const MenuButton = styled.button`
  width: 36px;
  height: 36px;
  padding: 0px;
  z-index: 99;
  cursor: pointer;
`;

const UserMenuIcon = styled.img`
  width: 30px;
  height: 30px;
`;
