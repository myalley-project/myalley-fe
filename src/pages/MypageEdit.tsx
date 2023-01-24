import React from "react";
import styled from "styled-components";
import MyInfo from "../components/mypage/MyInfo";
import EditProfile from "../components/mypage/EditProfile";

const Mypage = () => (
  <MypageContainer>
    <MyInfo />
    <EditProfile />
  </MypageContainer>
);

export default Mypage;

const MypageContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 50px auto;
`;
