import React from "react";
import styled from "styled-components";
import Menu from "../assets/icons/menu.svg";

const Nav = () => (
  <Navbar>
    <Logo />
    <button type="button">
      <img src={Menu} alt="menu-icon" />
    </button>
  </Navbar>
);

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
