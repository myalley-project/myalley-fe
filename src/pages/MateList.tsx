import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import styled from "styled-components";
import MateListFilter, {
  MateStatusType,
} from "../components/mate/MateListFilter";
import MateCard from "../components/mate/MateCard";
import Pagination, { PagesState } from "../components/Pagination";
import { Mate, MateListType } from "../types/mateList";
import { theme } from "../styles/theme";
import { mateListApi } from "../apis/mate";
import NoList from "../components/NoList";
import { alertError } from "../utils/alerts";

// 메이트글 목록 페이지_박예선_23.05.01
const MateList = () => {
  const navigate = useNavigate();
  const [mateList, setMateList] = useState<Mate[] | null>(null);
  const [mateFilter, setMateFilter] = useState<{
    status: MateStatusType;
    title: string;
  }>({ status: "전체", title: "" });
  const [pages, setPages] = useState<PagesState>({ started: 1, selected: 1 });
  const [totalPage, setTotalPage] = useState(1);

  // 메이트글 목록 조회 api 호출_박예선_23.05.01
  const getMateList = useCallback(
    async (status: MateStatusType, title: string, page: number) => {
      try {
        const res: AxiosResponse<MateListType> = await mateListApi(
          status,
          title,
          page
        );
        const { mates } = res.data;
        setMateList(mates);
        setTotalPage(res.data.totalPage);
      } catch (err) {
        alertError();
        navigate("/");
      }
    },
    [navigate]
  );

  // 메이트글 목록 조회_박예선_23.05.01
  useEffect(() => {
    getMateList(mateFilter.status, mateFilter.title, pages.selected);
  }, [getMateList, pages.selected, mateFilter.status, mateFilter.title]);

  return (
    <MateListContainer>
      <Title className="page-title">메이트 찾기</Title>
      <MateListFilter mateFilter={mateFilter} setMateFilter={setMateFilter} />
      {mateList?.length === 0 && <NoList notice="작성된 메이트글이 없습니다" />}
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
  max-width: 1200px;
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
