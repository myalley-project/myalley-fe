import React, { useState } from "react";
import { Infos, Valids, IsOnly } from "../../types/signUp";

interface EmailAndPwType {
  infos: Infos;
  valids: Valids;
  setValids: React.Dispatch<React.SetStateAction<Valids>>;
  isOnly: IsOnly | undefined;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailAndPw = (props: EmailAndPwType) => {
  const { infos, valids, setValids, isOnly, handleInput } = props;
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();

  // 이메일 유효성 상태관리_박예선_23.01.08
  const handleEmailValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const emailTest = /^[a-zA-Z0-9+.]+@[a-z]+\.[a-z]{2,3}$/;
    // 영어 대소문자/숫자 + ’@’ + 영어 소문자 + ‘.’ + 영어 소문자(2~3자)
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      const isEmailValid = emailTest.test(value);
      setValids({
        ...valids,
        [name]: isEmailValid,
      });
    }, 800);
    setTimer(newTimer);
  };

  // 비밀번호 유효성 상태관리_박예선_23.01.08
  const handlePwValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const pwTest =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{8,16}$/;
    // 영어 대소문자, 숫자, 특수문자(~!@#$%^&*)를 포함한 8~16자
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      const isPwValid = pwTest.test(value);
      setValids({
        ...valids,
        [name]: isPwValid,
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
      const isPwCheckValid = infos.pw === value;
      setValids({ ...valids, pwCheck: isPwCheckValid });
    }, 800);
    setTimer(newTimer);
  };

  return (
    <>
      <label htmlFor="email" className="title">
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
        />
      </label>
      {!isOnly && (
        <div className={`notice ${valids.email ? "pass" : "err"}`}>
          {valids.email
            ? "올바른 이메일 형식입니다"
            : "이메일 형식을 확인해주세요"}
        </div>
      )}
      {isOnly && (
        <div className={`notice ${isOnly.email ? "pass" : "err"}`}>
          {!isOnly.email && "이미 등록된 이메일입니다"}
        </div>
      )}
      <label htmlFor="pw" className="title">
        비밀번호
        <input
          type="password"
          name="pw"
          placeholder="Password"
          value={infos.pw}
          onChange={(e) => {
            handleInput(e);
            handlePwValid(e);
          }}
        />
      </label>
      <div className={`notice ${valids.pw ? "pass" : "err"}`}>
        {valids.pw
          ? "안전한 비밀번호입니다"
          : "  영어 대소문자, 숫자, 특수문자를 포함한 8~16자를 입력하세요"}
      </div>
      <label htmlFor="pwValid" className="title">
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
        />
      </label>
      <div className={`notice pw-check ${valids.pwCheck ? "pass" : "err"}`}>
        {valids.pwCheck
          ? "동일한 비밀번호입니다"
          : "비밀번호가 일치하지 않습니다"}
      </div>
    </>
  );
};

export default EmailAndPw;
