import React, { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MateCard from "../mate/MateCard";
import Pagination from "../Pagination";
import { myMatesApi, MateRes } from "../../apis/member";
import { Mate } from "../../types/mateList";
import isApiError from "../../utils/isApiError";
import NoList from "../NoList";

const FindMate = () => {
  const [matesList, setMatesList] = useState<Mate[] | []>([]);
  const navigate = useNavigate();
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
  const getFindMateList = useCallback(
    async (pageNo: number) => {
      try {
        const res: AxiosResponse<MateRes> = await myMatesApi(pageNo);
        const { mates, pageInfo } = res.data;
        setMatesList(mates);
        setPageInfoList(pageInfo);
      } catch (err) {
        isApiError(err);
      }
      navigate(`?type=mate&pageno=${pageNo}`);
    },
    [navigate]
  );

  useEffect(() => {
    getFindMateList(pages.selected);
  }, [getFindMateList, pages.selected]);

  return (
    <FindMateContainer>
      {matesList.length === 0 ? (
        <NoList />
      ) : (
        matesList.map((mate) => <MateCard key={mate.mateId} mate={mate} />)
      )}
      {pageInfoList.totalPage > 0 && (
        <Pagination
          pages={pages}
          setPages={setPages}
          totalPage={pageInfoList.totalPage}
        />
      )}
    </FindMateContainer>
  );
};

export default FindMate;

const FindMateContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 30px auto 50px auto;
`;
