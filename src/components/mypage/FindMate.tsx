import React, { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MateList from "../mate/MateList";
import Pagination from "../Pagination";
import { myMatesApi, MateRes } from "../../apis/member";
import { Mate } from "../../types/mateList";
import isApiError from "../../utils/isApiError";
import useRefreshTokenApi from "../../apis/useRefreshToken";

const FindMate = () => {
  const [matesList, setMatesList] = useState<Mate[] | []>([]);
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

  // 내가 쓴 메이트 목록 요청 api 호출
  // const getFindMateList = useCallback(async (pageNo: number) => {
  //   try {
  //     const res: AxiosResponse<MateRes> = await myMatesApi(pageNo);
  //     const { mates, pageInfo } = res.data;
  //     setMatesList(mates);
  //     setPageInfoList(pageInfo);
  //   } catch (err) {
  //     // const errorRes = isApiError(err);
  //     // if (errorRes === "accessToken 만료") useRefreshTokenApi;
  //     // if (typeof errorRes !== "object") return;
  //     // const { errorCode, errorMsg } = errorRes;
  //   }
  // }, []);
  // useEffect(() => {
  //   getFindMateList(pages.selected);
  // }, [getFindMateList, pages.selected]);
  const pageno = 5;
  return (
    <FindMateContainer>
      {matesList.length == 0
        ? "아직 작성한 글이 없어요!"
        : matesList.map((mates) => (
            <MateList key={mates.mateId} mates={mates} />
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
