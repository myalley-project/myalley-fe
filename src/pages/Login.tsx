import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import styled from "styled-components";
import LoginSignUp from "../../components/LoginSignUp.style";
import checkboxOff from "../../assets/icons/checkboxOff.svg";
import checkboxOn from "../../assets/icons/checkboxOn.svg";

// 로그인 컴포넌트_박예선_2023.01.01
const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [stayLog, setStayLog] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleStayLogBtn = () =>
    stayLog ? setStayLog(false) : setStayLog(true);

  const clickLoginBtn = () => {};

  return (
    <LoginSignUp category="로그인">
      <InputContainer>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={loginInfo.email}
          onChange={handleInput}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={loginInfo.password}
          onChange={handleInput}
        />
        <button
          type="button"
          className="checkbox-container"
          onClick={handleStayLogBtn}
        >
          <img alt="checkbox-off" src={stayLog ? checkboxOn : checkboxOff} />
          <span className={`text ${stayLog ? "checked" : ""}`}>
            로그인 상태 유지
          </span>
        </button>
      </InputContainer>
      <BtnContainer>
        <button
          type="button"
          className="btn"
          onClick={() => {
            clickLoginBtn();
          }}
        >
          로그인
        </button>
        <div className="or-sign-up">
          <div className="line" />
          <div className="text">또는</div>
          <div className="line" />
        </div>
        <button
          type="button"
          className="btn sign-up-btn"
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </button>
        <div className="find-account">
          <Link to="/">비밀번호 찾기</Link>
          <div className="line" />
          <Link to="/">아이디 찾기</Link>
        </div>
      </BtnContainer>
    </LoginSignUp>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  input {
    margin: 0 0 10px;
  }
  .checkbox-container {
    display: flex;
    align-items: center;
    width: 140px;
    padding: 0;
    color: #9c9c9c;
    .text {
      margin-left: 10px;
      font-size: 14px;
      line-height: inherit;
    }
    .checked {
      color: #333333;
    }
  }
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  .btn {
    margin: 0;
  }
  .or-sign-up {
    display: flex;
    justify-content: space-between;
    height: 16px;
    margin: 14px 0;
    color: #e0e0e0;
    align-items: center;
    .line {
      width: 139px;
      height: 0.1px;
      border-top: 1px solid #e0e0e0;
    }
    .text {
      font-size: 12px;
    }
  }
  .sign-up-btn {
    background-color: #e0e0e0;
  }
  .find-account {
    display: flex;
    justify-content: center;
    margin: 10px 0 30px;
    a {
      font-size: 12px;
      color: #e0e0e0;
      text-decoration: none;
    }
    .line {
      width: 0.1px;
      height: 10px;
      margin: 0 10px;
      border-right: 1px solid #e0e0e0;
    }
  }
`;

export default Login;
