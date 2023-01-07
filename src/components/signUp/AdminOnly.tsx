import React from "react";
import { Infos, IsOnly, Valids } from "../../types/signUp";

interface AdminOnlyType {
  infos: Infos;
  valids: Valids;
  isOnly: IsOnly | undefined;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdminOnly = (props: AdminOnlyType) => {
  const { infos, valids, isOnly, handleInput } = props;
  return (
    <>
      <div className="title">관리자 고유번호</div>
      <input
        type="number"
        name="adminNumber"
        placeholder="회사에서 제공한 개인 고유 번호를 입력해주세요"
        value={infos.adminNumber === 0 ? "" : infos.adminNumber}
        onChange={handleInput}
      />
      <div className="notice err">
        {!isOnly && !valids.adminNumber && "숫자만 입력가능합니다"}
        {isOnly && !isOnly.adminNumber && "확인할 수 없는 고유번호입니다"}
      </div>
      <div className="title ">이름</div>
      <input
        type="text"
        name="name"
        placeholder="신분증에 적힌 본명을 입력해주세요"
        value={infos.name}
        onChange={handleInput}
      />
    </>
  );
};

export default AdminOnly;
