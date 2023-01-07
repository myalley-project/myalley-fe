import React, { useState } from "react";
import styled from "styled-components";
import UserMenu from "../assets/icons/UserMenu.svg";
import HamburgerMenu from "./HamburgerMenu";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <Navbar>
      <Logo />
      <button type="button" onClick={toggleMenu}>
        <img src={UserMenu} alt="menu-icon" />
      </button>
      {showMenu && <HamburgerMenu />}
    </Navbar>
  );
};

export default Nav;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 75vw;
  height: 70px;
  margin: 0 auto;
  border-radius: 0px;
  background-color: #ffffff;
  > button {
    cursor: pointer;
  }
`;

const Logo = styled.div`
  width: 210px;
  border-radius: 0px;
  background-color: ${(props) => props.theme.colors.main};
`;
