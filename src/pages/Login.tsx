import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import styled from "styled-components";
import LoginSignUp from "../components/LoginSignUp.style";
import Button from "../components/atom/Button";
import CheckLabel from "../components/atom/CheckLabel";
import { ReactComponent as EyeOff } from "../assets/icons/eyeOff.svg";
import { ReactComponent as EyeOn } from "../assets/icons/eyeOn.svg";
import loginApi, { LoginRes } from "../apis/login";
import { getMyInfoApi, MyInfoRes } from "../apis/member";
import isApiError from "../utils/isApiError";
import { alertPreparing } from "../utils/alerts";

// 로그인 컴포넌트_박예선_23.02.08
const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [isPwInputShow, setIsPwInputShow] = useState(false);
  const [stayLog, setStayLog] = useState(false);

  // 로그인 된 상태로 접속 시 리다이렉트_박예선_23.01.24
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      alert("이미 로그인되어있습니다.");
      navigate("/");
    }
  }, [navigate]);

  // input 상태관리 함수_박예선_23.01.01
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  // 비밀번호표시 아이콘 클릭 함수_박예선_23.01.23
  const clickEyeIcon = () => setIsPwInputShow(!isPwInputShow);

  // stayLog 상태관리 함수_박예선_23.01.01
  const handleStayLogBtn = () => setStayLog(!stayLog);

  // 로그인 요청, 요청 후 처리 함수_박예선_23.01.24
  const clickLoginBtn = async () => {
    try {
      const res: AxiosResponse<LoginRes> = await loginApi(loginInfo);
      const { accessToken, refreshToken } = res.data;
      if (!accessToken || !refreshToken) return;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem(
        "refreshExpireDate",
        JSON.stringify({
          expire: new Date().getTime() + 1000 * 60 * 60 * 24 * 29,
        })
      );
      setInfoToLocalStorage();
      navigate("/");
    } catch (err) {
      const errorRes = isApiError(err);
      if (typeof errorRes !== "object") return;
      const { errorCode, errorMsg } = errorRes;
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
      }
    }
  };

  // 로그인 성공 시 회원정보 로컬스토리지 저장 함수_박예선_23.02.08
  const setInfoToLocalStorage = async () => {
    try {
      const userRes: AxiosResponse<MyInfoRes> = await getMyInfoApi();
      const { memberId, email, nickname, memberImage, authority } =
        userRes.data;
      localStorage.setItem("memberId", String(memberId));
      localStorage.setItem("email", email);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("memberImage", memberImage);
      localStorage.setItem("authority", authority);
      alert("로그인되었습니다.");
    } catch (err) {
      alert(
        "죄송합니다.\n회원정보를 불러오는데에 실패하였습니다. 다시 시도해주십시오."
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
            onKeyDown={(e) => {
              if (e.key === "Enter") clickLoginBtn();
            }}
            spellCheck="false"
          />
          <button type="button" onClick={clickEyeIcon}>
            {!isPwInputShow && <EyeOff className="eye-icon" />}
            {isPwInputShow && <EyeOn className="eye-icon" />}
          </button>
        </div>
        <CheckLabel
          label="로그인 상태 유지"
          checked={false}
          onClick={handleStayLogBtn}
        />
      </InputContainer>
      <BtnContainer>
        <Button
          variant="primary"
          size="large"
          type="button"
          className="btn"
          onClick={clickLoginBtn}
          disabled={loginInfo.email === "" || loginInfo.password === ""}
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
      </BtnContainer>
    </LoginSignUp>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-top: 30px;
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
`;

export default Login;
