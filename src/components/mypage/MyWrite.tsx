import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import FindMate from "./FindMate";
import WriteMenuBtns from "./WriteMenuBtns";

const MyWrite = () => {
  const location = useLocation();
  const { search } = location;

  return (
    <div>
      <WriteMenuBtns></WriteMenuBtns>
      {/* 한줄리뷰, 블로그 리뷰 추가해야함 */}
      {search.includes("?type=oneline&pageno=1") ? <FindMate /> : null}
      {search.includes("?type=mate") ? <FindMate /> : null}
    </div>
  );
};

export default MyWrite;
