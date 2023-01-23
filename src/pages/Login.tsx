import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import styled from "styled-components";
import LoginSignUp from "../components/LoginSignUp.style";
import checkOff from "../assets/icons/checkOff.svg";
import checkOn from "../assets/icons/checkOn.svg";
import loginApi, { LoginRes } from "../apis/login";

// 로그인 컴포넌트_박예선_2023.01.01
const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [stayLog, setStayLog] = useState(false);

  // input 상태관리 함수_박예선_2023.01.01
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  // stayLog 상태관리 함수_박예선_2023.01.01
  const handleStayLogBtn = () =>
    stayLog ? setStayLog(false) : setStayLog(true);

  // 로그인 요청, 요청 후 처리 함수_박예선_2023.01.13
  const clickLoginBtn = async () => {
    try {
      const res: AxiosResponse<LoginRes> =
        // await loginApi(loginInfo);
        await axios.get("/data/login.json"); // 테스트용 목데이터
      const { accessToken, refreshToken, errorCode, errorMsg } = res.data;
      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        alert("로그인에 성공했습니다.");
        navigate("/");
        return;
      }
      if (errorMsg === "회원 정보 없음") {
        alert("등록된 회원정보가 없습니다.");
        return;
      }
      if (errorCode === 400) {
        alert(
          `${
            errorMsg === "이메일 형식 오류" ? "이메일" : "비밀번호"
          } 형식을 확인하세요.`
        );
        return;
      }
    } catch (err) {
      alert(
        "죄송합니다.\n통신에 오류가 있어 로그인에 실패하였습니다. 다시 시도해주십시오."
      );
    }
  };

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
          <img alt="checkbox-off" src={stayLog ? checkOn : checkOff} />
          <span className={`text ${stayLog ? "checked" : ""}`}>
            로그인 상태 유지
          </span>
        </button>
      </InputContainer>
      <BtnContainer>
        <button type="button" className="btn" onClick={clickLoginBtn}>
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
