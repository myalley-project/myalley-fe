import React, { useCallback, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import styled from "styled-components";
import MyInfoCard from "../components/mypage/MyInfoCard";
import EditProfile from "../components/mypage/EditProfile";
import WrittenPosts from "../components/mypage/WrittenPosts";
import BookMarkedPosts from "../components/mypage/BookMarkedPosts";
import { getMyInfoApi, MyInfoRes } from "../apis/member";
import isApiError from "../utils/isApiError";
import LikedBlogReviewContainer from "../components/mypage/container/LikedBlogReviewContainer";
import useGetNewTokenApi from "../apis/useGetRefreshToken";

const Mypage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getNewTokenApi = useGetNewTokenApi();
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

  const getMyInfo = useCallback(async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const res: AxiosResponse<MyInfoRes> = await getMyInfoApi();
      const { data } = res;
      setInfoData(data);
      localStorage.setItem("memberImage", data.memberImage);
    } catch (err) {
      const errorRes = isApiError(err);
      if (errorRes === "accessToken 만료") {
        await getNewTokenApi(refreshToken);
        const reRes: AxiosResponse<MyInfoRes> = await getMyInfoApi();
        const refreshData = reRes.data;
        setInfoData(refreshData);
      }
    }
  }, [getNewTokenApi]);

  useEffect(() => {
    getMyInfo();
    if (localStorage.getItem("authority") === "ROLE_ADMIN") {
      alert("일반 회원만 접근이 가능한 페이지입니다.");
      navigate("/");
    }
  }, [getMyInfo, navigate]);

  return (
    <MypageContainer>
      <MyInfoCard infoData={infoData} />
      {pathname === "/mypage/edit" && <EditProfile infoData={infoData} />}
      {pathname === "/mypage/write" && <WrittenPosts />}
      {pathname === "/mypage/bookmark" && <BookMarkedPosts />}
      {pathname === "/mypage/likes" && <LikedBlogReviewContainer />}
    </MypageContainer>
  );
};

export default Mypage;

const MypageContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 50px auto;
`;
