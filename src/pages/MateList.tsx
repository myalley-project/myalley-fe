import { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MateListFilter, {
  MateStatusSelect,
} from "../components/mate/MateListFilter";
import MateCard from "../components/mate/MateCard";
import Pagination, { PagesState } from "../components/Pagination";
import { Mate, MateListType } from "../types/mateList";
import { theme } from "../styles/theme";
import { getMateListApi } from "../apis/mate";

// 메이트글 목록 페이지_박예선_23.01.27
const MateList = () => {
  const navigate = useNavigate();
  const [totalPage, setTotalPage] = useState(1);
  const [pages, setPages] = useState<PagesState>({ started: 1, selected: 1 });
  const [mateStatusFilter, setMateStatusFilter] = useState<MateStatusSelect>({
    selected: "전체",
    applied: "전체",
  });
  const [mateList, setMateList] = useState<Mate[] | null>(null);

  // 메이트글 목록 조회 api 호출_박예선_23.01.27
  const getMateList = useCallback(async () => {
    try {
      const res: AxiosResponse<MateListType> = await getMateListApi(
        pages.selected,
        mateStatusFilter.applied
      );
      setMateList(res.data.mates);
      setTotalPage(res.data.pageInfo.totalPage);
    } catch (err) {
      console.log(err); // 임시
    }
  }, [mateStatusFilter.applied, pages.selected]);

  // 메이트글 목록 조회_박예선_23.01.27
  useEffect(() => {
    getMateList();
  }, [getMateList]);

  return (
    <MateListContainer>
      <Title className="page-title">메이트 찾기</Title>
      <MateListFilter
        mateStatusFilter={mateStatusFilter}
        setMateStatusFilter={setMateStatusFilter}
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
