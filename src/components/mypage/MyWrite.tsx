import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const MyWrite = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      <div>한줄리뷰</div>
      <div>블로그리뷰</div>
      <div>메이트찾기</div>
    </div>
  );
};

export default MyWrite;
