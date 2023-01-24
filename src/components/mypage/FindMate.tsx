import React, { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import styled from "styled-components";
import MateList from "../mate/MateList";
import Pagination from "../Pagination";
import {
  mypageApi,
  mypageFindMateApi,
  MateRes,
  MypageRes,
  Mate,
  PageInfo,
} from "../../apis/mypage";

const FindMate = () => {
  const [matesList, setMatesList] = useState<Mate[]>([]);
  const [pageInfoList, setPageInfoList] = useState<PageInfo>({
    page: 0,
    size: 0,
    totalElement: 0,
    totalPage: 0,
  });
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });

  // 내가쓴 메이트 목록 요청 api 호출
  const getFindMateList = useCallback(async () => {
    try {
      const res: AxiosResponse<MateRes> = await mypageFindMateApi();
      const { mates, pageInfo } = res.data;
      // setMatesList(mates);
      // setPageInfoList(pageInfo);
      setMatesList([
        {
          mateId: 4,
          title: "제목4",
          availableDate: "2023-02-20",
          status: "모집완료",
          mateGender: "성별무관",
          mateAge: "20대 초반 ~ 20대 중반",
          createdAt: "2023-01-21",
          viewCount: 0,
          memberId: 1,
          memberNickname: "Merry Christmas~",
          exhibition: {
            exhibitionId: 1,
            exhibitionTitle: "전시회 제목1",
            exhibitionSpace: "국립현대미술관",
            posterUrl:
              "https://my-alley-exhibition.s3.ap-northeast-2.amazonaws.com/poster/2b413dd9-9466-4a5d-b41a-f9282a459eda.jpg",
            exhibitionStatus: "현재전시",
          },
        },
        {
          mateId: 3,
          title: "제목3",
          availableDate: "2023-02-20",
          status: "모집중",
          mateGender: "성별무관",
          mateAge: "20대 초반 ~ 20대 중반",
          createdAt: "2023-01-21",
          viewCount: 0,
          exhibition: {
            exhibitionId: 1,
            exhibitionTitle: "전시회 제목1",
            exhibitionSpace: "국립현대미술관",
            posterUrl:
              "https://my-alley-exhibition.s3.ap-northeast-2.amazonaws.com/poster/2b413dd9-9466-4a5d-b41a-f9282a459eda.jpg",
            exhibitionStatus: "현재전시",
          },
        },
        {
          mateId: 2,
          title: "제목2",
          availableDate: "2023-02-20",
          status: "모집중",
          mateGender: "성별무관",
          mateAge: "20대 초반 ~ 20대 중반",
          createdAt: "2023-01-21",
          viewCount: 0,
          exhibition: {
            exhibitionId: 1,
            exhibitionTitle: "전시회 제목1",
            exhibitionSpace: "국립현대미술관",
            posterUrl:
              "https://my-alley-exhibition.s3.ap-northeast-2.amazonaws.com/poster/2b413dd9-9466-4a5d-b41a-f9282a459eda.jpg",
            exhibitionStatus: "현재전시",
          },
        },
        {
          mateId: 1,
          title: "제목",
          availableDate: "2023-02-20",
          status: "모집중",
          mateGender: "성별무관",
          mateAge: "20대 초반 ~ 20대 중반",
          createdAt: "2023-01-21",
          viewCount: 0,
          exhibition: {
            exhibitionId: 1,
            exhibitionTitle: "전시회 제목1",
            exhibitionSpace: "국립현대미술관",
            posterUrl:
              "https://my-alley-exhibition.s3.ap-northeast-2.amazonaws.com/poster/2b413dd9-9466-4a5d-b41a-f9282a459eda.jpg",
            exhibitionStatus: "현재전시",
          },
        },
      ]);
      setPageInfoList({
        page: 1,
        size: 8,
        totalElement: 0,
        totalPage: 0,
      });
    } catch (err) {
      console.log(err);
      alert(
        "죄송합니다.\n전시목록을 불러오는데에 실패하였습니다. 다시 시도해주십시오."
      );
    }
  }, []);

  useEffect(() => {
    getFindMateList();
  }, [getFindMateList]);

  return (
    <FindMateContainer>
      {matesList.length == 0
        ? "아직 작성한 글이 없어요!"
        : matesList.map((item) => (
            <MateList key={item.mateId} mates={item} pageInfo={pageInfoList} />
          ))}
      <Pagination
        pages={pages}
        setPages={setPages}
        totalPage={pageInfoList.totalPage}
      />
    </FindMateContainer>
  );
};

export default FindMate;

const FindMateContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 30px auto 50px auto;
`;
