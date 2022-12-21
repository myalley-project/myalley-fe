import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import LoginSignUp from "../../components/LoginSignUp.style";
import { dayArr, monthArr, yearArr } from "../../function/signUp/signUpBirth";

const SignUp = () => {
  const location = useLocation();

  return (
    <LoginSignUp title="회원가입">
      <input name="email" placeholder="ex_mail@exhibition.com" />
      <input name="pw" placeholder="Password" />
      <input name="pwValid" placeholder="Password" />
      {location.search !== "?admin" && (
        <>
          <span>별명</span>
          <input type="text" placeholder="Nickname" />
          <span>생년월일</span>
          <BirthDropDownContainer>
            <select>
              <option>년도</option>
              {yearArr().map((year) => (
                <option key={year}>{year}</option>
              ))}
            </select>
            <select>
              <option>월</option>
              {monthArr().map((month) => (
                <option key={month}>{month}</option>
              ))}
            </select>
            <select>
              <option>일</option>
              {dayArr().map((day) => (
                <option key={day}>{day}</option>
              ))}
            </select>
          </BirthDropDownContainer>
          <span>성별</span>
          <GenderDropDown>
            <option>선택없음</option>
            <option>남</option>
            <option>여</option>
          </GenderDropDown>
        </>
      )}
      {location.search === "?admin" && (
        <>
          <span>관리자 고유번호</span>
          <input />
          <span>이름</span>
          <input />
        </>
      )}
      <button type="submit"> 가입하기</button>
    </LoginSignUp>
  );
};

const BirthDropDownContainer = styled.div``;

const GenderDropDown = styled.select``;

export default SignUp;
