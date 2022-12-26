import React from "react";
import styled from "styled-components";

type LoginSignUpType = { category: string; children: React.ReactNode };

// 로그인, 회원가입에 공통적으로 사용되는 전체적인 레이아웃 컴포넌트_박예선_22.12.21
function LoginSignUp({ category, children }: LoginSignUpType) {
  return (
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
}

const LoginSignUpSection = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .logo {
    width: 175px;
    height: 60px;
    margin: 30px 0px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  border: 1px solid #e0e0e0;
  .category {
    margin: 30px 0px;
    color: #333333;
    font-size: 20px;
    font-weight: 700;
  }
  .title {
    color: #9c9c9c;
  }
  label {
    display: flex;
    flex-direction: column;
    input {
      width: 320px;
      height: 40px;
      margin: 10px 0;
      padding-left: 20px;
      border: 1px solid #e0e0e0;
      background-color: #fbfbfb;
    }
  }
  button {
    width: 84.21%;
    height: 48px;
    margin: 30px;
    border: none;
    background-color: #9c9c9c;
    color: white;
    font-size: 18px;
    font-weight: 700;
  }
`;

export default LoginSignUp;
