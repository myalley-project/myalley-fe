import React from "react";
import styled from "styled-components";
import UserMenu from "../assets/icons/UserMenu.svg";
import HamburgerMenu from "./HamburgerMenu";

const Nav = () => {
  const showMenu = () => {
    console.log("1");
  };

  return (
    <Navbar>
      <Logo />
      <button type="button" onClick={showMenu}>
        <img src={UserMenu} alt="menu-icon" />
      </button>
      <HamburgerMenu />
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
