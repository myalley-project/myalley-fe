import React, { useCallback, useEffect, useState } from "react";
// import { AxiosResponse } from "axios";
import styled from "styled-components";
import MateCard from "../mate/MateCard";
import Pagination from "../Pagination";
// import { mypageFindMateApi, MateRes } from "../../apis/mypage";
import { Mate } from "../../types/mateList";

const FindMate = () => {
  const [matesList, setMatesList] = useState<Mate[]>([]);
  const [pageInfoList, setPageInfoList] = useState({
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
  // const getFindMateList = useCallback(() => {
  //   try {
  //     const res: AxiosResponse<MateRes> = await mypageFindMateApi();
  //     const { mates, pageInfo } = res.data;
  //     setMatesList(mates);
  //     setPageInfoList(pageInfo);
  //   } catch (err) {
  //     console.log(err);
  //     alert(
  //       "죄송합니다.\n전시목록을 불러오는데에 실패하였습니다. 다시 시도해주십시오."
  //     );
  //   }
  // }, []);
  // useEffect(() => {
  //   getFindMateList();
  // }, [getFindMateList]);

  return (
    <FindMateContainer>
      {matesList.length == 0
        ? "아직 작성한 글이 없어요!"
        : matesList.map((mates) => (
            <MateCard key={mates.mateId} mates={mates} />
          ))}
      {pageInfoList.totalPage > 0 ? (
        <Pagination
          pages={pages}
          setPages={setPages}
          totalPage={pageInfoList.totalPage}
        />
      ) : null}
    </FindMateContainer>
  );
};

export default FindMate;

const FindMateContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 30px auto 50px auto;
`;
