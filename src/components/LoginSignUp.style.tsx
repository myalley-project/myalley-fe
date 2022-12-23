import React from "react";
import styled from "styled-components";

type LoginSignUpType = { title: string; children: React.ReactNode };

// 로그인, 회원가입에 공통적으로 사용되는 전체적인 레이아웃 컴포넌트_박예선_22.12.21
function LoginSignUp({ title, children }: LoginSignUpType) {
  return (
    <LoginSignUpSection>
      <img
        alt="logo"
        className="logo"
        src="https://cdn.pixabay.com/photo/2021/12/17/09/34/christmas-drink-6876097_1280.jpg"
      />
      {/* 임시로 로고 삽입함. src 추후 수정예정 */}
      <InputContainer>
        <span className="title">{title}</span>
        {children}
      </InputContainer>
    </LoginSignUpSection>
  );
}

const LoginSignUpSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .logo {
    width: 9.11vw;
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
  border-radius: 30px;
  //border-radius는 거의 30픽셀이라서 global-style에 추가해서 사용하면 좋을 것 같습니다.
  .title {
    margin: 30px 0px;
    font-size: 16px;
  }
  input {
    width: 84.21%;
    height: 40px;
    padding-left: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 30px;
    background-color: #fbfbfb;
  }
  button {
    width: 84.21%;
    height: 48px;
    margin: 30px;
    border: none;
    border-radius: 30px;
    background-color: #9c9c9c;
    color: white;
    font-size: 18px;
    font-weight: 700;
  }
`;

export default LoginSignUp;
