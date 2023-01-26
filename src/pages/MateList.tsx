import { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import MateListFilter, {
  MateStatusSelect,
  MateStatusType,
} from "../components/mate/MateListFilter";
import MateCard from "../components/mate/MateCard";
import Pagination, { PagesState } from "../components/Pagination";
import { Mate, MateListType } from "../types/mateList";
import { theme } from "../styles/theme";
import { getMateListApi } from "../apis/mate";
import { errorAlert } from "../utils/isApiError";

// 메이트글 목록 페이지_박예선_23.01.26
const MateList = () => {
  const [mateList, setMateList] = useState<Mate[] | null>(null);
  const [mateStatusFilter, setMateStatusFilter] = useState<MateStatusSelect>({
    selected: "전체",
    applied: "전체",
  });
  const [pages, setPages] = useState<PagesState>({ started: 1, selected: 1 });
  const [totalPage, setTotalPage] = useState(1);

  // 메이트글 목록 조회 api 호출_박예선_23.01.26
  const getMateList = useCallback(
    async (status: MateStatusType, page: number) => {
      try {
        const res: AxiosResponse<MateListType> = await getMateListApi(
          status,
          page
        );
        setMateList(res.data.mates);
        setTotalPage(res.data.pageInfo.totalPage);
      } catch (err) {
        errorAlert();
      }
    },
    []
  );

  // 메이트글 목록 조회_박예선_23.01.26
  useEffect(() => {
    getMateList(mateStatusFilter.applied, pages.selected);
  }, [getMateList, mateStatusFilter.applied, pages.selected]);

  return (
    <MateListContainer>
      <Title className="page-title">메이트 찾기</Title>
      <MateListFilter
        mateStatusFilter={mateStatusFilter}
        setMateStatusFilter={setMateStatusFilter}
        setPages={setPages}
      />
      {mateList?.map((mate) => (
        <MateCard key={mate.mateId} mate={mate} />
      ))}
      <Pagination pages={pages} setPages={setPages} totalPage={totalPage} />
    </MateListContainer>
  );
};

export default MateList;

const MateListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 83vw;
  margin: auto;
  .page-title {
    margin: 50px 0;
  }
`;

const Title = styled.h1`
  color: ${theme.colors.greys100};
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
`;
