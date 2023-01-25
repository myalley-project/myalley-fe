import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import FindMate from "./FindMate";
import WriteMenuBtns from "./WriteMenuBtns";

const MyWrite = () => {
  const location = useLocation();
  const { search } = location;

  return (
    <div>
      <WriteMenuBtns />
      {/* 한줄리뷰 컴포넌트, 블로그 리뷰 컴포넌트 추가해야함 */}
      {search.includes("?type=mate") ? <FindMate /> : null}
    </div>
  );
};

export default MyWrite;
