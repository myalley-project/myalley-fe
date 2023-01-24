import React from "react";
import styled from "styled-components";
import MyInfo from "../components/mypage/MyInfo";
import FindMate from "../components/mypage/FindMate";

const Mypage = () => (
  <MypageContainer>
    <MyInfo />
    <FindMate />
  </MypageContainer>
);

export default Mypage;

const MypageContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 50px auto;
`;
