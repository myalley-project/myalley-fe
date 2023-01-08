import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import LoginSignUp from "../components/LoginSignUp.style";
import EmailAndPw from "../components/signUp/EmailAndPw";
import CommonOnly from "../components/signUp/CommonOnly";
import AdminOnly from "../components/signUp/AdminOnly";
import { IsOnly } from "../types/signUp";

// 회원용/관리자용 회원가입 컴포넌트_박예선_22.12.28
const SignUp = () => {
  const location = useLocation();
  const [infos, setInfos] = useState({
    email: "",
    password: "",
    pwCheck: "",
    gender: "",
    birth: { year: "", month: "", day: "" },
    nickname: "",
    adminNo: 0,
    name: "",
  });
  const [valids, setValids] = useState({
    email: false,
    password: false,
    pwCheck: false,
    nickname: false,
    adminNo: true,
    name: false,
  });
  const [isOnly, setIsOnly] = useState<IsOnly | undefined>(undefined);

  // 전체 input 입력값 상태관리 함수_박예선_22.12.27
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInfos({
      ...infos,
      [name]: value,
    });
  };

  const clickSignUpBtn = () => {};

  return (
    <LoginSignUp category="회원가입">
      <SignUpContainer>
        {/* 공통 회원가입 UI */}
        <EmailAndPw
          infos={infos}
          valids={valids}
          setValids={setValids}
          isOnly={isOnly}
          handleInput={handleInput}
        />
        {/* 회원용 회원가입 UI */}
        {location.search !== "?admin" && (
          <CommonOnly
            infos={infos}
            setInfos={setInfos}
            valids={valids}
            setValids={setValids}
            isOnly={isOnly}
            handleInput={handleInput}
          />
        )}
        {/* 관리자용 회원가입 UI */}
        {location.search === "?admin" && (
          <AdminOnly
            infos={infos}
            valids={valids}
            setValids={setValids}
            isOnly={isOnly}
            handleInput={handleInput}
          />
        )}
        <button className="btn" type="submit" onClick={clickSignUpBtn}>
          가입하기
        </button>
      </SignUpContainer>
    </LoginSignUp>
  );
};

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default SignUp;
