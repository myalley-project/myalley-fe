import { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { exhbMateApi } from "../../apis/exhibition";
import { MateRes } from "../../apis/member";
import { Mate } from "../../types/mateList";
import isApiError from "../../utils/isApiError";
import MateCard from "../mate/MateCard";
import Pagination from "../Pagination";

const ExhbMateList = () => {
  const [mateList, setMateList] = useState<Mate[] | []>([]);
  const [pageInfoData, setPageInfoData] = useState({
    page: 0,
    size: 0,
    totalElement: 0,
    totalPage: 0,
  });
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });

  // 상세페이지 메이트 목록 api 호출
  const getMateList = useCallback(async () => {
    try {
      const res: AxiosResponse<MateRes> = await exhbMateApi(1, 1);
      const { mates, pageInfo } = res.data;
      setMateList(mates);
      setPageInfoData(pageInfo);
    } catch (err) {
      isApiError(err);
    }
  }, []);

  useEffect(() => {
    getMateList();
  }, [getMateList]);

  return (
    <ExhbMateContainer>
      {mateList.length === 0
        ? "아직 작성한 글이 없어요!"
        : mateList.map((mate) => <MateCard key={mate.mateId} mates={mate} />)}
      {pageInfoData.totalPage > 0 && (
        <Pagination
          pages={pages}
          setPages={setPages}
          totalPage={pageInfoData.totalPage}
        />
      )}
    </ExhbMateContainer>
  );
};

export default ExhbMateList;

const ExhbMateContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 30px auto 50px auto;
  text-align: left;
`;
