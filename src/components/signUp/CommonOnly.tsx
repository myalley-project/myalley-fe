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

  // 닉네임 유효성검사_박예선_23.02.07
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
        nickname: value === "" ? null : isNicknameValid,
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
          className={
            valids.nickname === false || isOnly.nickname === false ? "err" : ""
          }
        />
      </label>
      {!valids.nickname && (
        <div
          className={`notice ${valids.nickname === null ? "default" : "err"}`}
        >
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
        <div className="title select-title">생년월일</div>
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
      <div className="title select-title birth">성별</div>
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
  .select-title {
    margin-bottom: 10px;
    &.birth {
      margin-top: 10px;
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
