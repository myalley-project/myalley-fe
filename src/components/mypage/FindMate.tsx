import React, { useCallback, useState } from "react";
import styled from "styled-components";
import MateList from "../mate/MateList";
import Pagination from "../Pagination";

const FindMate = () => {
  const [testArr, setTestArr] = useState({
    mates: [
      {
        mateId: 4,
        title: "제목4",
        availableDate: "2023-02-20",
        status: "모집완료",
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
    ],
    pageInfo: {
      page: 1,
      size: 8,
      totalElement: 4,
      totalPage: 1,
    },
  });
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });

  // const getFindMateList = useCallback({
  //   async ()
  // })

  return (
    <FindMateContainer>
      {testArr &&
        testArr.mates.map((item) => (
          <MateList
            key={item.mateId}
            mates={item}
            pageInfo={testArr.pageInfo}
          />
        ))}
      <Pagination pages={pages} setPages={setPages} totalPage={8} />
    </FindMateContainer>
  );
};

export default FindMate;

const FindMateContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 30px auto 50px auto;
`;
