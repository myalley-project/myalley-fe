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
import Button from "../components/atom/Button";

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
    adminNo: false,
    name: false,
  });
  const [isOnly, setIsOnly] = useState<IsOnly>({
    email: null,
    nickname: null,
    adminNo: null,
  });
  const [isSignUpBtnDisabled, setIsSignUpBtnDisabled] = useState(false);

  // 로그인 된 상태로 접속 시 리다이렉트_박예선_23.01.24
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      alert("이미 로그인되어있습니다.");
      navigate("/");
    }
  }, [navigate]);

  // 가입하기 버튼 비활성화 여부_박예선_23.01.24
  useEffect(() => {
    const { email, password, pwCheck, adminNo, name, nickname } = valids;
    const { gender, birth } = infos;
    if (email && password && pwCheck && isOnly.email !== false)
      setIsSignUpBtnDisabled(false);
    if (location.search !== "?admin") {
      if (
        nickname &&
        gender !== "" &&
        birth.year &&
        birth.month &&
        birth.day &&
        isOnly.nickname !== false
      )
        return setIsSignUpBtnDisabled(false);
    }
    if (location.search === "?admin") {
      if (adminNo && name) return setIsSignUpBtnDisabled(false);
    }
    return setIsSignUpBtnDisabled(true);
  }, [valids, infos, isOnly.email, isOnly.nickname, location.search]);

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
        <Button
          type="button"
          variant="primary"
          size="large"
          className="btn"
          onClick={clickSignUpBtn}
          disabled={isSignUpBtnDisabled}
        >
          가입하기
        </Button>
      </SignUpContainer>
    </LoginSignUp>
  );
};

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .btn {
    width: 320px;
    margin-top: 23px;
  }
`;

export default SignUp;
