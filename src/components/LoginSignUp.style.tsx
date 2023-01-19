import React from "react";
import styled from "styled-components";

type LoginSignUpType = { category: string; children: React.ReactNode };

// 로그인, 회원가입에 공통적으로 사용되는 전체적인 레이아웃 컴포넌트_박예선_22.12.21
const LoginSignUp = ({ category, children }: LoginSignUpType) => (
  <LoginSignUpSection>
    <img
      alt="logo"
      className="logo"
      src="https://cdn.pixabay.com/photo/2021/12/17/09/34/christmas-drink-6876097_1280.jpg"
    />
    {/* 임시로 로고 삽입함. src 추후 수정예정 */}
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
  margin-bottom: 94px;
  .logo {
    width: 175px;
    height: 60px;
    margin: 30px auto;
  }
  button {
    cursor: pointer;
    &:disabled {
      cursor: auto;
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  border: 1px solid ${(props) => props.theme.colors.greys40};
  .category {
    margin: 30px 0px;
    color: ${(props) => props.theme.colors.greys90};
    font-size: 20px;
    font-weight: 700;
  }
  .title {
    color: ${(props) => props.theme.colors.greys60};
    font-weight: 700;
  }
  .notice {
    margin: -1px 0 13px;
    font-size: 12px;
    &.err {
      color: ${(props) => props.theme.colors.error};
    }
    &.pass {
      color: ${(props) => props.theme.colors.success};
    }
    &.pw-check {
      margin-bottom: 30px;
    }
  }
  label {
    display: flex;
    flex-direction: column;
  }
  input {
    width: 320px;
    height: 40px;
    margin: 10px 0;
    padding-left: 20px;
    border: 1px solid ${(props) => props.theme.colors.greys40};
    background-color: ${(props) => props.theme.colors.white100};
    color: ${(props) => props.theme.colors.greys90};
    font-size: 14px;
    &::placeholder {
      color: ${(props) => props.theme.colors.greys60};
    }
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  .btn {
    width: 320px;
    height: 48px;
    margin: 30px auto;
    border: none;
    background-color: ${(props) => props.theme.colors.greys60};
    color: ${(props) => props.theme.colors.white100};
    font-size: 18px;
    font-weight: 700;
  }
`;

export default LoginSignUp;
