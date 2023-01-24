import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginSignUp from "../components/LoginSignUp.style";
import EmailAndPw from "../components/signUp/EmailAndPw";
import CommonOnly from "../components/signUp/CommonOnly";
import AdminOnly from "../components/signUp/AdminOnly";
import { IsOnly } from "../types/signUp";
import signUpApi from "../apis/signUp";
import isApiError from "../utils/isApiError";

// 회원용/관리자용 회원가입 컴포넌트_박예선_2023.01.09
const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  const [isOnly, setIsOnly] = useState<IsOnly>({
    email: null,
    nickname: null,
    adminNo: null,
  });

  // 로그인 된 상태로 접속 시 리다이렉트_박예선_23.01.24
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      alert("이미 로그인되어있습니다.");
      navigate("/");
    }
  }, [navigate]);

  // 전체 input 입력값 상태관리 함수_박예선_22.12.27
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInfos({
      ...infos,
      [name]: value,
    });
  };

  // 회원가입 요청, 요청 후 처리 함수_박예선_2023.01.21
  const clickSignUpBtn = async () => {
    const isAdmin = location.search === "?admin";
    try {
      const res = await signUpApi(infos, isAdmin);
      const { resultCode } = res.data;
      if (resultCode === 200) {
        alert("회원가입 완료");
        navigate("/login");
      }
    } catch (err) {
      const errorRes = isApiError(err);
      if (typeof errorRes !== "object") return;
      const { errorMsg } = errorRes;
      if (errorMsg === "이메일 중복") {
        setIsOnly({ ...isOnly, email: false });
        return;
      }
      if (errorMsg === "관리자번호 확인 불가") {
        setIsOnly({ ...isOnly, adminNo: false });
        return;
      }
      if (errorMsg === "닉네임 중복") {
        setIsOnly({ ...isOnly, nickname: false });
        return;
      }
      if (errorMsg === "이메일 형식 오류") {
        setValids({ ...valids, email: false });
        return;
      }
      if (errorMsg === "비밀번호 형식 오류") {
        setValids({ ...valids, password: false });
        return;
      }
      if (errorMsg === "닉네임 형식 오류") {
        setValids({ ...valids, nickname: false });
        return;
      }
      if (errorMsg === "이름 형식 오류") {
        setValids({ ...valids, name: false });
      }
    }
  };

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
            setIsOnly={setIsOnly}
            handleInput={handleInput}
          />
        )}
        <button className="btn" type="button" onClick={clickSignUpBtn}>
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
