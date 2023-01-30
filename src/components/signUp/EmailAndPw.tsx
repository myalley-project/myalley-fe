import React, { useState } from "react";
import { Infos, Valids, IsOnly } from "../../types/signUp";

interface EmailAndPwType {
  infos: Infos;
  valids: Valids;
  setValids: React.Dispatch<React.SetStateAction<Valids>>;
  isOnly: IsOnly;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// 회원/관리자 회원가입 공통 컴포넌트_박예선_23.01.08
const EmailAndPw = (props: EmailAndPwType) => {
  const { infos, valids, setValids, isOnly, handleInput } = props;
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();

  // 이메일 유효성 상태관리_박예선_23.01.09
  const handleEmailValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const rEmail = /^[a-zA-Z0-9+.]+@[a-z]+\.[a-z]{2,3}$/;
    // 영어 대소문자/숫자 + ’@’ + 영어 소문자 + ‘.’ + 영어 소문자(2~3자)
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      const isEmailValid = rEmail.test(value);
      setValids({
        ...valids,
        email: isEmailValid,
      });
    }, 800);
    setTimer(newTimer);
  };

  // 비밀번호 유효성 상태관리_박예선_23.01.09
  const handlePwValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const rPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{8,16}$/;
    // 영어 대소문자, 숫자, 특수문자(~!@#$%^&*)를 포함한 8~16자
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      const isPwValid = rPassword.test(value);
      const isPwCheckValid = infos.pwCheck === value;
      setValids({
        ...valids,
        password: isPwValid,
        pwCheck: isPwCheckValid,
      });
    }, 800);
    setTimer(newTimer);
  };

  // 비밀번호 확인 상태관리_박예선_23.01.08
  const handlePwCheckValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      const isPwCheckValid = infos.password === value;
      setValids({ ...valids, pwCheck: isPwCheckValid });
    }, 800);
    setTimer(newTimer);
  };

  return (
    <>
      <label className="title">
        이메일
        <input
          type="email"
          name="email"
          placeholder="ex_mail@exhibition.com"
          value={infos.email}
          onChange={(e) => {
            handleInput(e);
            handleEmailValid(e);
          }}
          className={
            valids.email === false || isOnly.email === false ? "err" : ""
          }
        />
      </label>
      {isOnly.email === null && valids.email !== null && (
        <div className={`notice ${valids.email ? "pass" : "err"}`}>
          {valids.email
            ? "올바른 이메일 형식입니다"
            : "이메일 형식을 확인해주세요"}
        </div>
      )}
      {isOnly.email !== null && (
        <div className={`notice ${isOnly.email ? "pass" : "err"}`}>
          {!isOnly.email && "이미 등록된 이메일입니다"}
        </div>
      )}
      <label className="title">
        비밀번호
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={infos.password}
          onChange={(e) => {
            handleInput(e);
            handlePwValid(e);
          }}
          className={valids.password === false ? "err" : ""}
        />
      </label>
      {valids.password === null && (
        <div className="notice default">
          영어 대소문자, 숫자, 특수문자를 포함한 8~16자를 입력하세요
        </div>
      )}
      {valids.password !== null && (
        <div className={`notice ${valids.password ? "pass" : "err"}`}>
          {valids.password
            ? "안전한 비밀번호입니다"
            : "  영어 대소문자, 숫자, 특수문자를 포함한 8~16자를 입력하세요"}
        </div>
      )}
      <label className="title pw-check">
        비밀번호 재확인
        <input
          type="password"
          name="pwCheck"
          placeholder="Password"
          value={infos.pwCheck}
          onChange={(e) => {
            handleInput(e);
            handlePwCheckValid(e);
          }}
          className={valids.pwCheck === false ? "err" : ""}
        />
        {valids.pwCheck !== null && (
          <div className={`notice ${valids.pwCheck ? "pass" : "err"}`}>
            {valids.pwCheck
              ? "동일한 비밀번호입니다"
              : "비밀번호가 일치하지 않습니다"}
          </div>
        )}
      </label>
    </>
  );
};

export default EmailAndPw;
