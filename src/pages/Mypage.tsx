import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { AxiosResponse } from "axios";
import { useLocation } from "react-router-dom";
import { myInfoApi, MyInfoRes } from "../apis/member";
import MyInfo from "../components/mypage/MyInfo";
import EditProfile from "../components/mypage/EditProfile";
import FindMate from "../components/mypage/FindMate";

const Mypage = () => {
  const location = useLocation();
  const { pathname } = location;
  const [infos, setInfos] = useState({
    imageFile: "",
    level: "",
    nickname: "",
    gender: "",
    email: "",
  });

  // 회원정보 요청 api
  const getMyInfo = useCallback(async () => {
    try {
      const res: AxiosResponse<MyInfoRes> | void = await myInfoApi("get");
      if (!res) return;
      const { data } = res;
      setInfos({
        ...infos,
        imageFile: data.memberImage,
        level: data.level,
        nickname: data.nickname,
        gender: data.gender === "W" ? "여성" : "남성",
        email: data.email,
      });
    } catch (err) {
      console.log(err);
    }
  }, [infos]);

  useEffect(() => {
    getMyInfo();
  }, [getMyInfo]);
  return (
    <MypageContainer>
      <MyInfo infos={infos} />
      {pathname === "/mypage/edit" ? <EditProfile /> : null}
      {pathname === "/mypage/write" ? <FindMate /> : null}
      {pathname === "/mypage/bookmark" ? <EditProfile /> : null}
    </MypageContainer>
  );
};

export default Mypage;

const MypageContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 50px auto;
`;
