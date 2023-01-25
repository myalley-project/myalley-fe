import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { AxiosResponse } from "axios";
import { useLocation } from "react-router-dom";
import { myInfoApi, MyInfoRes } from "../apis/member";
import MyInfoCard from "../components/mypage/MyInfoCard";
import MyProfileEdit from "../components/mypage/MyProfileEdit";
import MyWrite from "../components/mypage/MyWrite";
import MyBookmark from "../components/mypage/MyBookmark";

const Mypage = () => {
  const location = useLocation();
  const { pathname } = location;
  const [infoData, setInfoData] = useState({
    memberId: 0,
    email: "",
    nickname: "",
    gender: "",
    birth: "",
    level: "",
    memberImage: "",
    authority: "",
  });

  // 회원정보 요청 api
  const getMyInfo = useCallback(async () => {
    try {
      const res: AxiosResponse<MyInfoRes> | void = await myInfoApi("get");
      if (!res) return;
      const { data } = res;
      setInfoData(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getMyInfo();
  }, [getMyInfo]);

  return (
    <MypageContainer>
      <MyInfoCard infoData={infoData} />
      {pathname === "/mypage/edit" ? (
        <MyProfileEdit infoData={infoData} />
      ) : null}
      {pathname === "/mypage/write" ? <MyWrite /> : null}
      {pathname === "/mypage/bookmark" ? <MyBookmark /> : null}
    </MypageContainer>
  );
};

export default Mypage;

const MypageContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 50px auto;
`;
