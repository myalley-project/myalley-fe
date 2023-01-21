import React, { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import styled from "styled-components";
import { ExhbTypeFilters, Exhibition, FilterType } from "../types/exhbList";
import exhbListApi, { ExhbListRes } from "../apis/getExhbList";
import ExhibitionCard from "../components/exhibitionList/ExhibitionCard";
import PageNoBar from "../components/PageNoBar";
import Filters, { StatusType } from "../components/exhibitionList/Filters";

// 전시회 목록 페이지 컴포넌트_박예선_23.01.18
const ExhibitionList = () => {
  const [exhbList, setExhbList] = useState<Exhibition[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState<StatusType>("현재");
  const [exhbTypeFilters, setExhbTypeFilters] = useState<ExhbTypeFilters>({
    selected: "전체",
    applied: "전체",
  });
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });

  // 전시회 목록 요청 api_박예선_23.01.18
  const getExhbList = useCallback(
    async (status: StatusType, type: FilterType, page: number) => {
      try {
        const res: AxiosResponse<ExhbListRes> = await exhbListApi(
          status,
          type,
          page
        );
        const { exhibitions, pageInfo } = res.data;
        setExhbList(exhibitions);
        setTotalPage(pageInfo.totalPage);
      } catch (err) {
        alert(
          "죄송합니다.\n전시목록을 불러오는데에 실패하였습니다. 다시 시도해주십시오."
        );
      }
    },
    []
  );

  // 전시상태, 전시유형 필터, 페이지 번호에 따라 전시목록 불러오는 로직_박예선_23.01.18
  useEffect(() => {
    getExhbList(selectedStatus, exhbTypeFilters.applied, pages.selected);
  }, [getExhbList, selectedStatus, exhbTypeFilters.applied, pages.selected]);

  return (
    <ExhibitionListContainer className="flex">
      <h1>전시회</h1>
      <Filters
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        setPages={setPages}
        exhbTypeFilters={exhbTypeFilters}
        setExhbTypeFilters={setExhbTypeFilters}
        getExhbList={getExhbList}
      />
      <CardListContainer className="flex">
        {exhbList.map((exhb) => (
          <ExhibitionCard key={exhb.id} exhbData={exhb} />
        ))}
      </CardListContainer>
      <PageNoBar pages={pages} setPages={setPages} totalPage={totalPage} />
    </ExhibitionListContainer>
  );
};

export default ExhibitionList;

const ExhibitionListContainer = styled.div`
  flex-direction: column;
  align-items: center;
  width: 99vw;
  font-size: 14px;
  h1 {
    margin: 50px 0;
    font-size: 28px;
    font-weight: 700;
  }
  &.flex,
  .flex {
    display: flex;
  }
  .space-between {
    justify-content: space-between;
  }
  .border {
    border: 1px solid ${(props) => props.theme.colors.greys40};
    border-radius: 30px;
  }
  .none {
    display: none;
  }
`;

const CardListContainer = styled.div`
  flex-wrap: wrap;
  width: inherit;
  min-height: 60vw;
  margin: 30px 0;
`;
