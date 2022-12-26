import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import LoginSignUp from "../../components/LoginSignUp.style";
import { dayArr, monthArr, yearArr } from "../../function/signUp/signUpBirth";

// 회원용/관리자용 회원가입 컴포넌트_박예선_22.12.28
const SignUp = () => {
  const location = useLocation();

  return (
    <LoginSignUp category="회원가입">
      <SignUpContainer>
        <label htmlFor="email" className="title">
          이메일
          <input
            type="email"
            name="email"
            placeholder="ex_mail@exhibition.com"
          />
        </label>
        <label htmlFor="pw" className="title">
          비밀번호
          <input type="password" name="pw" placeholder="Password" />
        </label>
        <label htmlFor="pwValid" className="title">
          비밀번호 재확인
          <input type="password" name="pwValid" placeholder="Password" />
        </label>
        {/* 회원용 회원가입 */}
        {location.search !== "?admin" && (
          <>
            <label htmlFor="nickName" className="title">
              별명
              <input type="text" placeholder="Nickname" />
            </label>
            <div>
              <span className="title">생년월일</span>
              <BirthDropDownContainer>
                <select required className="birth-year">
                  <option value="" disabled selected>
                    년도
                  </option>
                  {yearArr().map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
                <select required>
                  <option value="" disabled selected>
                    월
                  </option>
                  {monthArr().map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </select>
                <select required>
                  <option value="" disabled selected>
                    일
                  </option>
                  {dayArr().map((day) => (
                    <option key={day}>{day}</option>
                  ))}
                </select>
              </BirthDropDownContainer>
            </div>
            <GenderDropDown>
              <div className="title">성별</div>
              <select required>
                <option value="" disabled selected>
                  선택없음
                </option>
                <option>남</option>
                <option>여</option>
              </select>
            </GenderDropDown>
          </>
        )}
        {/* 관리자용 회원가입 */}
        {location.search === "?admin" && (
          <>
            <span className="title">관리자 고유번호</span>
            <input />
            <span className="title ">이름</span>
            <input />
          </>
        )}
        <button type="submit"> 가입하기</button>
      </SignUpContainer>
    </LoginSignUp>
  );
};

const SignUpContainer = styled.div`
  select {
    height: 40px;
    margin: 10px 0;
    padding: 0 0 0 20px;
    border: 1px solid #e0e0e0;
    border-radius: 30px;
    background: url("data:image/svg+xml,%3Csvg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.2998 1.69995L6.6998 6.29995C6.5998 6.39995 6.49147 6.47062 6.3748 6.51195C6.25814 6.55395 6.13314 6.57495 5.9998 6.57495C5.86647 6.57495 5.74147 6.55395 5.6248 6.51195C5.50814 6.47062 5.3998 6.39995 5.2998 6.29995L0.699804 1.69995C0.516471 1.51662 0.424804 1.28328 0.424804 0.999951C0.424804 0.716618 0.516471 0.483285 0.699804 0.299952C0.883137 0.116618 1.11647 0.024951 1.3998 0.0249509C1.68314 0.0249509 1.91647 0.116618 2.0998 0.299951L5.9998 4.19995L9.8998 0.299951C10.0831 0.116618 10.3165 0.0249505 10.5998 0.0249505C10.8831 0.0249505 11.1165 0.116618 11.2998 0.299951C11.4831 0.483284 11.5748 0.716618 11.5748 0.999951C11.5748 1.28328 11.4831 1.51662 11.2998 1.69995Z' fill='%239C9C9C'/%3E%3C/svg%3E%0A")
      no-repeat;
    background-size: 11.15px 6.55px;
    background-position: right 26px center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    &::-ms-expand {
      display: none;
    }
    option {
      :disabled {
        display: none;
      }
    }
    :invalid {
      color: #9c9c9c;
    }
  }
`;

const BirthDropDownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 320px;
  select {
    width: 92px;
    padding: 0 26.43px 0 20px;
    &:nth-child(3n) {
      margin-right: 0px;
    }
    &.birth-year {
      width: 116px;
    }
  }
`;

const GenderDropDown = styled.div`
  select {
    width: 320px;
  }
`;

export default SignUp;
