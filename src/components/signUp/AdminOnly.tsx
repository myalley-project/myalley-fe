import React, { useState } from "react";
import { Infos, IsOnly, Valids } from "../../types/signUp";

interface AdminOnlyType {
  infos: Infos;
  valids: Valids;
  setValids: React.Dispatch<React.SetStateAction<Valids>>;
  isOnly: IsOnly;
  setIsOnly: React.Dispatch<React.SetStateAction<IsOnly>>;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// 관리자용 회원가입 UI 컴포넌트_박예선_23.01.08
const AdminOnly = (props: AdminOnlyType) => {
  const { infos, valids, setValids, isOnly, setIsOnly, handleInput } = props;
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();

  // 관리자번호 유효성검사_박예선_23.01.09
  const handleAdiminNoValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const rAdminNo = /^[0-9]+$/;
    // 숫자 1개이상
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      const isAdminNoValid = rAdminNo.test(value);
      setValids({
        ...valids,
        adminNo: isAdminNoValid,
      });
    }, 800);
    setTimer(newTimer);
    setIsOnly({ ...isOnly, adminNo: null });
  };

  // 관리자본명 유효성검사_박예선_23.01.09
  const handleNameValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const rName = /^[가-힣]{2,10}$/;
    // 한글 2~10자리
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      const isNameValid = rName.test(value);
      setValids({
        ...valids,
        name: isNameValid,
      });
    }, 800);
    setTimer(newTimer);
  };

  return (
    <>
      <label className="title">
        관리자 고유번호
        <input
          type="text"
          name="adminNo"
          placeholder="회사에서 제공한 개인 고유 번호를 입력해주세요"
          value={infos.adminNo === 0 ? "" : infos.adminNo}
          onChange={(e) => {
            handleInput(e);
            handleAdiminNoValid(e);
          }}
        />
      </label>
      <div className="notice err">
        {isOnly.adminNo === null && !valids.adminNo && "숫자만 입력가능합니다"}
        {isOnly.adminNo !== null &&
          !isOnly.adminNo &&
          "확인할 수 없는 고유번호입니다"}
      </div>
      <label className="title">
        이름
        <input
          type="text"
          name="name"
          placeholder="신분증에 적힌 본명을 입력해주세요"
          value={infos.name}
          onChange={(e) => {
            handleInput(e);
            handleNameValid(e);
          }}
        />
      </label>
      <div className="notice err">
        {!valids.name && "한글 10자 이내로 입력하세요"}
      </div>
    </>
  );
};

export default AdminOnly;
