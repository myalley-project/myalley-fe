import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { AxiosResponse } from "axios";
import { useLocation } from "react-router-dom";
import { myInfoApi, MyInfoRes } from "../apis/member";
import MyInfo from "../components/mypage/MyInfo";
import MyProfileEdit from "../components/mypage/MyProfileEdit";
import MyWrite from "../components/mypage/MyWrite";

const Mypage = () => {
  const location = useLocation();
  const { pathname } = location;
  const [infos, setInfos] = useState({
    memberId: 0,
    email: "",
    nickname: "",
    gender: "W",
    birth: "",
    level: "",
    memberImage: "",
    authority: "ROLE_USER",
  });

  // 회원정보 요청 api
  const getMyInfo = useCallback(async () => {
    try {
      const res: AxiosResponse<MyInfoRes> | void = await myInfoApi("get");
      if (!res) return;
      const { data } = res;
      console.log(res);
      setInfos(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getMyInfo();
  }, [getMyInfo]);

  return (
    <MypageContainer>
      <MyInfo infos={infos} />
      {pathname === "/mypage/edit" ? <MyProfileEdit /> : null}
      {pathname === "/mypage/write" ? <MyWrite /> : null}
      {pathname === "/mypage/bookmark" ? <MyProfileEdit /> : null}
    </MypageContainer>
  );
};

export default Mypage;

const MypageContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 50px auto;
`;
