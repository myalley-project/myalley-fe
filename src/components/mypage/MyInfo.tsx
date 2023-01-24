import React, { useState } from "react";
import styled from "styled-components";
import profileImg from "../../assets/icons/profileImg.svg";
import MenuButtons from "./MenuButtons";
import EditProfile from "./EditProfile";
import FindMate from "./FindMate";

const Mypage = () => {
  const [mode, setMode] = useState("mypage");
  return (
    <>
      <Profile>
        <ProfileImg src={profileImg} alt="profile-img" />
        <Level>level 1</Level>
        <Nickname>닉네임</Nickname>
        <Privacy>
          <p>여성</p>
          <p className="partition">|</p>
          <p>23세</p>
          <p className="partition">|</p>
          <p>meme1223@email.com</p>
        </Privacy>
        <MenuButtons setMode={setMode} />
      </Profile>
      {/* {mode === "mypage" && <EditProfile />}
      {mode === "review" && <FindMate />} */}
    </>
  );
};

export default Mypage;

const Profile = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.greys40};
  border-radius: 0px;
`;

const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
`;

const Level = styled.p`
  width: fit-content;
  height: 24px;
  padding: 4px 10px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.colors.primry60};
  color: ${(props) => props.theme.colors.white100};
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  border-radius: 10000px;
`;

const Nickname = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 10px;
`;

const Privacy = styled.div`
  display: flex;
  padding-bottom: 30px;
  p {
    font-weight: 500;
    font-size: 12px;
    color: ${(props) => props.theme.colors.greys60};
  }
  .partition {
    padding: 0 10px;
  }
`;
