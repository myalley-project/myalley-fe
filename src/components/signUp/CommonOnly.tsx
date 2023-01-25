import React, { useState } from "react";
import styled from "styled-components";
import { Infos, IsOnly, Valids } from "../../types/signUp";
import {
  getDayArray,
  getMonthArray,
  getYearArray,
} from "../../utils/dateSelector";
import Selectbox from "../atom/Selectbox";

interface CommonOnlyType {
  infos: Infos;
  setInfos: React.Dispatch<React.SetStateAction<Infos>>;
  valids: Valids;
  setValids: React.Dispatch<React.SetStateAction<Valids>>;
  isOnly: IsOnly;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
// 회원용 회원가입 UI 컴포넌트_박예선_23.01.24
const CommonOnly = (props: CommonOnlyType) => {
  const { infos, setInfos, valids, setValids, isOnly, handleInput } = props;
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();

  // 생년월일, 성별 select 선택값 상태관리_박예선_23.01.24
  const handleSelect = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    name: string
  ) => {
    const value = e.currentTarget.textContent;
    if (name === "gender") {
      setInfos({
        ...infos,
        [name]: value === "남" ? "M" : "W",
      });
    } else {
      setInfos({
        ...infos,
        birth: { ...infos.birth, [name]: value },
      });
    }
  };

  // 닉네임 유효성검사_박예선_23.01.09
  const handleNicknameValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const rNickname = /^[가-힣|a-z|A-Z|0-9|]{2,10}$/;
    // 한글, 영어 대소문자, 숫자 2~10자리
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      const isNicknameValid = rNickname.test(value);
      setValids({
        ...valids,
        nickname: isNicknameValid,
      });
    }, 800);
    setTimer(newTimer);
  };

  return (
    <CommonOnlyContainer>
      <label className="title">
        별명
        <input
          type="text"
          name="nickname"
          placeholder="Nickname"
          value={infos.nickname}
          onChange={(e) => {
            handleInput(e);
            handleNicknameValid(e);
          }}
        />
      </label>
      {!valids.nickname && (
        <div className="notice err">
          한글, 영어 대소문자, 숫자 2~10자를 입력하세요
        </div>
      )}
      {isOnly.nickname !== null && (
        <div className={`notice ${isOnly.nickname ? "pass" : "err"}`}>
          {isOnly.nickname
            ? "사용 가능한 별명입니다"
            : "이미 사용 중인 별명입니다"}
        </div>
      )}
      <div>
        <span className="title">생년월일</span>
        <BirthDropDownContainer>
          <Selectbox
            placeholder="년도"
            options={getYearArray()}
            width="100px"
            name="year"
            onClick={(e, name) => {
              handleSelect(e, name);
            }}
          />
          <Selectbox
            placeholder="월"
            options={getMonthArray()}
            width="100px"
            name="month"
            onClick={(e, name) => {
              handleSelect(e, name);
            }}
          />
          <Selectbox
            placeholder="일"
            options={getDayArray()}
            width="100px"
            name="day"
            onClick={(e, name) => {
              handleSelect(e, name);
            }}
          />
        </BirthDropDownContainer>
      </div>
      <div className="title">성별</div>
      <Selectbox
        placeholder="선택없음"
        options={["남", "여"]}
        width="320px"
        name="gender"
        onClick={(e, name) => {
          handleSelect(e, name);
        }}
      />
    </CommonOnlyContainer>
  );
};

const CommonOnlyContainer = styled.div`
  select {
    width: 320px;
    height: 40px;
    margin: 10px 0;
    padding: 0 0 0 20px;
    border: 1px solid ${(props) => props.theme.colors.greys40};
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
      color: ${(props) => props.theme.colors.greys60};
    }
  }
`;

const BirthDropDownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 320px;
  .birth {
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

export default CommonOnly;
