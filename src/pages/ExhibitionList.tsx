import React, { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import styled from "styled-components";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { Exhibition, FilterType } from "../types/exhbList";
import exhbListApi, { ExhbListRes } from "../apis/getExhbList";
import Pagination from "../components/Pagination";
import Filters, { StatusType } from "../components/exhibitionList/Filters";
import ExhbCardList from "../components/exhibitionList/ExhbCardList";

// 전시회 목록 페이지 컴포넌트_박예선_23.02.01
const ExhibitionList = () => {
  const [searchParams] = useSearchParams();
  const [exhbList, setExhbList] = useState<Exhibition[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState<StatusType>("현재");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("전체 전시");
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });

  // 필요한 쿼리스트링 - type, status-완료 , page

  // 쿼리스트링에 따라 status 변경_박예선_23.02.07
  useEffect(() => {
    const searchStatus = searchParams.get("status");
    if (!searchStatus) return;
    if (
      searchStatus === "현재" ||
      searchStatus === "예정" ||
      searchStatus === "지난"
    )
      setSelectedStatus(searchStatus);

    // console.log(searchParams.get("type"));
  }, [searchParams]);

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

  // 전시상태, 전시유형 필터, 페이지 번호에 따라 전시목록 불러오는 로직_박예선_23.02.01
  useEffect(() => {
    getExhbList(selectedStatus, selectedFilter, pages.selected);
  }, [getExhbList, selectedStatus, selectedFilter, pages.selected]);

  return (
    <ExhibitionListContainer className="flex">
      <h1>전시회</h1>
      <Filters
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        setPages={setPages}
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
  max-width: 1440px;
  margin: auto;
  padding: 40px;
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
  @media (max-width: 1280px) {
    padding: 20px;
  }
  @media (max-width: 1064px) {
    padding: 16px;
  }
`;
