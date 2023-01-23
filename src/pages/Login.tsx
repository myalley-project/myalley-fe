import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import styled from "styled-components";
import LoginSignUp from "../components/LoginSignUp.style";
import Button from "../components/atom/Button";
import CheckLabel from "../components/atom/CheckLabel";
import { ReactComponent as EyeOff } from "../assets/icons/eyeOff.svg";
import { ReactComponent as EyeOn } from "../assets/icons/eyeOn.svg";
import loginApi, { LoginRes } from "../apis/login";
import { MyInfoRes, useMyInfoApi } from "../apis/member";

// 로그인 컴포넌트_박예선_23.01.23
const Login = () => {
  const navigate = useNavigate();
  const myInfoApi = useMyInfoApi("get");
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [isPwInputShow, setIsPwInputShow] = useState(false);
  const [stayLog, setStayLog] = useState(false);

  // input 상태관리 함수_박예선_23.01.01
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  // 비밀번호표시 아이콘 클릭 함수_박예선_23.01.23
  const clickEyeIcon = () => setIsPwInputShow(!isPwInputShow);

  // stayLog 상태관리 함수_박예선_23.01.01
  const handleStayLogBtn = () => setStayLog(!stayLog);

  // 로그인 요청, 요청 후 처리 함수_박예선_23.01.13
  const clickLoginBtn = async () => {
    try {
      const res: AxiosResponse<LoginRes> = await loginApi(loginInfo);
      // = await axios.get("/data/login.json"); // 테스트용 목데이터
      const { accessToken, refreshToken, errorCode, errorMsg } = res.data;
      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        try {
          const userRes: AxiosResponse<MyInfoRes> = await myInfoApi();
          const { userId, email, nickname, userImage, authority } =
            userRes.data;
          localStorage.setItem("userId", String(userId));
          localStorage.setItem("email", email);
          localStorage.setItem("nickname", nickname);
          localStorage.setItem("userImage", userImage);
          localStorage.setItem("authority", authority);
        } catch (err) {
          alert(
            "죄송합니다.\n회원정보를 불러오는데에 실패하였습니다. 다시 시도해주십시오."
          );
        }
        // alert("로그인되었습니다.");
        // navigate("/");
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
          spellCheck="false"
        />
        <div className="pw-container">
          <input
            type={isPwInputShow ? "text" : "password"}
            name="password"
            placeholder="비밀번호"
            className="pw-input"
            value={loginInfo.password}
            onChange={handleInput}
            spellCheck="false"
          />
          <button type="button" onClick={clickEyeIcon}>
            {!isPwInputShow && <EyeOff className="eye-icon" />}
            {isPwInputShow && <EyeOn className="eye-icon" />}
          </button>
        </div>
        <CheckLabel label="로그인 상태 유지" onClick={handleStayLogBtn} />
      </InputContainer>
      <BtnContainer>
        <Button
          variant="primary"
          size="large"
          type="button"
          className="btn"
          onClick={clickLoginBtn}
          disabled={loginInfo.email === "" && loginInfo.password === "" && true}
        >
          로그인
        </Button>
        <div className="or-sign-up">
          <div className="line" />
          <div className="text">또는</div>
          <div className="line" />
        </div>
        <Button
          variant="secondary"
          size="large"
          type="button"
          className="btn"
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </Button>
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
    margin: 0 0 8px;
  }
  .pw-container {
    position: relative;
    width: 320px;
    height: 44px;
    margin-bottom: 14px;
    .eye-icon {
      position: absolute;
      right: 20px;
      bottom: 50%;
      cursor: pointer;
      transform: translate(0, 50%);
    }
    .pw-input {
      position: absolute;
      background-position: right 10px center;
    }
  }
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  .btn {
    width: 320px;
    margin: 0;
  }
  .or-sign-up {
    display: flex;
    justify-content: space-between;
    height: 16px;
    margin: 8px 0;
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
