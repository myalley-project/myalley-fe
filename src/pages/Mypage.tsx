import React, { useState } from "react";
import styled from "styled-components";

const Mypage = () => (
    <MypageContainer>
      <MypageWrapper>
        <Profile>
          <ProfileImg />
          <Level>level 1</Level>
          <Nicname>닉네임</Nicname>
          <Privacy>
            <p>여성</p>
            <p className="partition">|</p>
            <p>23세</p>
            <p className="partition">|</p>
            <p>meme1223@email.com</p>
          </Privacy>
          <Buttons>
            <MenuButton type="button">회원 정보 수정</MenuButton>
            <MenuButton type="button">작성 글 조회</MenuButton>
            <MenuButton type="button">위시리스트</MenuButton>
          </Buttons>
        </Profile>
      </MypageWrapper>
    </MypageContainer>
  );

export default Mypage;

const MypageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;

const MypageWrapper = styled.div`
  width: 1200px;
  height: 1300px;
`;

const Profile = styled.div`
  border-bottom: 1px solid #e0e0e0;
  border-radius: 0px;
`;

const ProfileImg = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #d9d9d9;
  margin-bottom: 30px;
`;

const Level = styled.p`
  width: fit-content;
  height: 24px;
  padding: 4px 10px;
  margin-bottom: 10px;
  background-color: #9c9c9c;
  color: #ffffff;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  border-radius: 10000px;
`;

const Nicname = styled.p`
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
    color: #9c9c9c;
  }
  .partition {
    padding: 0 10px;
  }
`;

const Buttons = styled.div`
  padding-bottom: 15px;
`;

const MenuButton = styled.button`
  height: 36px;
  padding: 8px 20px;
  margin-right: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 10000px;
  color: #9c9c9c;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
`;
