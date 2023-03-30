import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { Exhibition, FilterType, SortType } from "../types/exhbList";
import exhbListApi, { ExhbListRes } from "../apis/exhbList";
import Pagination from "../components/Pagination";
import Filters, { StatusType } from "../components/exhibitionList/Filters";
import ExhbCardList from "../components/exhibitionList/ExhbCardList";

// 전시회 목록 페이지 컴포넌트_박예선_23.02.24
const ExhibitionList = () => {
  const navigate = useNavigate();
  const [exhbList, setExhbList] = useState<Exhibition[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState<StatusType>("현재");
  const [selectedFilter, setSelectedFilter] = useState<{
    type: FilterType;
    sort: SortType;
  }>({ type: "전체 전시", sort: "최신순" });
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });

  // 전시회 목록 조회 api_박예선_23.03.17
  const getExhbList = useCallback(
    async (
      status: StatusType,
      type: FilterType,
      sort: SortType,
      page: number
    ) => {
      try {
        const res: AxiosResponse<ExhbListRes> = await exhbListApi(
          status,
          type,
          sort,
          page
        );
        const { exhibitions } = res.data;
        setExhbList(exhibitions);
        setTotalPage(res.data.totalPage);
      } catch (err) {
        alert(
          "죄송합니다.\n전시목록을 불러오는데에 실패하였습니다. 다시 시도해주십시오."
        );
        navigate("/");
      }
    },
    [navigate]
  );

  // 전시상태, 전시유형 필터, 페이지 번호에 따라 전시목록 불러오는 로직_박예선_23.02.24
  useEffect(() => {
    getExhbList(
      selectedStatus,
      selectedFilter.type,
      selectedFilter.sort,
      pages.selected
    );
  }, [getExhbList, selectedStatus, selectedFilter, pages.selected]);

  return (
    <ExhibitionListContainer className="flex">
      <TitleContainer>
        <h1>전시회</h1>
      </TitleContainer>
      <Filters
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        setPages={setPages}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <ExhbCardList exhbList={exhbList} type="exhbList" />
      <Pagination pages={pages} setPages={setPages} totalPage={totalPage} />
    </ExhibitionListContainer>
  );
};

export default ExhibitionList;

const ExhibitionListContainer = styled.div`
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin: auto;
  padding: 0 40px;
  font-size: 14px;
  &.flex,
  .flex {
    display: flex;
  }
  .space-between {
    justify-content: space-between;
  }
  @media (max-width: 1280px) {
    padding: 0 20px;
  }
  @media (max-width: 1064px) {
    padding: 0 16px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  margin-bottom: 50px;
  padding: 80px 0;
  border-radius: 0;
  background-color: #958da50d;
  h1 {
    color: ${theme.colors.primry70};
    font-size: 42px;
    font-weight: 700;
    line-height: 52px;
  }
  @media (max-width: 1440px) {
    margin-bottom: 3.4vw;
    padding: 5.5vw 0;
  }
`;
