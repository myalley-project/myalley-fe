import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { AxiosResponse } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { myInfoApi, MyInfoRes } from "../apis/member";
import MyInfoCard from "../components/mypage/MyInfoCard";
import EditProfile from "../components/mypage/EditProfile";
import WrittenPosts from "../components/mypage/WrittenPosts";
import BookMarkedPosts from "../components/mypage/BookMarkedPosts";
import isApiError from "../utils/isApiError";

const Mypage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const [infoData, setInfoData] = useState<MyInfoRes>({
    memberId: 0,
    email: "",
    nickname: "",
    gender: "W",
    birth: "",
    age: 0,
    level: "level1",
    memberImage: "",
    authority: "ROLE_USER",
  });

  // 회원정보 요청 api
  const getMyInfo = useCallback(async () => {
    try {
      const res: AxiosResponse<MyInfoRes> | void = await myInfoApi("get");
      if (!res) return;
      const { data } = res;
      setInfoData(data);
      localStorage.setItem("memberImage", data.memberImage);
    } catch (err) {
      isApiError(err);
    }
  }, []);

  useEffect(() => {
    getMyInfo();
    if (!localStorage.getItem("accessToken")) {
      alert("로그인 후 이용해주세요.");
      navigate("/");
    }
  }, [getMyInfo, navigate]);

  return (
    <MypageContainer>
      <MyInfoCard infoData={infoData} />
      {pathname === "/mypage/edit" && <EditProfile infoData={infoData} />}
      {pathname === "/mypage/write" && <WrittenPosts />}
      {pathname === "/mypage/bookmark" && <BookMarkedPosts />}
    </MypageContainer>
  );
};

export default Mypage;

const MypageContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 50px auto;
`;
