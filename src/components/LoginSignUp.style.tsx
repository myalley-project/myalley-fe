import React from "react";
import styled from "styled-components";
import logo from "../assets/icons/logo.svg";
import { theme } from "../styles/theme";

type LoginSignUpType = { category: string; children: React.ReactNode };

// 로그인, 회원가입에 공통적으로 사용되는 전체적인 레이아웃 컴포넌트_박예선_23.01.23
const LoginSignUp = ({ category, children }: LoginSignUpType) => (
  <LoginSignUpSection>
    <Logo alt="logo" className="logo" src={logo} />
    <InputContainer>
      <span className="category">{category}</span>
      {children}
    </InputContainer>
  </LoginSignUpSection>
);

const LoginSignUpSection = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 55px;
  button {
    cursor: pointer;
    &:disabled {
      cursor: auto;
    }
  }
`;

const Logo = styled.img`
  width: 175px;
  height: 60px;
  margin: 30px auto;
  border-radius: 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 30px;
  border: 1px solid ${theme.colors.secondary30};
  box-shadow: 0px 4px 30px #4f378b0d;
  .category {
    margin-bottom: 30px;
    color: ${theme.colors.greys90};
    font-size: 20px;
    font-weight: 700;
  }
  .title {
    color: ${theme.colors.greys80};
    font-weight: 700;
  }
  .notice {
    margin: -1px 0 13px;
    font-size: 12px;
    &.err {
      color: ${theme.colors.error};
    }
    &.pass {
      color: ${theme.colors.success};
    }
    &.default {
      color: ${theme.colors.greys60};
    }
  }
  .pw-check {
    margin-bottom: 20px;
  }
  label {
    display: flex;
    flex-direction: column;
  }
  input {
    width: 320px;
    height: 44px;
    margin: 10px 0;
    padding-left: 20px;
    border: 1px solid ${theme.colors.greys40};
    background-color: ${theme.colors.white100};
    color: ${theme.colors.greys90};
    font-size: 14px;
    &::placeholder {
      color: ${theme.colors.greys60};
    }
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &.err {
      border-color: ${theme.colors.error};
      color: ${theme.colors.error};
      background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' stroke='%23FD3D51' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M12 6V13' stroke='%23FD3D51' stroke-width='2' stroke-linecap='round'/%3E%3Ccircle cx='12' cy='17' r='1' fill='%23FD3D51'/%3E%3C/svg%3E%0A")
        no-repeat;
      background-position: right 20px center;
    }
  }
`;

export default LoginSignUp;
